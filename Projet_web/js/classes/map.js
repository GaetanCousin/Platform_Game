function Map(nom) {
    // récupération des données du JSON avec le callback
    this.load(nom, function(mapData) { 

	    this.tileset = new Tileset(mapData.tileset);

	    this.terrain = mapData.terrain;

    }.bind(this));
}

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
	console.log(this.terrain.length);
for(var i = 0, l = this.terrain.length ; i < l ; i++) {
		var ligne = this.terrain[i];
		var y = i * 32;
		for(var j = 0, k = ligne.length ; j < k ; j++) {
			this.tileset.dessinerTile(ligne[j], context, j * 32, y);
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








