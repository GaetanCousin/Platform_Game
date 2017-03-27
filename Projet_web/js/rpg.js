window.onload = function() {

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');	

    var start = Promise.resolve(ctx);

    start
        .then (Map.loadMap)
        .then( Tileset.loadTileset)
        .then ((map) => {
				return map.dessinerMap();
				})
        .then (console.log('fin'));

	

}
	
	
	/*  EXEMPLE DE PROMISE
	 * 
	 * 
	 * function fi (di - 1 ) {
	 *   ((Travail preparatoire ))
		 * return  new Promise(  (ok, error) => {
		 * 			((calcul asynchrone qui calcule di))
		 * 			Si pas d'erreur, alors ok(di);
		 * 			sinon error(di);
		 * });
	 * }
	 * 
	 * window.addEventListener("load", () => {
	 * 
		 * var start = Promise.resolve(MonArguments);
		 *
		 * start
		 * 		.then (loadMap);
		 * 		.then (loadImage);
		 * 		.then (ImgArray => { 
		 * 			var div = document.getElementById('images');
		 * 			ImgArray.forEach(img) => { div.appendChild(img) ;
		 * 		});
		 * });
		 * 
	 * } 
	 */
