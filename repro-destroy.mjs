// Bug: 调用 destroy 导致 zIndex 排序更新访问已销毁的状态

import { Leafer, Rect, useCanvas } from '@leafer-ui/node';
import skia from 'skia-canvas';

useCanvas('skia', skia);

const leafer = new Leafer({ width: 100, height: 100 });
leafer.add(new Rect({ width: 50, height: 50, fill: 'red', zIndex: 1 }));

await leafer.export('png');
leafer.destroy();
