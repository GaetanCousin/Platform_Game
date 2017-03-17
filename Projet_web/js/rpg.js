window.onload = function() {

	var ts = new Tileset("basique.png");


	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');


	var map = new Map("premiere", ctx, function() {
		canvas.height = this.getHauteur * 32;
		canvas.width  = this.getLargeur * 32;		
	});
}
