function Tileset() {
	// on creer un nouvel objet image
	// cet objet recevra la source de notre image après le loadTileset
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
		this.image.src = "tilesets/" + url; // On récupère le bon tileset grace à l'url
	});
};


// Méthode de dessin du tile numéro "numero" dans le contexte 2D "context" aux coordonnées x et y
Tileset.prototype.dessinerTile = function(numero, context, xDestination, yDestination, largeur) {
	var xSourceEnTiles = numero % 10; // modulo 10 car on a que 10 tiles par ligne dans notre tileset
	
	if(xSourceEnTiles == 0) xSourceEnTiles = largeur; // on prend la derniere tile (la 10e) si notre numero > 10
	var ySourceEnTiles = Math.ceil(numero / largeur); // on récupère la ligne
	var xSource = (xSourceEnTiles - 1) * 70; // Valeur en pixel
	var ySource = (ySourceEnTiles - 1) * 70; // valeur en pixel

	// On dessine la tile correspondande à la destination indiqué 
	context.drawImage(this.image, xSource, ySource, 70, 70, xDestination, yDestination, 70, 70);
};





	
	
