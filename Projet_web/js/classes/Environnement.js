// CONSTANTE DE L'ENVIRONNEMENT

var Metre = 18;                    // 18 mètre pour 1 mètre ( plutot rapide )
var Gravite  = Metre * 9.8 * 6;    // gravité x 6
var MAXDX    = Metre * 20;         // Vitesse max horizontale (20 tile / sec )
var MAXDY    = Metre * 60;         // Vitesse max verticale ( 60 tile / sec )
var AccelHorizontale    = MAXDX * 2;          // Acceleration horizontale -  1/2 sec pour atteindre de max
var Frottement = MAXDX * 6;          // Friction horizontale     -  1/6 sec pour s'arreter en partant de la vitesse max
var Saut     = Metre * 2000;       // Saut du personnage
var SuperSaut = 25 * 2000;       // Saut avec tremplin
var Course = MAXDX * 10;   // vitesse max horizontale en sprint 

var WindowLargeur = 700;


function Environnement(){

    // debut de l'implémentation pour plusieurs niveau
    this.niveau = 0; 
    this.nomNiveau = ['premiere','troisieme'];
    this.url = this.nomNiveau[this.niveau];

	// The frame around the map
    this.div_frame = document.getElementById("window");

    // canvas de la map
	this.canvas_map = document.getElementById('canvas_map');
	this.ctx_map = this.canvas_map.getContext('2d');

    // canvas du personnage
	this.canvas_personnage = document.getElementById('canvas_personnage');
	this.ctx_personnage = this.canvas_personnage.getContext('2d');	

    // tableau des ennemies
    this.ListeEnnemis = [];

    // Creation du personnage du joueur
    this.Personnage = new Personnage('sokoban_final.png', this.ctx_personnage, false, 75 ,70);
    

    // Fonction qui charge la map initialise les ennemis
    this.chargementMap();

}

Environnement.prototype.chargementMap = function () {
var start_map = Promise.resolve(this.ctx_map);

    start_map
        .then (() => {return Map.loadMap(this.ctx_map, this.url) })
        .then ((map) => { 
                this.map = map;
                this.tailleCanvas();
                this.map.dessinerMap();
                // Si beaucoup de monstre faire une boucle for de 0 à nbEnnemis - 1
                this.ListeEnnemis.push(new Personnage('luigi_fou.png', this.ctx_personnage, true, this.map.mapData.posEnnemi1_x, this.map.mapData.posEnnemi1_y));
                this.ListeEnnemis.push(new Personnage('luigi_fou.png', this.ctx_personnage, true, this.map.mapData.posEnnemi2_x, this.map.mapData.posEnnemi2_y));
        })
        .then( () => { this.init() })
        .then( () => { this.frame() })
        //.then (console.log('FIN'));


}


// on adapte le canvas à la map
Environnement.prototype.tailleCanvas = function() {
    let tile_size = this.map.mapData.tile_size;
    let CvHeight = this.map.getHauteur() * tile_size;
    let CvWidth = this.map.getLargeur() * tile_size;

	canvas_map.height = CvHeight;
	canvas_map.width  = CvWidth;
    canvas_personnage.height = CvHeight;
    canvas_personnage.width  =  CvWidth;
};


// On test si le joueur et l'ennemie se superpose 
Environnement.prototype.overlap = function(x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(((x1 + w1 - 1) < x2) ||
             ((x2 + w2 - 1) < x1) ||
             ((y1 + h1 - 1) < y2) ||
             ((y2 + h2 - 1) < y1))
}


// fonction auxiliaire qui retourne le max entre un entier et le min de deux autres entiers
Environnement.prototype.bound = function(x , min , max ) {
        return Math.max(min, Math.min(max, x));
    }

// fonction auxiliaire pour la boucle de rendu
Environnement.prototype.timestamp = function(){
        return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    }



// initialisation de l'environnement avec ses collisions
Environnement.prototype.init = function () {

            this.fps  = 60;
            this.etape = 1/this.fps;
            this.dt   = 0;
            this.now = this.timestamp();         
            this.last = this.timestamp();
            this.collision = new Collision(this.map.mapData);
}


// Boucle permettant 1 rendu de 60fps
Environnement.prototype.frame = function () {

        this.now = this.timestamp(); 
        this.dt = this.dt + Math.min(1, (this.now - this.last) / 1000);

        while(this.dt > this.etape) {
            this.dt = this.dt - this.etape;
            this.update(this.Personnage, this.etape);
            this.updateListeEnnemis(this.etape);
        }
        this.render(this.ctx_personnage, this.dt);
        
        this.last = this.now;
        requestAnimationFrame( () => {this.frame();});
}

// fonction de mise à jour des personnage
Environnement.prototype.update = function (perso, dt) {      
        let vientDeGauche  = perso.dx < 0;
        let vientDeDroite = perso.dx > 0;
        let Chute  = perso.falling;
        let max_dx = MAXDX;

        perso.ddx = 0;
        perso.ddy = Gravite;

        if (perso.run)
            max_dx = Course;

        if (perso.left)// Si le personnage veut aller à gauche 
            perso.ddx = perso.ddx - AccelHorizontale;   //  ( on accelere sont vecteur vitesse jusqua vitesseMax progressivement)
        else if (vientDeGauche) // Si le personnage veut arrete d'aller vers la gauche
            perso.ddx = perso.ddx + Frottement; // On le ralentit avec les frottements

        if (perso.right)// Si le joueur veut aller à droite
            perso.ddx = perso.ddx + AccelHorizontale;   //  ( on accelere sont vecteur vitesse jusqua vitesseMax progressivement)   
        else if (vientDeDroite)
            perso.ddx = perso.ddx - Frottement;   // Si le personnage veut arrete d'aller vers la droite


        // AJOUT POSSIBLE  --->   Ici on pourrait ajouter le double jump !   <--- AJOUT POSSIBLE  
        if (perso.jump && !perso.jumping && !Chute) { 
            if(perso.SuperSaut)
                perso.ddy = perso.ddy - SuperSaut;     // Option du super saut si le booleen SuperSaut est vrai
            else
                perso.ddy = perso.ddy - Saut; // Sinon saut normal 
            perso.jumping = true;
        }

        // On met à jour les variables
        perso.y  = perso.y  + (dt * perso.dy);
        perso.x  = perso.x  + (dt * perso.dx);
        perso.dx = this.bound(perso.dx + (dt * perso.ddx), -max_dx, max_dx);
        perso.dy = this.bound(perso.dy + (dt * perso.ddy), -MAXDY, MAXDY);

        if ((vientDeGauche  && (perso.dx > 0)) || (vientDeDroite && (perso.dx < 0))) {
            perso.dx = 0; // clamp at zero to prevent friction from making us jiggle side to side
        }

        //Detection Collision 
       this.collision.position(perso);
    }

// Gestion de notre liste d'ennemis
// On update les ennemies un par un
Environnement.prototype.updateListeEnnemis = function (dt) { 
    var n, max;
    for(n = 0, max = this.ListeEnnemis.length ; n < max ; n++)
      this.updateEnnemi(this.ListeEnnemis[n], dt);
  } 

Environnement.prototype.updateEnnemi = function (ennemi, dt) {
    let TILE = this.map.mapData.tile_size;
      this.update(ennemi, dt);
      if (this.overlap(this.Personnage.x, this.Personnage.y, TILE, TILE, ennemi.x, ennemi.y, TILE, TILE)) {
        if ((this.Personnage.dy > 0) && (monster.y - this.Personnage.y > TILE/2)){
          // On ne gère pas le kill des ennmis encore
      }
      else
        this.Personnage.blesseJoueur();
    }
}


// On fait le rendu des personnages 
Environnement.prototype.render = function (ctx, dt) {
        ctx.clearRect( 0, 0, this.canvas_personnage.width, this.canvas_personnage.height);
        this.Personnage.RenderPersonnage(dt);

        // pour tous les ennemis
        for (n = 0, max = this.ListeEnnemis.length ; n < max ; n++){
            this.ListeEnnemis[n].renderEnnemi(dt);
        }

        this.render_div();
}

    
// On bouge la map quand le joueur est au milieu
Environnement.prototype.render_div = function () {
	 this.div_frame.scrollLeft = this.Personnage.x - (WindowLargeur / 2) ; 
}
