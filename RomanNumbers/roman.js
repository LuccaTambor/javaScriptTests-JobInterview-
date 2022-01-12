function romanize(num) {
	var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},
		roman = '',
		i;

	if (isNaN(num) || num <= 0) {
		roman = 'Invalid Entry';
	} 
	else if (num >= 4000) {
		roman = 'Only number from 1 to 3999';
	}
	else {
		for ( i in lookup ) {
			while ( num >= lookup[i] ) {
				roman += i;
				num -= lookup[i];
			}
		}
	}
	return roman;
}

function deromanize (str) {
	var	str = str.toUpperCase(),
		validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/,
		token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g,
		key = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},
		num = 0, m;
	if (!(str && validator.test(str)))
		return 'Invalid entry';
	while (m = token.exec(str))
		num += key[m[0]];
	return num;
}

function onSubmitArabic(e) {
	e.preventDefault();
	var val = document.querySelector('#arabic').value;
	val = parseInt(val);
	var result = '';
	result = romanize(val);
	document.querySelector('#result').innerHTML = result;
	return false;
}


function onSubmitRoman(e) {
	e.preventDefault();
	var val = document.querySelector('#roman').value;
	var result;
	result = deromanize(val);
	document.querySelector('#result2').innerHTML = result;
	return false;
  }

document.addEventListener('DOMContentLoaded', function() {
	document.querySelector('#arabic').addEventListener('input', onSubmitArabic);
	document.querySelector('#roman').addEventListener('input', onSubmitRoman);
});
