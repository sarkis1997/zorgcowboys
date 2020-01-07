import '../modules/jquery-csv.js'
import { startApp } from "../app.js";

export function readFile() {
		let result = [];

		const input = document.querySelector('input[type="file"]');
		input.addEventListener('change', function () {

			const reader = new FileReader();
			reader.onload = async function () {

				const lines = reader.result.split("\n");
				let headers = lines[0].replace(/"/g,'').split(",");
					for(let i=1;i<lines.length;i++){
						let obj = {};
						let currentline=lines[i].replace(/"/g,'').split(",");

						for(let j=0;j<headers.length;j++){
							obj[headers[j]] = currentline[j];
						}
						result.push(obj);
					}
				startApp(result);
			};
			reader.readAsText(input.files[0]);

			document.getElementById('uploadFile').style.display = 'none';
			document.getElementById('framework').style.display = 'block';
		}, false);
}

