 function Personnage(url, ctx, type, x, y){
 		this.ctx = ctx;
        this.ts = new Tileset();   
        this.ts.loadTileset(url);
        if (type){
            this.right=true;
        }
        else {
            this.right = false;
        }

        this.x = x;
        this.y = y;        
        this.dx = 0;
        this.dy = 0;
        this.ddx = 0;
        this.ddy = 0;
        this.falling = false;
        this.jumping = false;
        this.left = false;
        this.jump = false;
        this.run = false;
        this.monster = type;
        this.dead = false;
        this.vie = 4;
        this.tile = 1;
        this.cpt = 0;
};

Personnage.prototype.dessinerPersonnage = function(numero, context, xDestination, yDestination)
    {           
        // On détermine la colonne/ligne de la tile désirée
        if (!this.monster){
        let tile_width = this.ts.image.width/6;
        let x = numero % 6  ;      
        if(x == 0) x = 6;
        
        let y = Math.ceil(numero / 6);                

        let xSource = (x - 1) * tile_width;                
        let ySource = (y - 1) * this.ts.image.height/1;        
        
            context.drawImage(this.ts.image, xSource, ySource, 62, 55, xDestination, yDestination, 70, 70);
        }  
        else {
            // On détermine la colonne/ligne de la tile désirée
            let tile_width = this.ts.image.width/1;
            let x = numero % 1  ;      
            if(x == 0) x = 1;
            
            let y = Math.ceil(numero / 1);                

            let xSource = (x - 1) * tile_width;                
            let ySource = (y - 1) * this.ts.image.height/1; 
            context.drawImage(this.ts.image, xSource, ySource, 52, 70, xDestination, yDestination, 70, 70);
        }
    }


Personnage.prototype.renderPlayer = function (dt){  


    if( !this.monster ){


        // SI JE VAIS A DROITE
        if (this.right && this.cpt >= 15){

            if (this.tile >= 3){
                this.tile = 1;
                this.dessinerPersonnage(this.tile, this.ctx, this.x + (this.dx * dt), this.y + (this.dy * dt) );
                this.cpt = 0;
            }
            else{
                this.tile += 1;
                this.dessinerPersonnage(this.tile, this.ctx, this.x + (this.dx * dt), this.y + (this.dy * dt) );
                this.cpt = 0;
            }  
        }
        else if (this.left && this.cpt >= 15){

            if (this.tile < 4 || this.tile >= 6){
                this.tile = 4;
                this.dessinerPersonnage(this.tile, this.ctx, this.x + (this.dx * dt), this.y + (this.dy * dt) );
                this.cpt = 0;
            }
            else{
                this.tile += 1;
                this.dessinerPersonnage(this.tile, this.ctx, this.x + (this.dx * dt), this.y + (this.dy * dt) );
                this.cpt = 0;
            }  
        }
        else {
            this.dessinerPersonnage(this.tile, this.ctx, this.x + (this.dx * dt), this.y + (this.dy * dt) );
            this.cpt++;
        }


        if (this.x < 2400)
        {
            // Gestion de la vie ici !
            this.ctx.fillStyle = '#CC0000';
            this.ctx.fillRect(this.x + 50, 70 * 12, (this.vie/100)*10000, 30);


            this.ctx.font = "bold 25px Arial";
            this.ctx.fillText("Sant\351: : "+this.vie * 100 / 4 +"%", this.x + 50, 70 * 12 - 10);

            // affiche la vie sous forme de bloc
            //for(n = 0, max = this.vie ; n < max ; n++)
              //this.ctx.fillRect(this.x + 70 * ( 2 + n ) - 40, 70 * 12.5, 70/2, 70/2);
        }
        else{
             // Gestion de la vie ici !
            this.ctx.fillStyle = '#CC0000';
            this.ctx.fillRect(2400 + 50, 70 * 12, (this.vie/100)*10000, 30);


            this.ctx.font = "bold 25px Arial";
            this.ctx.fillText("Sant\351: : "+this.vie * 100 / 4 +"%", 2400 + 50, 70 * 12 - 10);

                // affiche la vie sous forme de bloc 
            /*for(n = 0, max = this.vie ; n < max ; n++)
              this.ctx.fillRect(2400 + 70 * ( 2 + n ) - 40, 70 * 12.5, 70/2, 70/2);
            */
        }
    }

}

Personnage.prototype.renderMonster = function (dt){
    if (!this.dead){
    this.dessinerPersonnage(1, this.ctx, this.x + (this.dx * dt), this.y + (this.dy * dt) ); 
    } 
}

Personnage.prototype.killPlayer = function () {
    this.x = 75;
    this.y = 70;
    this.dx = this.dy = 0;
    this.vie = 3;
    
}

Personnage.prototype.blessePlayer = function () {
    if (this.vie == 1){
        this.x = 75;
        this.y = 70;
        this.dx = this.dy = 0;
        this.vie = 3;
    }
    else {
        this.vie--;
        this.y -= 50;
    }
}


