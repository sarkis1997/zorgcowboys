export function scatterPlot(data) {

	let j11 = data.j2011;
	let j12 = data.j2012;
	let j13 = data.j2013;
	let j14 = data.j2014;
	let j15 = data.j2015;
	let j16 = data.j2016;
	let j17 = data.j2017;
	let j18 = data.j2018;

	const canvas = d3.select('#map-holder');

	const xScale = d3.scaleLinear();
	const xAxis = d3.axisBottom(xScale);



	function myResponsiveComponent(container, props) {

		let svg = container.selectAll('svg').data([null]);
		svg = svg.enter().append('svg')
			.attr('class', 'mainSVG')
			.merge(svg)
			.attr('width', props.width)
			.attr('height', props.height);

		xScale
			.domain(d3.extent(data, d => { return d.omzet }))
			.range([50, props.width - 80])
			.nice();

		xAxis
			.ticks(props.width / 100);

		let xAxisGroup = d3.select('.mainSVG').selectAll('.x-axis').data([null]);
		xAxisGroup = xAxisGroup
			.enter().append('g')
			.attr('class', 'x-axis')
			.merge(xAxisGroup)
			.attr('width', props.width)
			.attr('height', props.height);
		xAxisGroup.call(xAxis);
		//
		// let valueline = d3.line()
		// 	.x(function (d) {
		// 		return x(d.omzet);
		// 	});
		//
		// let path = svg.selectAll("circle")
		// 	.data(data)
		// 	.enter().append("circle")
		// 	.attr("r", 5)
		// 	.attr("cx", function (d) {
		// 		if (isNaN(d.omzet)) {
		// 			d.omzet = 0;
		// 		}
		// 		return xScale(d.omzet)
		// 	})
		// 	.attr("cy", 30)
		// 	.attr("stroke", "#32CD32")
		// 	.attr("stroke-width", 1.5)
		// 	.attr("fill", "#FFFFFF");


		const xAxisLabel = xAxisGroup.selectAll('.x-as-label').data([null]);
		xAxisLabel
			.enter().append('text')
			.attr('class', 'x-as-label')
			.attr('fill', 'red')
			.merge(xAxisLabel)
			.text('Omzet ->')
			.attr('x', 30)
			.attr('y', -20)
	}

	function render() {
		myResponsiveComponent(canvas, {
			width: document.body.clientWidth,
			height: document.body.clientHeight,
		});
	}

	render();
	window.addEventListener('resize', render);
}



///////// https://www.d3indepth.com/geographic/ /////ow // handige uitleg