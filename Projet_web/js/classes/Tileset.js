function Tileset() {
	// Chargement de l'image dans l'attribut image
	this.image = new Image();
};


// Promise pour load le tileset
Tileset.prototype.loadTileset = function (url) {
	return new Promise ( (ok, error) => {
		this.image.onload = () => {           
                if (!this.image.complete)
                    error(new Error("Erreur de chargement du tileset nommé \"" + url + "\".")); 

				ok();
            }
		this.image.src = "tilesets/" + url;
	});
};


// Méthode de dessin du tile numéro "numero" dans le contexte 2D "context" aux coordonnées x et y
Tileset.prototype.dessinerTile = function(numero, context, xDestination, yDestination, largeur) {
	var xSourceEnTiles = numero % 10;
	if(xSourceEnTiles == 0) xSourceEnTiles = largeur;
	var ySourceEnTiles = Math.ceil(numero / largeur);
	var xSource = (xSourceEnTiles - 1) * 70;
	var ySource = (ySourceEnTiles - 1) * 70;
	context.drawImage(this.image, xSource, ySource, 70, 70, xDestination, yDestination, 70, 70);
};





	
	
