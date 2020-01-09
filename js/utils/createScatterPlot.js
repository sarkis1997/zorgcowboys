import { checkYearInput } from "./checkSelectedYear.js";

export function scatterPlot(data) {
	createScatterPlot(data.j2018);

	d3.select('#selectYear').on("change", function () {
		let inputData = checkYearInput(data);
		createScatterPlot(inputData);
	});

	function createScatterPlot(dataset) {
		let width = 800,
			height = 100;

		// Append SVG
		let svg = d3.select('#viz-holder')
			.append('svg')
			.attr('width', width)
			.attr('height', height);

		// Create scale
		let scale = d3.scaleLinear()
			.domain(d3.extent(dataset, d => { if(isNaN(d.omzet)){d.omzet=0} return d.omzet }))
			.range([0, width - 100]);

		let xAxis = d3.axisBottom()
			.scale(scale);

		//Append group and insert axis
		svg.append("g")
			.call(xAxis);

	}

}