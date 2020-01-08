import { scatterPlot } from "./utils/createScatterPlot.js";

async function loadData() {
	let data = await d3.csv("datasets/dataset.csv")
	startApp(data)
}
loadData();

export function startApp(data) {
	scatterPlot(data);
}

