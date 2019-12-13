import { readFile } from "./utils/uploadFile.js";

function startApp() {
	readFile();
	console.log('app started')
}


startApp();