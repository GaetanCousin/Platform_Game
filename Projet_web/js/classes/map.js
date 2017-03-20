function Map(nom, ctx) {
    // récupération des données du JSON avec le callback
    this.load(nom, function(mapData) { 


	    this.tileset = new Tileset(mapData.tileset);
	    this.terrain = mapData.terrain;
	    console.log('this dans map = ');
		console.log(this);

		canvas.height = this.getHauteur() * 70;
		canvas.width  = this.getLargeur() * 70;


		this.dessinerMap(ctx);


		
    }.bind(this));
}

/*function Map(nom, canvas, callback) {
    // récupération des données du JSON avec le callback
    this.load(nom, function(mapData) { 
	    this.tileset = new Tileset(mapData.tileset);
	    this.terrain = mapData.terrain;


		console.log(this.tileset);

		canvas.height = this.getHauteur()* 70;
		canvas.width  = this.getLargeur() * 70;

		setTimeout( callback(), 3000);
		//this.dessinerMap(canvas.getContext('2d'));


		
    }.bind(this));

}*/

Map.prototype.load = function(nom, callback){
	// Création de l'objet XmlHttpRequest
	let xhr = new XMLHttpRequest();

	// Une fois le fichier chargé, on parse
	xhr.addEventListener("readystatechange", function (ev) {
	if (xhr.status == 200 && xhr.readyState == 4) {
	        var mapData = JSON.parse(xhr.responseText);
	        callback(mapData);
	    }
	})
	xhr.open("GET", "./maps/" + nom + ".json", true);
	xhr.send();
}


Map.prototype.dessinerMap = function (context) {
for(var i = 0, l = this.terrain.length ; i < l ; i++) {
		var ligne = this.terrain[i];
		var y = i * 70;
		for(var j = 0, k = ligne.length ; j < k ; j++) {
			this.tileset.dessinerTile(ligne[j], context, j * 70, y);
		}
	}	
}


// Pour récupérer la taille (en tiles) de la carte
Map.prototype.getHauteur = function() {
return this.terrain.length;
}

Map.prototype.getLargeur = function() {
return this.terrain[0].length;
}

Map.prototype.getTest = function() {
	return this.test;
}








