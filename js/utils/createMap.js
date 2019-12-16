import { provincesJSON }  from "./provinces.js";

export function createMap() {
	console.log(provincesJSON);

	let context = d3.select('#content canvas')
		.node()
		.getContext('2d')

	let projection = d3.geoEquirectangular()
		.scale(3000)
		.translate([500, 3000]);

	let geoGenerator = d3.geoPath()
		.pointRadius(5)
		.projection(projection)
		.context(context);

	function update(provincesJSON) {
		context.lineWidth = 0.5;
		context.strokeStyle = '#aaa';

		context.beginPath();
		geoGenerator({type: 'FeatureCollection', features: provincesJSON.features})
		context.stroke();
	}

	update(provincesJSON);
}



///////// https://www.d3indepth.com/geographic/ /////ow // handige uitleg