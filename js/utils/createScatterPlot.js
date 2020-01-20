import { checkYearInput } from "./checkSelectedYear.js";
import { createD3RangeSlider } from "../modules/d3RangeSlider.js";

export function scatterPlot(data) {
	createScatterPlot(data.j2018);
	d3.select('#selectYear').on("change", function () {
		let svg = d3.select('#viz-holder');
		let circles = svg.selectAll(".circle");

		let over10=document.querySelector('.filterOver10');let negative=document.querySelector('.filterNegative');let less10=document.querySelector('.filterUnder10');document.querySelector('.filterUnder10').addEventListener('click',filterLess10);document.querySelector('.filterOver10').addEventListener('click',filterOver10);document.querySelector('.filterNegative').addEventListener('click',filterNegative);if(document.querySelector('.chosen')){document.querySelector('.chosen').classList.remove('chosen')}
		function filterLess10(){negative.classList.remove('chosen');over10.classList.remove('chosen');if(less10.classList.contains('chosen')){circles.attr("display",'block');less10.classList.remove('chosen')}
		else{circles.attr("display",function(d){if(!(d.perc_winst<10)){return'none'};less10.classList.add('chosen')})}}
		function filterOver10(){negative.classList.remove('chosen');less10.classList.remove('chosen');if(over10.classList.contains('chosen')){circles.attr("display",'block');over10.classList.remove('chosen')}
		else{circles.attr("display",function(d){if(!(d.perc_winst>=10)){return'none'};over10.classList.add('chosen')})}}
		function filterNegative(){over10.classList.remove('chosen');less10.classList.remove('chosen');if(negative.classList.contains('chosen')){circles.attr("display",'block');negative.classList.remove('chosen')}
		else{circles.attr("display",function(d){if(!(d.perc_winst<0)){return'none'};negative.classList.add('chosen')})}}

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
		.attr('height', height)

	let scale = d3.scaleLinear()
		.domain(d3.extent(dataset, d => { return d.omzet }))
		.range([0 + 30, width * .96]);

	let xAxis = d3.axisBottom()
		.scale(scale);

	svg.append("g")
		.attr('class', 'nodeGroup')
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

		let xAxis = d3.axisBottom().scale(scale);
		d3.select('.nodeGroup').call(xAxis);

		circles.attr("cx", function(d) { return scale(d.omzet) });
		counter.text(function () { return dataset.length });
	});


	let radiusScale = d3.scaleLinear()
		.domain( [ d3.min(dataset, function ( d ) { return d.winst}),
			d3.max( dataset, function ( d ) { return d.winst })] )
		.range( [ 0.1, 5] );	 // hier pas je de grootte van de bolletjes aan


	let circles = svg.selectAll(".circle")
		.data(dataset)
		.enter()
		.append("circle")
		.attr("class", "circle")
		.attr("cx", function(d) { return scale(d.omzet); })
		.attr("cy", 50 )
		.attr('r', function ( d ) {
			return radiusScale(d.winst);
		})
		.attr("fill", function (d) {
			if (d.perc_winst < 0) { return '#E8E8E8'}
			else if ( (100 * d.winst / d.omzet) >= 0 && (100 * d.winst / d.omzet) < 10 ) { return '#24EDAD' }
			else { return '#F65545' }
		})
		.on("click", function(d) { handleClick(d) })
		.on("mouseover", function(d) { handleMouseOver(d) })
		.on("mouseout", function(d) { handleMouseOut(d) })


	let simulation = d3.forceSimulation().nodes(dataset)
		.force("y", d3.forceY(40).strength(0.5))
		.velocityDecay(1)
		.force('collision', d3.forceCollide().radius( d => scale(d.winst) + 10))
		.on('tick',ticked);
	function ticked(){ circles.attr("cy", d => d.y); }
	let zoom = svg.call(d3.zoom().on('zoom', function() {
		circles.attr('transform', d3.event.transform);
		d3.select('.nodeGroup').attr('transform', d3.event.transform);
	}));



	let counter = d3.select('.amountContainer')
		.text(function () { return dataset.length });

	let over10=document.querySelector('.filterOver10');let negative=document.querySelector('.filterNegative');let less10=document.querySelector('.filterUnder10');function searchFunction(e){let filterNodes=dataset.filter(zorgbedrijf=>zorgbedrijf.bedrijfsnaam.toLowerCase().includes(e.target.value.toLowerCase()));circles.attr("display",function(d){if(!filterNodes.includes(d)){return'none'}})}
	function filterLess10(){negative.classList.remove('chosen');over10.classList.remove('chosen');if(less10.classList.contains('chosen')){circles.attr("display",'block');less10.classList.remove('chosen')}
	else{circles.attr("display",function(d){if(!(d.perc_winst<10)){return'none'};less10.classList.add('chosen')})}}
	function filterOver10(){negative.classList.remove('chosen');less10.classList.remove('chosen');if(over10.classList.contains('chosen')){circles.attr("display",'block');over10.classList.remove('chosen')}
	else{circles.attr("display",function(d){if(!(d.perc_winst>=10)){return'none'};over10.classList.add('chosen')})}}
	function filterNegative(){over10.classList.remove('chosen');less10.classList.remove('chosen');if(negative.classList.contains('chosen')){circles.attr("display",'block');negative.classList.remove('chosen')}
	else{circles.attr("display",function(d){if(!(d.perc_winst<0)){return'none'};negative.classList.add('chosen')})}}
	function handleClick(d){console.log(d)
		let sb=document.getElementById("sidebar");if(sb.style.width==0||sb.style.width=="0px"){sb.style.width="450px"}else{sb.style.width="0"}}
	function handleMouseOver(d){tooltip.style("opacity",1).style("left",(d3.event.pageX-200)+"px").style("top",(d3.event.pageY-265)+"px");d3.select('.ttNaam').html(d.bedrijfsnaam)
		d3.select('.ttWinst').html('<span>winst:</span>'+'<span> € '+Number(d.winst).toLocaleString()+'</span>');d3.select('.ttOmzet').html('<span>omzet:</span>'+'<span> €'+Number(d.omzet).toLocaleString()+'</span>');d3.select('.ttPercentage').html('<span>winstpercentage:</span>'+'<span>'+d.perc_winst+' %</span>')}
	function handleMouseOut(){tooltip.style("opacity",0)}
}