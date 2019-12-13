import '../modules/jquery-csv.js'

export function readFile() {

	var result = [];

	const input = document.querySelector('input[type="file"]');
	input.addEventListener('change', function () {

		const reader = new FileReader();
		reader.onload = function () {

			const lines = reader.result.split("\n");

			var headers = lines[0].replace(/"/g,'').split(",");

			for(var i=1;i<lines.length;i++){
				var obj = {};
				var currentline=lines[i].replace(/"/g,'').split(",");

				for(var j=0;j<headers.length;j++){
					obj[headers[j]] = currentline[j];
				}
				result.push(obj);

			}
		};
		reader.readAsText(input.files[0])


	}, false);

	console.log(result)


}