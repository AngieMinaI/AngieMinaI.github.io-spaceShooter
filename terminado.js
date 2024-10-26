var Terminado ={
	preload: function () {

	},

	create: function(){
		juego.stage.backgroundColor="#990000";

		var estilo = { font: "bold 32px Arial", fill: "#FFFFFF", align: "center" };
        juego.add.text(juego.width / 2, juego.height / 2, "Game Over", estilo).anchor.setTo(0.5);
	}

};