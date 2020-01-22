import { scatterPlot } from "./utils/createScatterPlot.js";
import { scatterPlotPer } from "./utils/createScatterPlotPer.js";

d3.json("datasets/dataset.json")
	.then(function (data) {
		data.forEach(function (item, i) {
			if (item.perc_winst > 80 || isNaN(item.perc_winst) || isNaN(item.winst) || isNaN(item.omzet) || item.omzet <= 0 ) {
				data.splice(i, 1)
			}
		});
		return data
	})
	.then(function (data) {
		let j2011 = [], j2012 = [], j2013 = [], j2014 = [], j2015 = [], j2016 = [], j2017 = [], j2018 = [];
		data.map(item => {
			switch (item.jaar) {
				case 2011:
					j2011.push(item);
					break;
				case 2012:
					j2012.push(item);
					break;
				case 2013:
					j2013.push(item);
					break;
				case 2014:
					j2014.push(item);
					break;
				case 2015:
					j2015.push(item);
					break;
				case 2016:
					j2016.push(item);
					break;
				case 2017:
					j2017.push(item);
					break;
				case 2018:
					j2018.push(item);
					break;
			}
		});
		return { j2011, j2012, j2013, j2014, j2015, j2016, j2017, j2018 }
	})
	.then(function(data) {
		startApp(data)
	});


export function startApp(data) {
	console.log(data)
	scatterPlot(data);
	document.querySelector('#toggle-off').addEventListener('click', function () {
		let app = document.querySelector('#viz-holder');
		while (app.firstChild) {
			app.removeChild(app.firstChild);
		}
		let slider = document.querySelector('#slider-container');
		while (slider.firstChild) {
			slider.removeChild(slider.firstChild);
		}
		console.log('per zorgsector')
		scatterPlotPer(data)
	});
	document.querySelector('#toggle-on').addEventListener('click', function () {
			let app = document.querySelector('#viz-holder');
			while (app.firstChild) { app.removeChild(app.firstChild); }
			let slider = document.querySelector('#slider-container');
			while (slider.firstChild) { slider.removeChild(slider.firstChild); }
			scatterPlot(data)
		})
}