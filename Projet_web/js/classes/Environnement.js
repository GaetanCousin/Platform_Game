var METER = 18;                              // abitrary choice for 1m
var GRAVITY  = METER * 9.8 * 6;    // very exagerated gravity (6x)
var MAXDX    = METER * 20;         // max horizontal speed (20 tiles per second)
var MAXDY    = METER * 60;         // max vertical speed   (60 tiles per second)
var ACCEL    = MAXDX * 2;          // horizontal acceleration -  take 1/2 second to reach maxdx
var FRICTION = MAXDX * 6;          // horizontal friction     -  take 1/6 second to stop from maxdx
var JUMP     = METER * 2000;       // (a large) instantaneous jump impulse
var MAXDX_RUNNING = MAXDX * 10;

var DIV_HEIGHT = 560;
var FRAME_WIDTH = 700;


function Environnement(){

    this.niveau = 0;
    this.nomNiveau = ['deuxieme','troisieme'];
    this.url = this.nomNiveau[this.niveau];

	// The frame around the map
    this.div_frame = document.getElementById("window");

	this.canvas_map = document.getElementById('canvas_map');
	this.ctx_map = this.canvas_map.getContext('2d');

	this.canvas_personnage = document.getElementById('canvas_personnage');
	this.ctx_personnage = this.canvas_personnage.getContext('2d');	

    this.monsters = [];

    this.chargementMap();

    this.Personnage = new Personnage('sokoban_final.png', this.ctx_personnage, false, 75 ,70);
    
    //for (n = 0, max = 2 ; n < max ; n++)
    //{
        
    //}

        
    setTimeout(() => {this.init();}, 500);
    setTimeout(() => {this.frame();}, 1000);
}

Environnement.prototype.chargementMap = function () {
var start_map = Promise.resolve(this.ctx_map);

    start_map
        .then (() => {return Map.loadMap(this.ctx_map, this.url) })
        .then ((map) => { 
                this.map = map;
                this.tailleCanvas();
                this.map.dessinerMap();
                this.monsters.push(new Personnage('luigi_fou.png', this.ctx_personnage, true, this.map.mapData.posMonster1_x, this.map.mapData.posMonster1_y));
                this.monsters.push(new Personnage('luigi_fou.png', this.ctx_personnage, true, this.map.mapData.posMonster2_x, this.map.mapData.posMonster2_y));
        })
        //.then (console.log('FIN'));


}

Environnement.prototype.tailleCanvas = function() {
    let tile_size = this.map.mapData.tile_size;
    let CvHeight = this.map.getHauteur() * tile_size;
    let CvWidth = this.map.getLargeur() * tile_size;

	canvas_map.height = CvHeight;
	canvas_map.width  = CvWidth;
    canvas_personnage.height = CvHeight;
    canvas_personnage.width  =  CvWidth;
};


Environnement.prototype.overlap = function(x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(((x1 + w1 - 1) < x2) ||
             ((x2 + w2 - 1) < x1) ||
             ((y1 + h1 - 1) < y2) ||
             ((y2 + h2 - 1) < y1))
}


Environnement.prototype.bound = function(x , min , max ) {
        return Math.max(min, Math.min(max, x));
    }

Environnement.prototype.timestamp = function(){
        return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    }


Environnement.prototype.init = function () {
        this.fps  = 60;
        this.step = 1/this.fps;
        this.dt   = 0;
        this.now = this.timestamp();         
        this.last = this.timestamp();
        this.collision = new Collision(this.map.mapData);        
    }


Environnement.prototype.frame = function () {
        this.now = this.timestamp(); 
        this.dt = this.dt + Math.min(1, (this.now - this.last) / 1000);

        while(this.dt > this.step) {
            this.dt = this.dt - this.step;
            this.update(this.Personnage, this.step);
            this.updateMonsters(this.step);
        }
        this.render(this.ctx_personnage, this.dt);
        
        this.last = this.now;
        requestAnimationFrame( () => {this.frame();});
    }

Environnement.prototype.update = function (perso, dt) {      
        let wasleft  = perso.dx < 0;
        let wasright = perso.dx > 0;
        let falling  = perso.falling;
        let max_dx = MAXDX;

        perso.ddx = 0;
        perso.ddy = METER * 9.8 * 6;

        if (perso.run)
            max_dx = MAXDX_RUNNING;

        if (perso.left)
            perso.ddx = perso.ddx - ACCEL;     // player wants to go left
        else if (wasleft)
            perso.ddx = perso.ddx + FRICTION;  // player was going left, but not any more

        if (perso.right)
            perso.ddx = perso.ddx + ACCEL;     // player wants to go right
        else if (wasright)
            perso.ddx = perso.ddx - FRICTION;  // player was going right, but not any more

        if (perso.jump && !perso.jumping && !falling) {
            perso.ddy = perso.ddy - JUMP;     // apply an instantaneous (large) vertical impulse
            perso.jumping = true;
        }

        perso.y  = perso.y  + (dt * perso.dy);
        perso.x  = perso.x  + (dt * perso.dx);
        perso.dx = this.bound(perso.dx + (dt * perso.ddx), -max_dx, max_dx);
        perso.dy = this.bound(perso.dy + (dt * perso.ddy), -MAXDY, MAXDY);

        if ((wasleft  && (perso.dx > 0)) || (wasright && (perso.dx < 0))) {
            perso.dx = 0; // clamp at zero to prevent friction from making us jiggle side to side
        }

        // Collision Detection
       this.collision.position(perso);
    }

Environnement.prototype.updateMonsters = function (dt) { 
    var n, max;
    for(n = 0, max = this.monsters.length ; n < max ; n++)
      this.updateMonster(this.monsters[n], dt);
  } 

Environnement.prototype.updateMonster = function (monster, dt) {
    let TILE = this.map.mapData.tile_size;
    //if (!monster.dead) {
      this.update(monster, dt);
      if (this.overlap(this.Personnage.x, this.Personnage.y, TILE, TILE, monster.x, monster.y, TILE, TILE)) {
        if ((this.Personnage.dy > 0) && (monster.y - this.Personnage.y > TILE/2)){
          //killMonster(monster);
        }
        else
          this.Personnage.blessePlayer();
      }
    //}
  }



Environnement.prototype.render = function (ctx, dt) {
        ctx.clearRect( 0, 0, this.canvas_personnage.width, this.canvas_personnage.height);
        this.Personnage.renderPlayer(dt);



        for (n = 0, max = this.monsters.length ; n < max ; n++){
            this.monsters[n].renderMonster(dt);
        }

        this.render_div();
}

    // On bouge la map quand le player est au milieu

Environnement.prototype.render_div = function () {
	 this.div_frame.scrollLeft = this.Personnage.x - (FRAME_WIDTH / 2) ; 
}
