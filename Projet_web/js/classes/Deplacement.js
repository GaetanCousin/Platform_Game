class Deplacement {


// Gestion des evenements en fonction de la touche du clavier pressé
static keyboardInput(event, player, down) {

        // Gauche
        if (event.keyCode == 37) {
            event.preventDefault();
            player.left = down;
        }
        // Droite
        else if (event.keyCode == 39) {
            event.preventDefault();
            player.right = down;
        }
        // Espace ( sauter )
        else if (event.keyCode == 32) {
            event.preventDefault();
            player.jump = down;
        }

        // Shift ( courir )
        else if (event.keyCode == 16) {
            event.preventDefault();            
            player.run = down;
        }
    }
};