window.onload = function() {

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');	

	//map.dessinerMap(ctx);

	var map = new Map("deuxieme", ctx);

	


	/*var map = new Map("deuxieme", canvas, function() {
		console.log('this = ');
		console.log(this);
		console.log('map  =');
		console.log(map);*/

	// map.dessinerMap(ctx);
	setTimeout(function(){ 
		map.dessinerMap(ctx);
		console.log('apres la fonction dessinerMap');
	}, 100);

	


	//});

	//setTimeout(function(){});



	}
