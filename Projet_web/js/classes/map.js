class Map {


	constructor(nom, ctx, callback) {
	    // récupération des données du JSON avec le callback
	    this.load(nom, function(mapData) { 

		    this.tileset = new Tileset(mapData.tileset);
		    this.terrain = mapData.terrain;		
		    //callback();
	    	this.dessinerMap(ctx);
	    });
		}

	load(nom, callback){
	// Création de l'objet XmlHttpRequest
    let xhr = new XMLHttpRequest();

    // Chargement du fichier
    xhr.addEventListener("readystatechange", function (ev) {
    if (xhr.status == 200 && xhr.readyState == 4) {
            var mapData = JSON.parse(xhr.responseText);
            callback(mapData);
        }
    })
    xhr.open("GET", "./maps/premiere.json", true);
    xhr.send();
	}


	dessinerMap(context) {
	for(var i, l = this.terrain.length = 0 ; i < l ; i++) {
			var ligne = this.terrain[i];
			var y = i * 32;
			for(var j = 0, k = ligne.length ; j < k ; j++) {
				this.tileset.dessinerTile(ligne[j], context, j * 32, y);
			}
		}	
	}


	// Pour récupérer la taille (en tiles) de la carte
	getHauteur() {
	console.log(this.terrain.length);
	return this.terrain.length;
	}
	
	getLargeur() {
	return this.terrain[0].length;
	}






}









