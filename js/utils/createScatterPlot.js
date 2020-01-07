export async function scatterPlot(data) {
	console.log(data)
	const body = d3.select('#map-holder');
	let svg = body.selectAll('svg').data([null]);
	svg = svg.enter().append('svg')
		.merge(svg)
		.attr('padding', '1em')
		.attr('width', 1000)
		.attr('height', 500);

	const xScale = d3.scaleLinear()
		.domain(d3.extent(data.map(item => {
			return item.omzet;
		})))
		.range([0, innerWidth]);
	const xAxis = d3.axisBottom(xScale);

	let xAxisG = svg.selectAll('.x-axis').data([null]);
	xAxisG = xAxisG.enter().append('g')
		.attr('class', 'x-axis')
		.merge(xAxisG);
	xAxisG.call(xAxis)

	const xAxisLabel = xAxisG.selectAll('.x-as-label').data([null]);
	xAxisLabel
		.enter().append('text')
		.attr('class', 'x-as-label')
		.attr('fill', 'red')
		.merge(xAxisLabel)
		.text('Omzet ->')
		.attr('x', 30)
		.attr('y', 20)
}



///////// https://www.d3indepth.com/geographic/ /////ow // handige uitleg