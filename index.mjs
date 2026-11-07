import skia from 'skia-canvas';
import http from 'node:http';

// Workaround: 先导入小包，调用 useCanvas，再导入全量包
import { useCanvas } from '@leafer-ui/node';
useCanvas('skia', skia);
const { Leafer, Rect, LeaferEvent } = await import('@leafer/node');

http.createServer(async (req, res) => {
    const leafer = new Leafer({ width: 800, height: 600 });

    // Workaround: 在 watcher 销毁前清空子节点，避免 zIndex 排序更新访问已销毁的状态。
    leafer.once(LeaferEvent.END, () => leafer.clear());

    leafer.add(Rect.one({ fill: '#32cd79', zIndex: 1 }, 100, 100));

    try {
        const result = await leafer.export('png');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<img src="${result.data}" />`);
    } catch (error) {
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Image export failed');
    } finally {
        leafer.destroy();
    }
}).listen(3000, () => {
    console.log('server is running at http://localhost:3000');
});
