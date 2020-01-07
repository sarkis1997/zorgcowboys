export async function scatterPlot(data) {

	const body = d3.select('#map-holder');

	let margin = {top: 50, right: 50, bottom: 50, left: 50};
	let width = document.body.clientWidth;
	let height = document.body.clientHeight;


	let svg = body.selectAll('svg').data([null]);
	svg = svg.enter().append('svg')
		.merge(svg)
		.attr('width', width + margin.left + margin.right)
		.attr('height', height)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	const xScale = d3.scaleLinear()
		.domain(d3.extent(data.map(item => {
			if (isNaN(item.omzet)) {
				item.omzet = 0;
			}
			else (
				parseInt(item.omzet)
			);
			return item.omzet;
		})))
		.range([0, width]);
	const xAxis = d3.axisBottom(xScale)
		.ticks(width / 70);

	let xAxisG = svg.selectAll('.x-axis').data([null]);
	xAxisG = xAxisG
		.enter().append('g')
		.attr('class', 'x-axis')
		.merge(xAxisG);
	xAxisG.call(xAxis);

	const xAxisLabel = xAxisG.selectAll('.x-as-label').data([null]);
	xAxisLabel
		.enter().append('text')
		.attr('class', 'x-as-label')
		.attr('fill', 'red')
		.merge(xAxisLabel)
		.text('Omzet ->')
		.attr('x', 30)
		.attr('y', -20)
}



///////// https://www.d3indepth.com/geographic/ /////ow // handige uitleg