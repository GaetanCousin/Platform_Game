function Map(mapData, ctx, tileset) {
	this.context = ctx;
	this.tileset = tileset;
	this.terrain = mapData.terrain;
};


Map.loadMap = function (ctx) {

    return  new Promise ( (ok, error) => {

        var xhr = new XMLHttpRequest();
        //xhr.open("GET", "./maps/" + nom + ".json", true);
        xhr.open("GET", "./maps/deuxieme.json");
        xhr.onreadystatechange = function () {

            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    console.log('Fichier JSON recupere');
                    var mapData = JSON.parse(xhr.responseText);
                    tileset = new Tileset(mapData.tileset);
                    var map = new Map(mapData, ctx, tileset);
                    ok (map);
                } else {
                    console.log(xhr.status);
                    error ("chargement du fichier json");
                };
            }
        };

        xhr.send();
    });
 };


Map.prototype.dessinerMap = function () {
	
	return  new Promise ( (ok, error) => {
		
		for(var i = 0, l = this.terrain.length ; i < l ; i++) {
			var ligne = this.terrain[i];
			var y = i * 70;
			for(var j = 0, k = ligne.length ; j < k ; j++) {
				this.tileset.dessinerTile(ligne[j], this.context, j * 70, y);
			}
		}	
		ok (this);
		
			});
		};


// Pour récupérer la taille (en tiles) de la carte
Map.prototype.getHauteur = function() {
return this.terrain.length;
};

Map.prototype.getLargeur = function() {
return this.terrain[0].length;
};

Map.prototype.tailleCanvas = function() {
	canvas.height = this.getHauteur() * 70;
	canvas.width  = this.getLargeur() * 70;
};









