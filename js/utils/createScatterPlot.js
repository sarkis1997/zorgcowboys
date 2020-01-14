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

	let margin = {right: 150, left: 200};
	let width = innerWidth - margin.left - margin.right;
	let height = 600;

	let svg = d3.select('#viz-holder')
		.append('svg')
		.attr('width', width)
		.attr('height', height);

	let scale = d3.scaleLinear()
		.domain(d3.extent(dataset, d => { return d.omzet }))
		.range([0 + 30, width * .96]);

	let xAxis = d3.axisBottom()
		.scale(scale);

	svg.append("g")
		.attr('class', 'test')
		.call(xAxis);

	let tooltip = d3.select("body").append("div")
		.attr("class", "tooltip")
		.style("opacity", 0);

	let min = d3.min(dataset, d => { if(d.omzet < 0){d.omzet=0} return d.omzet });
	let max = d3.max(dataset, d => { if(d.omzet < 0){d.omzet=0} return d.omzet });

	var slider = createD3RangeSlider(min, max, "#slider-container");
	var newRange = slider.range(min, max);

	let rangeLabel = d3.select("#range-label");
	let newRangeBegin = Number(newRange.begin).toLocaleString();
	let newRangeEnd = Number(newRange.end).toLocaleString();

	rangeLabel.text("€ " + newRangeBegin + " - " + "€ " + newRangeEnd);

	slider.onChange(function () {
		let newRange = slider.range();

		let newRangeBegin = Number(newRange.begin).toLocaleString();
		let newRangeEnd = Number(newRange.end).toLocaleString();

		rangeLabel.append('input');
		rangeLabel.text("€ " + newRangeBegin + " - " + "€ " + newRangeEnd);

		let scale = d3.scaleLinear()
			.domain([newRange.begin, newRange.end])
			.range([0 + 30, width * .96]);

		let xAxis = d3.axisBottom()
			.scale(scale);

		d3.select('.test')
			.call(xAxis);

		circles
			.exit().remove()
			.enter().append("circle")
			.merge(circles)
			.attr("class", "circle")
			.attr("cx", function(d) { return scale(d.omzet); })
			.attr("cy", 30)
			.attr('r', function ( d ) {
				return radiusScale(d.winst);
			})
			.attr("fill", function (d) {
				if ( (100 * d.winst / d.omzet) < 0 ) {
					return '#dcdcdc'
				} else if ( (100 * d.winst / d.omzet) >= 0 && (100 * d.winst / d.omzet) < 10 ) {
					return '#71e9b3'
				} else {
					return '#e5604e'
				}
			});

		counter
			.text(function () {
				return dataset.length;
			})
	});


	let radiusScale = d3.scaleLinear()
		.domain( [
			d3.min(dataset, function ( d ) { return d.winst}),
			d3.max( dataset, function ( d ) { return d.winst })
		] )
		// hier pas je de grootte van de bolletjes aan
		.range( [ 1, 30] );

	let circles = svg.selectAll(".circle")
		.data(dataset)
		.enter()
		.append("circle")
		.attr("class", "circle")
		.attr("cx", function(d) { return scale(d.omzet); })
		.attr("cy", 30)
		.attr('r', function ( d ) {
			return radiusScale(d.winst);
		})
		.attr("fill", function (d) {
			if ( (100 * d.winst / d.omzet) < 0 ) {
				return '#dcdcdc'
			} else if ( (100 * d.winst / d.omzet) >= 0 && (100 * d.winst / d.omzet) < 10 ) {
				return '#71e9b3'
			} else {
				return '#e5604e'
			}
		})
		.on("click", function(d) { handleClick(d) })
		.on("mouseover", function(d) {
			tooltip
				.transition()
				.duration(200)
				.style("opacity", .9);
			tooltip
				.html(d.winst + "<br/>"  + d.omzet)
				.style("left", (d3.event.pageX) + "px")
				.style("top", (d3.event.pageY - 30) + "px")
				.style("background", "red");
		})
		.on("mouseout", function(d) {
			tooltip.transitiogit adn()
				.duration(500)
				.style("opacity", 0);
		});

	let counter = d3.select('.amountContainer')
		.text(function () {
			return dataset.length;
		});

	document.getElementById('searchInput').addEventListener('input', searchFunction);
	function searchFunction(e) {
		console.log(e.target.value)
	}

	function handleClick(d) {
		console.log(d)

		let sb = document.getElementById("sidebar");
		if (sb.style.width == 0 || sb.style.width == "0px" ) {
			sb.style.width = "450px";
		} else {
			sb.style.width = "0";
		}
	}

	// function handleMouseOver() {
	// 	document.getElementById('sidebar').style.width = "250px";
	// }
	//
	// function handleMouseOut() {
	// 	document.getElementById('sidebar').style.width = "0px";
	// }

}