import { readFile } from "./utils/uploadFile.js";
import { scatterPlot } from "./utils/createScatterPlot.js";

function startApp() {
	scatterPlot();
	readFile();
	console.log('app started')
}


startApp();