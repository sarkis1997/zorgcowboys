import { checkYearInput } from "./checkSelectedYear.js";
import { createD3RangeSlider } from "../modules/d3RangeSlider.js";


export function scatterPlot(data) {
	createScatterPlot(data.j2018);
	d3.select('#selectYear').on("change", function () {
		let pNode = document.getElementById('viz-holder');
		while (pNode.firstChild) { pNode.removeChild(pNode.firstChild);}
		let rangeField = document.getElementById('slider-container');
		while (rangeField.firstChild) { rangeField.removeChild(rangeField.firstChild);}


		let inputData = checkYearInput(data);
		createScatterPlot(inputData);
	});
}

function createScatterPlot(dataset) {
	console.log(dataset)

	let margin = {top: 20, right: 50, bottom: 30, left: 50};
	let width = innerWidth - margin.left - margin.right;
	let height = 100;

	// Append SVG
	let svg = d3.select('#viz-holder')
		.append('svg')
		.attr('width', width)
		.attr('height', height);

	// Create scale
	let scale = d3.scaleLinear()
		.domain(d3.extent(dataset, d => { if(isNaN(d.omzet)){d.omzet=0} return d.omzet }))
		.range([0 + 30, width * .96]);

	let xAxis = d3.axisBottom()
		.scale(scale)

	//Append group and insert axis
	svg.append("g")
		.call(xAxis);

	let min = d3.min(dataset, d => { if(isNaN(d.omzet) || d.omzet < 0){d.omzet=0} return d.omzet });
	let max = d3.max(dataset, d => { if(isNaN(d.omzet) || d.omzet < 0){d.omzet=0} return d.omzet });

	var slider = createD3RangeSlider(min, max, "#slider-container");
	var newRange = slider.range(min, max);

	let rangeLabel = d3.select("#range-label");
	let newRangeBegin = Number(newRange.begin).toLocaleString();
	let newRangeEnd = Number(newRange.end).toLocaleString();

	rangeLabel.text("€ " + newRangeBegin + " - " + "€ " + newRangeEnd);
git
	slider.onChange(function () {
		let newRange = slider.range();

		let newRangeBegin = Number(newRange.begin).toLocaleString();
		let newRangeEnd = Number(newRange.end).toLocaleString();

		rangeLabel.text("€ " + newRangeBegin + " - " + "€ " + newRangeEnd);
	});

	svg.selectAll(".circle")
		.data(dataset)
		.enter()
		.append("circle")
		.attr("cx", function(d) { return scale(d.omzet); })
		.attr("cy", 30)
		.attr("r", 5)
		.attr("fill", "green");

}