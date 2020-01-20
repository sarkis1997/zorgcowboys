import { scatterPlot } from "./utils/createScatterPlot.js";

d3.json("datasets/dataset.json")
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

	scatterPlot(data)

	document.querySelector('.toggle').addEventListener('click', function () {
		if( document.querySelector('.toggle').classList.contains('toggleSwitchOn') ) {
			let app = document.querySelector('#viz-holder');
			while (app.firstChild) { app.removeChild(app.firstChild); }
			let slider = document.querySelector('#slider-container');
			while (slider.firstChild) { slider.removeChild(slider.firstChild); }
		} else if ( document.querySelector('.toggle').classList.contains('toggleSwitchOff') ) {
			scatterPlot(data)

		}
	})
}