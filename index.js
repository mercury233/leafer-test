const Leafer170 = require('leafer170');
const Leafer191 = require('leafer191');
const Leafer192 = require('leafer192');
const Leafer1121 = require('leafer1121');
const skia = require('skia-canvas');
const http = require('http');

function createGradientTextData(text, fontSize, fontFamily, gradientColor1, gradientColor2, spread = false) {
	return {
		text: text,
		fontSize: fontSize,
		fontFamily: fontFamily,
		fontWeight: 'bold',
		fill: {
			type: 'linear',
			from: 'top-left',
			to: 'bottom-right',
			stops: [
				{ offset: 0, color: gradientColor1 },
				{ offset: 0.2, color: gradientColor2 },
				{ offset: 0.4, color: gradientColor2 },
				{ offset: 0.6, color: gradientColor1 },
				{ offset: 0.8, color: gradientColor2 },
			],
		},
		stroke: 'rgba(0, 0, 0, 0.2)',
		strokeWidth: fontSize * 0.025,
		strokeAlign: 'outside',
		innerShadow: {
			blur: fontSize * 0.005,
			x: fontSize * 0.015,
			y: fontSize * 0.015,
			spread: spread ? fontSize * 0.015 : 0,
			color: 'rgba(0, 0, 0, 0.3)',
		},
	}
}

async function createTest(Leafer, bg = true, spread = false) {
	Leafer.useCanvas('skia', skia);
	const leafer = new Leafer.Leafer({ width: 500, height: 100 })

	leafer.add(Leafer.Rect.one({
		fill: bg ? {
			type: 'image',
			url: 'https://www.leaferjs.com/image/leafer.jpg',
			mode: 'strench'
		} : '#999999'
	}, 0, 0, 500, 100))
	leafer.add(Leafer.Text.one(createGradientTextData('LeaferJS 一些文字 ABC 123', 32, '楷体', '#ffd700', '#fff000', spread), 10, 10))
	leafer.add(Leafer.Text.one(createGradientTextData('LeaferJS 一些文字 ABC 123', 32, '微软雅黑', '#ffffff', '#e0e0e0', spread), 10, 50))
	leafer.add(Leafer.Text.one({ text: Leafer.version, fontSize: 12, }, 450, 5))

	return await leafer.export('png')
}

http.createServer(async function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/html' })
	res.write(`	<img src="${(await createTest(Leafer170)).data}" />
				<img src="${(await createTest(Leafer170, false)).data}" />
				<img src="${(await createTest(Leafer170, false, true)).data}" />
				<hr/>`)
	res.write(`	<img src="${(await createTest(Leafer191)).data}" />
				<img src="${(await createTest(Leafer191, false)).data}" />
				<img src="${(await createTest(Leafer191, false, true)).data}" />
				<hr/>`)
	res.write(`	<img src="${(await createTest(Leafer192)).data}" />
				<img src="${(await createTest(Leafer192, false)).data}" />
				<img src="${(await createTest(Leafer192, false, true)).data}" />
				<hr/>`)
	res.write(`	<img src="${(await createTest(Leafer1121)).data}" />
				<img src="${(await createTest(Leafer1121, false)).data}" />
				<img src="${(await createTest(Leafer1121, false, true)).data}" />
				<hr/>`)
	res.end()
}).listen(3000, function () {
	console.log('\x1B[36m%s\x1B[0m', 'server is running at http://localhost:3000')
})