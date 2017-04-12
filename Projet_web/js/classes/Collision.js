// Constructeur de Collision
function Collision(mapData){
    this.mapData = mapData; // contient uniquement les donnée de la Map extrait du JSON
};

// transformation de tile à pixel
Collision.prototype.t2p = function(t) {
    return t*this.mapData.tile_size;
};

// transformation de pixel à tile
Collision.prototype.p2t = function(p) {
    return Math.floor(p/this.mapData.tile_size); 
};

// retourne la une cellule de la map avec des coordonnée en pixel
Collision.prototype.cell = function (x, y) {
    return this.tcell(this.p2t(x), this.p2t(y), this.mapData.terrain);
};

// retourne une tile
Collision.prototype.tcell = function (tx, ty) {
    return this.mapData.terrain[ty][tx];
};


Collision.prototype.position = function ( personnage ) {
        // Variable de collisions :
        let tx        = this.p2t(personnage.x); // coord x de la tile ou se situe le personnage
        let ty        = this.p2t(personnage.y); // coord y de la tile ou se situe le personnage
        let nx        = personnage.x%this.mapData.tile_size; // true s'il chevauche la tile de droite
        let ny        = personnage.y%this.mapData.tile_size;        
        let cell      = this.tcell(tx, ty, this.mapData); // tile ou se trouve le personnage
        let cellright = this.tcell(tx + 1, ty, this.mapData); // tile a droite du personnage
        let celldown  = this.tcell(tx, ty + 1, this.mapData); // tile en dessous du personnage
        let celldiag  = this.tcell(tx + 1, ty + 1, this.mapData); // tile en diag du personnage (coin haut droit)

        // SI le personnage en mvt vers le bas
        // et qu'il rencontre une tile solide, il s'arrete.
        if (personnage.dy > 0) {
            if ((celldown && !cell) ||
                (celldiag && !cellright && nx)) {
                personnage.y = this.t2p(ty);
                personnage.dy = 0;
                personnage.falling = false;
                personnage.jumping = false;
                ny = 0;
            }
        }
        // Si le personnage en mvt vers le haut
        // et qu'il rencontre une tile solide, il retourne de 1 en bas
        // le rendu a lieu après donc il ne collisionnera pas en haut
        else if (personnage.dy < 0) {
            if ((cell      && !celldown) ||
                (cellright && !celldiag && nx)) {
                personnage.y = this.t2p(ty + 1);                
                personnage.dy = 0;
                cell      = celldown;
                cellright = celldiag;
                ny        = 0;
            }
        }
        // si le personnage va vers la droite
        // et qu'il rencontre une tile solide, il s'arrete
        if (personnage.dx > 0) {
            if ((cellright && !cell) ||
                (celldiag  && !celldown && ny)) {
                personnage.x = this.t2p(tx);
                personnage.dx = 0;
            }
        }
        // si le personnage va vers la gauche
        // et qu'il rencontre une tile solide, il retourne de 1 vers la droite
        // le rendu a lieu après donc il ne collisionnera pas à gauche
        else if (personnage.dx < 0) {
            if ((cell     && !cellright) ||
                (celldown && !celldiag && ny)) {
                personnage.x = this.t2p(tx + 1);
                personnage.dx = 0;
            }
        }


    
    // si l'ennemie va a gauche et qu'il rencontre une collision ou un trou
    // Il change de direction et va à droite
    if (personnage.ennemi) {
      if (personnage.left && (cell || !celldown)) {
        personnage.left = false;
        personnage.right = true;
      }
      // et inversement si l'ennemi va a droite et qu'il rencontre une collision ou un trou
      // Il change de direction et va à gauche     
      else if (personnage.right && (cellright || !celldiag)) {
        personnage.right = false;
        personnage.left  = true;
      }
    }

    // si la cellule sous les pied du personnage est la tile 5 ( tremplin )
    // alors il peut sauter plus haut
    else {
        if (celldown == 5)
        personnage.SuperSaut = true;
        else 
        personnage.SuperSaut = false;

    // si la cellule sous les pied du personnage est la tile 20 ( piques )
    // alors il subit des degats
    if (celldown == 20)
        personnage.blesseJoueur();

    // si la cellule sous les pied du personnage est la tile 10 ( lave )
    // alors il meurt instantanément 
    if (celldown == 10) 
        personnage.killJoueur();

    // si la cellule sous les pied du personnage est la tile 9 ( tile de victoire )
    // alors on recharge la page... plus tard on pourrait faire passer au niveau suivant
    if (celldown == 9 || cellright == 9 ||celldiag == 9 ){
        window.location.reload(); 
    }


    }
        // Maj de la variable de chutte 
        personnage.falling = ! (celldown || (nx && celldiag));
}

