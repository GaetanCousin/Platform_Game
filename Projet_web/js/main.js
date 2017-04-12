window.onload = () => {
    //On initialise l'environnement
    var env = new Environnement();

    // On ajoute les Event listener pour gérer le mouvement du personnage

    // Key down
    document.addEventListener('keydown', function(ev){
        Deplacement.keyboardInput(ev, env.Personnage, true);
    }, false);

    // Key up
    document.addEventListener('keyup', function(ev){
        Deplacement.keyboardInput(ev, env.Personnage, false);
    }, false);

}

