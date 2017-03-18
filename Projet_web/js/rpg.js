var map = new Map("premiere");


window.onload = function() {

	

	var canvas = document.getElementById('canvas');

	var ctx = canvas.getContext('2d');

	console.log('this dans le rpg : ' + this);


	console.log(map);

    canvas.height = map.getHauteur() * 32;
	canvas.width  = map.getLargeur() * 32;

	map.dessinerMap(ctx);

	}
