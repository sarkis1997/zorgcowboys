export function scatterPlot() {
	const body = d3.select('#map-holder');
	let margin = {top: 50, right: 50, bottom: 50, left: 50};
	let width = innerWidth - margin.left - margin.right;
	let height = innerHeight - margin.top - margin.bottom;

	function myResponsiveComponent(container, props) {
		let svg = container.selectAll('svg').data([null]);
		svg = svg.enter().append('svg')
			.merge(svg)
			.attr('width', props.width)
			.attr('height', props.height);

		let group = svg.selectAll('g').data([null]);
		group
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
			.enter().append("g")
			.merge(group);

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

	function render() {
		myResponsiveComponent(body, {
			width: document.body.clientWidth,
			height: document.body.clientHeight,
		});
	}

	render();

	window.addEventListener('resize', render);



}



///////// https://www.d3indepth.com/geographic/ /////ow // handige uitleg