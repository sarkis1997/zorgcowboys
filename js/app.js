import { scatterPlot } from "./utils/createScatterPlot.js";
import { readFile } from "./utils/uploadFile.js";

readFile();

export function startApp(data) {
	scatterPlot(data);
}

