window.onload = () => {
    //let init the environment
    var env = new Environnement();

    // Add keybord events handling
    document.addEventListener('keydown', function(ev){
        Deplacement.keyboardInput(ev, env.Personnage, true);
    }, false);

    document.addEventListener('keyup', function(ev){
        Deplacement.keyboardInput(ev, env.Personnage, false);
    }, false);

}

