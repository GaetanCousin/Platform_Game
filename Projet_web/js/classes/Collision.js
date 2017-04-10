function Collision(mapData){
    this.mapData = mapData;
};

Collision.prototype.t2p = function(t) {
    return t*this.mapData.tile_size;
};

Collision.prototype.p2t = function(p) {
    return Math.floor(p/this.mapData.tile_size); 
};

Collision.prototype.cell = function (x, y) {
    return this.tcell(this.p2t(x), this.p2t(y), this.mapData.terrain);
};

Collision.prototype.tcell = function (tx, ty) {
    return this.mapData.terrain[ty][tx];
};


Collision.prototype.position = function ( personnage ) {
        let tx        = this.p2t(personnage.x);
        let ty        = this.p2t(personnage.y);
        let nx        = personnage.x%this.mapData.tile_size;
        let ny        = personnage.y%this.mapData.tile_size;        
        let cell      = this.tcell(tx, ty, this.mapData);
        let cellright = this.tcell(tx + 1, ty, this.mapData);
        let celldown  = this.tcell(tx, ty + 1, this.mapData);
        let celldiag  = this.tcell(tx + 1, ty + 1, this.mapData);

        
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
        if (personnage.dx > 0) {
            if ((cellright && !cell) ||
                (celldiag  && !celldown && ny)) {
                personnage.x = this.t2p(tx);
                personnage.dx = 0;
            }
        }
        else if (personnage.dx < 0) {
            if ((cell     && !cellright) ||
                (celldown && !celldiag && ny)) {
                personnage.x = this.t2p(tx + 1);
                personnage.dx = 0;
            }
        }


    

    if (personnage.monster) {
      if (personnage.left && (cell || !celldown)) {
        personnage.left = false;
        personnage.right = true;
      }      
      else if (personnage.right && (cellright || !celldiag)) {
        personnage.right = false;
        personnage.left  = true;
      }
    }
    else {
        if (celldown == 5)
        personnage.jump = true;

    if (celldown == 20)
        personnage.blessePlayer();

    if (celldown == 10) 
        personnage.killPlayer();

    if (celldown == 9 || cellright == 9 ||celldiag == 9 ){
        alert('VICTOIRE');
        window.location.reload();
    }
    }

        personnage.falling = ! (celldown || (nx && celldiag));
}

