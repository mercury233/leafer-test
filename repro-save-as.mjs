// Bug: export 调用 skia-canvas 3.x 已弃用且有 bug 的 saveAs，不返回 Promise

import { Leafer, Rect, useCanvas } from '@leafer-ui/node';
import skia from 'skia-canvas';
import { fileURLToPath } from 'node:url';

useCanvas('skia', skia);

const leafer = new Leafer({ width: 100, height: 100 });
leafer.add(new Rect({ width: 50, height: 50, fill: 'red' }));

try {
    // 必须传文件名；export('png') 返回 data URL，不会触发 saveAs。
    await leafer.export(fileURLToPath(new URL('./repro-save-as.png', import.meta.url)));
} finally {
    leafer.destroy();
}
