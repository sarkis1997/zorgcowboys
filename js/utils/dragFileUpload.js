export function dropFile() {
	var target = document.getElementById("dropFileArea");

	target.addEventListener("dragover", function (event) {
		event.preventDefault();
	}, false);

	target.addEventListener("drop", function (event) {

		// cancel default actions
		event.preventDefault();

		var i = 0,
			files = event.dataTransfer.files,
			len = files.length;

		for (; i < len; i++) {
			console.log("Filename: " + files[i].name);
			console.log("Type: " + files[i].type);
			console.log("Size: " + files[i].size + " bytes");
		}

	}, false);
}