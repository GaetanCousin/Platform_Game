


window.onload = function() {

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');	

	//map.dessinerMap(ctx);

	var map = new Map("deuxieme", ctx);

	
 function(nom, callback){
	// Création de l'objet XmlHttpRequest
	let xhr = new XMLHttpRequest();

	// Une fois le fichier chargé, on parse
	xhr.addEventListener("readystatechange", function (ev) {
	if (xhr.status == 200 && xhr.readyState == 4) {
	        var mapDa

	/*var map = new Map("deuxieme", canvas, function() {
		console.log('this = ');
		console.log(this);
		console.log('map  =');
		console.log(map);*/
 function(nom, callback){
	// Création de l'objet XmlHttpRequest
	let xhr = new XMLHttpRequest();

	// Une fois le fichier chargé, on parse function(nom, callback){
	// Création de l'objet XmlHttpRequest
	let xhr = new XMLHttpRequest();

	// Une fois le fichier chargé, on parse
	xhr.addEventListener("readystatechange", function (ev) {
	if (xhr.status == 200 && xhr.readyState == 4) {
	        var mapDa function(nom, callback){
	// Création de l'objet XmlHttpRequest
	let xhr = new XMLHttpRequest();

	// Une fois le fichier chargé, on parse
	xhr.addEventListener("readystatechange", function (ev) {
	if (xhr.status == 200 && xhr.readyState == 4) {
	        var mapDa
	xhr.addEventListener("readystatechange", function (ev) {
	if (xhr.status == 200 && xhr.readyState == 4) {
	        var mapDa
	map.dessinerMap(ctx);
	
	/*
	setTimeout(function(){ 
		map.dessinerMap(ctx);
		console.log('apres la fonction dessinerMap');
	}, 100);
*/
	


	//});

	//setTimeout(function(){});
	
	
	/*
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
