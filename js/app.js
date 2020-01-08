import { scatterPlot } from "./utils/createScatterPlot.js";

d3.csv("dataset.csv", function (data) {
	startApp(data)
});

export function startApp(data) {
	scatterPlot(data);
}

