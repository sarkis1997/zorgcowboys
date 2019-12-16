import { readFile } from "./utils/uploadFile.js";
import { createMap } from "./utils/createMap.js";

function startApp() {
	createMap();
	readFile();
	console.log('app started')
}


startApp();