function Map(mapData, ctx, ts) {
	this.context = ctx;
	this.mapData = mapData;
    this.tileset = ts;
};


Map.loadMap = function (ctx, url) {

    return  new Promise ( (ok, error) => {

        var xhr = new XMLHttpRequest();
        //xhr.open("GET", "./maps/" + url + ".json", true);
        xhr.open("GET", "./maps/" + url + ".json");
        xhr.onreadystatechange = function () {

            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    //console.log('Fichier JSON recupere');
                    var mapData = JSON.parse(xhr.responseText);
                    ts = new Tileset();
                    ts.loadTileset(mapData.tileset).then( () => { 
                        var map = new Map(mapData, ctx, ts);
                        ok (map);
                    });
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

    var largeur = this.tileset.image.width / 70;

    for(var i = 0, l = this.mapData.terrain.length ; i < l ; i++) {
    	var ligne = this.mapData.terrain[i];
    	var y = i * 70;
    	for(var j = 0, k = ligne.length ; j < k ; j++) {
    		this.tileset.dessinerTile(ligne[j], this.context, j * 70, y, largeur);
    	}
    }	
};


// Pour récupérer la taille (en tiles) de la carte
Map.prototype.getHauteur = function() {
    return this.mapData.terrain.length;
};

Map.prototype.getLargeur = function() {
    return this.mapData.terrain[0].length;
};









