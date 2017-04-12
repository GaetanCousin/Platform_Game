// Le constructeur de Map recupere le context du canvas, les données du JSON et un Objet Tileset
function Map(mapData, ctx, ts) {
	this.context = ctx;
	this.mapData = mapData;
    this.tileset = ts;
};


Map.loadMap = function (ctx, url) {

    return  new Promise ( (ok, error) => {

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "./maps/" + url + ".json");
        xhr.onreadystatechange = function () {

            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    //console.log('Fichier JSON recupere');
                    var mapData = JSON.parse(xhr.responseText);
                    ts = new Tileset(); // On creer le tileset
                    // utilise la promesse Load de tileset 
                    // pour etre sur qu'il est creer avant d'appeller le constructeur de Map
                    ts.loadTileset(mapData.tileset).then( () => { 
                        var map = new Map(mapData, ctx, ts);
                        ok (map); // Ici on retourne l'objet map
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

    // on recupere la Largeur du tileset (on divise par 70 car chaque case fait 70pixels)
    var largeur = this.tileset.image.width / 70;

    // pour chaque ligne
    for(var i = 0, l = this.mapData.terrain.length ; i < l ; i++) {
    	var ligne = this.mapData.terrain[i];
    	var y = i * 70;
        // pour chaque case de la ligne
    	for(var j = 0, k = ligne.length ; j < k ; j++) {
            // On dessine la bonne tile
    		this.tileset.dessinerTile(ligne[j], this.context, j * 70, y, largeur); 
    	}
    }	
};


// Pour récupérer la hauteur (en tiles) de la map
Map.prototype.getHauteur = function() {
    return this.mapData.terrain.length;
};
// pour recupérer la largeur (en tile) de la map
Map.prototype.getLargeur = function() {
    return this.mapData.terrain[0].length;
};









