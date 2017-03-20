window.onload = function() {
	var canvas = document.querySelector('#canvas_map');
	var context = canvas.getContext('2d');
}


var decor = new Image();
	decor.src = "decor.jpg";
	decor.AddEventListener('load', function() {
		context.drawImage(decor, 35,35);	
	});

