import { checkYearInput } from "./checkSelectedYear.js";
import { createD3RangeSlider } from "../modules/d3RangeSlider.js";


export function scatterPlot(data) {
	createScatterPlot(data.j2018);
	d3.select('#selectYear').on("change", function () {
		let inputData = checkYearInput(data);
		createScatterPlot(inputData);
	});
}

function createScatterPlot(dataset) {
	let width = innerWidth,
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


	let min = d3.min(dataset, d => { if(isNaN(d.omzet) || d.omzet < 0){d.omzet=0} return d.omzet });
	let max = d3.max(dataset, d => { if(isNaN(d.omzet) || d.omzet < 0){d.omzet=0} return d.omzet });

	var slider = createD3RangeSlider(min, max, "#slider-container");
	var newRange = slider.range(min, max);


	let rangeLabel = d3.select("#range-label");

	rangeLabel.text(newRange.begin + " - " + newRange.end);

	slider.onChange(function () {
		var newRange = slider.range();
		rangeLabel.text(newRange.begin + " - " + newRange.end);
	})

}