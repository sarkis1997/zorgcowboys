export function checkYearInput(data) {
	var selector = document.getElementById("selectYear");
	var inputUser = selector.options[selector.selectedIndex].value;

	switch(inputUser) {
		case '2011':
			return data.j2011;
		case '2012':
			return data.j2012;
		case '2013':
			return data.j2013;
		case '2014':
			return data.j2014;
		case '2015':
			return data.j2015;
		case '2016':
			return data.j2016;
		case '2017':
			return data.j2017;
		case '2018':
			return data.j2018;
	}
}