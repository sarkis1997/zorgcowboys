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

	document.getElementById('searchInput').addEventListener('input', searchFunction);
	document.querySelector('.filterUnder10').addEventListener('click', filterLess10);
	document.querySelector('.filterOver10').addEventListener('click', filterOver10);
	document.querySelector('.filterNegative').addEventListener('click', filterNegative);

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

	let tooltip = d3.select(".tooltip");

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
				return '##E8E8E8'
			} else if ( (100 * d.winst / d.omzet) >= 0 && (100 * d.winst / d.omzet) < 10 ) {
				return '#24EDAD'
			} else {
				return '#F65545'
			}
		})
		.on("click", function(d) { handleClick(d) })
		.on("mouseover", function(d) { handleMouseOver(d) })
		.on("mouseout", function(d) { handleMouseOut(d) });

	let counter = d3.select('.amountContainer')
		.text(function () {
			return dataset.length;
		});

	function searchFunction(e) {
		let filterNodes = dataset.filter(zorgbedrijf => zorgbedrijf.bedrijfsnaam.toLowerCase().includes(e.target.value.toLowerCase()));
		circles.attr("opacity", function (d) { if (!filterNodes.includes(d)) {return 0} })
	}

	function filterLess10() { circles.attr("display", function (d) { if (!(d.perc_winst < 10)) { return 'none'}}) }
	function filterOver10() { circles.attr("display", function (d) { if (!(d.perc_winst >= 10)) { return 'none'}}) }
	function filterNegative() { circles.attr("display", function (d) { if (!(d.perc_winst < 0)) { return 'none'}}) }


	function handleClick(d) {
		let sb = document.getElementById("sidebar");
		if (sb.style.width == 0 || sb.style.width == "0px" ) {
			sb.style.width = "450px";
		} else {
			sb.style.width = "0";
		}
	}

	function handleMouseOver(d) {
		console.log(d.bedrijfsnaam)
		tooltip
			.transition()
			.duration(200)
			.style("opacity", 1)
			.style("left", (d3.event.pageX - 220) + "px")
			.style("top", (d3.event.pageY -295) + "px");

		d3.select('.ttNaam').html(d.bedrijfsnaam)
		d3.select('.ttWinst').html('<span>winst:</span>' + '<span> € ' + Number(d.winst).toLocaleString() + '</span>');
		d3.select('.ttOmzet').html('<span>omzet:</span>' + '<span> €' + Number(d.omzet).toLocaleString() + '</span>');
		d3.select('.ttPercentage').html('<span>winstpercentage:</span>' + '<span>' + d.perc_winst + ' %</span>');
	}

	function handleMouseOut(d) {
		tooltip.transition()
			.duration(200)
			.style("opacity", 0);
	}

}