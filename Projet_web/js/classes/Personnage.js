 // Constructeur de Personnage
 // si notre Personnage est un ennemie alors type == true
 function Personnage(url, ctx, type, x, y){

 		this.ctx = ctx; // On récupère le context
        this.ts = new Tileset();  // On creer un nouveau Tileset 
        this.ts.loadTileset(url); // On load le nouveau Tilset avec l'url de notre personnage

        // Si c'est un ennemie
        if (type){
            this.right=true; // On initialise un mouvement
        }
        // Si c'est un joueur
        else {
            this.right = false; // On laisse a false si c'est un joueur
        }

        // Variable commune entre Joueur et Ennemi :

        this.x = x; // coord x
        this.y = y; // coord y
        this.dx = 0; // vecteur vitesse x
        this.dy = 0; // vecteur vitesse y
        this.ddx = 0; // force horizontale
        this.ddy = 0; // force verticale

        // Tout à false au début : le joueur est immobile de base
        this.falling = false; // tomber
        this.jumping = false; // sauter
        this.left = false; // gauche
        this.jump = false; // droite
        this.run = false; // courir
        this.SuperSaut = false; // false

        this.ennemi = type; // type du personnage 
        this.dead = false; // mort ou pas (utile pour plus tard)
        this.vie = 4; // vie du joueur
        this.tile = 1; // tile de départ utilisé
        this.cpt = 0; // compteur pour l'animation 
};

Personnage.prototype.dessinerPersonnage = function(numero, context, xDestination, yDestination)
    {           
        // On détermine la colonne/ligne de la tile désirée
        if (!this.ennemi){ // si c'est un joueur
        let tile_width = this.ts.image.width/6; // Divise par 6 car le tileset à 6 tiles
        let x = numero % 6  ; // On veut pas dépasser les 6 tiles      
        if(x == 0) x = 6; // on prend la derniere tile si on dépasse
        
        let y = Math.ceil(numero / 6);  // on recuppère la ligne              

        let xSource = (x - 1) * tile_width; // Valeur en pixel               
        let ySource = (y - 1) * this.ts.image.height/1;   // valeur en pixel     
        
            // On dessine le personnage, 62 et 55 pour le tileset car il mesure 377*55 et 377/6 ~= 62
            context.drawImage(this.ts.image, xSource, ySource, 62, 55, xDestination, yDestination, 70, 70);
        }  
        // Si c'est pas un joueur on va récupérer le tileset des enemies/monstres
        else {
            // On détermine la colonne/ligne de la tile désirée
            // même principe, on change juste les données du tileset
            let tile_width = this.ts.image.width/1; // 1 seule tile
            let x = numero % 1  ;      
            if(x == 0) x = 1;
            
            let y = Math.ceil(numero / 1); // pas besoin mais on garde si on change de tileset               

            let xSource = (x - 1) * tile_width;                
            let ySource = (y - 1) * this.ts.image.height/1; // pas besoin mais on garde si on change de tileset
            // l'image mesure 52*70
            context.drawImage(this.ts.image, xSource, ySource, 52, 70, xDestination, yDestination, 70, 70);
        }
    }


// Fonction qui permet le rendu d'un joueur
Personnage.prototype.RenderPersonnage = function (dt){  

    // si c'est un joueur
    if( !this.ennemi ){


        // Si je vais a droite depuis plus de 1/4 de seconde
        if (this.right && this.cpt >= 15){

            // Si la tile utilisé est la fin du mvt de droite ou une tile differente du mvt de droite
            if (this.tile >= 3){
                this.tile = 1; // alors on reprend la tile de depart de mvt de droite
                // on dessine notre personnage avec cette tile
                this.dessinerPersonnage(this.tile, this.ctx, this.x + (this.dx * dt), this.y + (this.dy * dt) );
                // et on remet le cpt a zero 
                this.cpt = 0;
            }
            else{
                // sinon on prend juste la tile suivante du mvt de droite
                this.tile += 1;
                // on dessine notre personnage avec la nouvelle tile
                this.dessinerPersonnage(this.tile, this.ctx, this.x + (this.dx * dt), this.y + (this.dy * dt) );
                // on remet le cpt a zero
                this.cpt = 0;
            }  
        }
        // Si je vais a gauche depuis plus de 1/4 de seconde
        else if (this.left && this.cpt >= 15){

            // Si la tile utilisé est la fin du mvt de gauche ou une tile differente du mvt de gauche
            if (this.tile < 4 || this.tile >= 6){
                this.tile = 4;  // alors on reprend la tile de depart de mvt de gauche
                // on dessine notre personnage avec cette tile
                this.dessinerPersonnage(this.tile, this.ctx, this.x + (this.dx * dt), this.y + (this.dy * dt) );
                // et on remet le cpt a zero 
                this.cpt = 0;
            }
            else{
                // sinon on prend juste la tile suivante du mvt de gauche
                this.tile += 1;
                // on dessine notre personnage avec la nouvelle tile
                this.dessinerPersonnage(this.tile, this.ctx, this.x + (this.dx * dt), this.y + (this.dy * dt) );
                 // on remet le cpt a zero
                this.cpt = 0;
            }  
        }
        else { // Sinon on prend juste la tile actuel ( ce sera la même pendant 1/4 de seconde d'une même direction )
            this.dessinerPersonnage(this.tile, this.ctx, this.x + (this.dx * dt), this.y + (this.dy * dt) );
            // et on incremente le compteur
            this.cpt++;
        }


        // Ici on gère la vie du personnage
        if (this.x < 2400) // ce test sert juste à éviter que la barre de vie sorte du canvas du personnage
        {
            // Gestion de la vie ici !
            this.ctx.fillStyle = '#CC0000'; // couleur rouge
            this.ctx.fillRect(this.x + 50, 70 * 12, (this.vie/100)*10000, 30); // rect proportionnel a la vie du joueur

            // texte pour comprendre la notion de barre de vie
            this.ctx.font = "bold 25px Arial";
            this.ctx.fillText("Sant\351: : "+this.vie * 100 / 4 +"%", this.x + 50, 70 * 12 - 10);

            // affiche la vie sous forme de bloc ( autre forme )
            /*
            for(n = 0, max = this.vie ; n < max ; n++)
              this.ctx.fillRect(this.x + 70 * ( 2 + n ) - 40, 70 * 12.5, 70/2, 70/2);
            */
        }
        else{
             // Gestion de la vie ici !
            this.ctx.fillStyle = '#CC0000';
            this.ctx.fillRect(2400 + 50, 70 * 12, (this.vie/100)*10000, 30);


            this.ctx.font = "bold 25px Arial";
            this.ctx.fillText("Sant\351: : "+this.vie * 100 / 4 +"%", 2400 + 50, 70 * 12 - 10);

                // affiche la vie sous forme de bloc ( autre forme )
            /*
            for(n = 0, max = this.vie ; n < max ; n++)
              this.ctx.fillRect(2400 + 70 * ( 2 + n ) - 40, 70 * 12.5, 70/2, 70/2);
            */
        }
    }

}

// Rendu des ennemies
Personnage.prototype.renderEnnemi = function (dt){
    if (!this.dead){ // Il ne meurt jamais pour le moment mais utilise si on veut permettre au joueur de tuer les ennemies
    this.dessinerPersonnage(1, this.ctx, this.x + (this.dx * dt), this.y + (this.dy * dt) ); // tile 1 du tileset ennemie
    } 
}

// Quand le joueur meurt
Personnage.prototype.killJoueur = function () {
    // réinitialisation aux coordonnées de départ
    this.x = 75; 
    this.y = 70;
    this.dx = this.dy = 0;
    // On lui réinitialise aussi ses points de vie
    this.vie = 4;
    
}

// Quand le joueur est blessé
Personnage.prototype.blesseJoueur = function () {
    // Si il a 1 pdv alors il meurt 
    if (this.vie == 1){
        this.x = 75;
        this.y = 70;
        this.dx = this.dy = 0;
        this.vie = 4;
    } 
    // sinon il perd 1 pdv et this.y -= 50 sert a lui faire effectuer un petit saut de recul 
    // pour montrer qu'il a prit des degats
    else {
        this.vie--;
        this.y -= 50;
    }
}


