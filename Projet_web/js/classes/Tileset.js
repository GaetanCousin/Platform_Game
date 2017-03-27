var debug = false;

function Tileset(url) {
	// Chargement de l'image dans l'attribut image
	this.image = new Image();
	this.image.referenceDuTileset = this;
	this.image.onload = function() {
		debug=true;
		if(!this.complete) 
			throw new Error("Erreur de chargement du tileset nommé \"" + url + "\".");
		
		// Largeur du tileset en tiles
		this.referenceDuTileset.largeur = this.width / 70;
		console.log("toto");
	}
	this.image.src = "tilesets/" + url;
}

// Méthode de dessin du tile numéro "numero" dans le contexte 2D "context" aux coordonnées x et y
Tileset.prototype.dessinerTile = function(numero, context, xDestination, yDestination) {
	var xSourceEnTiles = numero % this.largeur;
	if(xSourceEnTiles == 0) xSourceEnTiles = this.largeur;
	var ySourceEnTiles = Math.ceil(numero / this.largeur);
	var xSource = (xSourceEnTiles - 1) * 70;
	var ySource = (ySourceEnTiles - 1) * 70;
	console.log(debug);
	context.drawImage(this.image, xSource, ySource, 70, 70, xDestination, yDestination, 70, 70);
}

// Promise pour load le tileset en asynchrone
Tileset.loadTileset = function (url) {
	
	return new Promise ( (ok, error) => {
	
		this.image.src = "tilesets/" + url;
		tileset = new Tileset(url)
		ok(tileset);
		
	
	
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
