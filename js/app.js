import { scatterPlot } from "./utils/createScatterPlot.js";


d3.json("datasets/dataset.json")
	.then(function(data) {
		startApp(data)
	});


export function startApp(data) {
	scatterPlot(data);
}

