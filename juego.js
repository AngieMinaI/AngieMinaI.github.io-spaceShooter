var nave;
var balas;
var tiempoEntreBalas=400;
var tiempo=0;
var malos;
var timer;
var puntos;
var txtPuntos;
var vidas = 3;
var txtVidas;
var cursor;

var Juego={
	preload: function () {
		juego.load.image('nave','img/nave3.png');
		juego.load.image('laser','img/laser.png');
		juego.load.image('malo','img/alien2.png');
		juego.load.image('bg','img/bg.png');

		juego.load.audio('sonidoColision', 'audio/explosion.mp3');
        juego.load.audio('sonidoDisparo', 'audio/disparo.ogg');
	},

	create: function(){
		fondo = juego.add.tileSprite(0,0,400,540,'bg');
		juego.physics.startSystem(Phaser.Physics.ARCADE);
		nave=juego.add.sprite(juego.width/2, 485, 'nave');
		nave.anchor.setTo(0.5);
		juego.physics.arcade.enable(nave, true);

		cursor = juego.input.keyboard.createCursorKeys();

		balas = juego.add.group();
		balas.enableBody=true;
		balas.setBodyType=Phaser.Physics.ARCADE;
		balas.createMultiple(50,'laser');
		balas.setAll('anchor.x', 0.5);
		balas.setAll('anchor.y', 0.5);
		balas.setAll('checkWorldBounds', true);
		balas.setAll('outOfBoundsKill', true);

		malos = juego.add.group();
		malos.enableBody=true;
		malos.setBodyType=Phaser.Physics.ARCADE;
		malos.createMultiple(30,'malo');
		malos.setAll('anchor.x', 0.5);
		malos.setAll('anchor.y', 0.5);
		malos.setAll('checkWorldBounds', true);
		malos.setAll('outOfBoundsKill', true);

		timer=juego.time.events.loop(2000, this.crearEnemigo, this);

		puntos=0;
		juego.add.text(20,20, "Puntos:",{font:"14px Arial", fill:"#FFF"});
		txtPuntos=juego.add.text(80,20,"0",{font:"14px Arial", fill:"#FFF"});

		
		juego.add.text(310,20, "Vidas:",{font:"14px Arial", fill:"#FFF"});
		txtVidas=juego.add.text(360,20,"3",{font:"14px Arial", fill:"#FFF"});

		sonidoColision = juego.add.audio('sonidoColision');
        sonidoDisparo = juego.add.audio('sonidoDisparo'); 
	},
	update: function(){

		fondo.tilePosition.y += 3;
		nave.rotation=juego.physics.arcade.angleToPointer(nave)+Math.PI/2;
		
		if (cursor.left.isDown && nave.x > nave.width / 2) {
            nave.x -= 5;
        } else if (cursor.right.isDown && nave.x < juego.width - nave.width / 2) {
            nave.x += 5;
        }

		if(juego.input.activePointer.isDown){
			this.disparar();
	}
	
		juego.physics.arcade.overlap(balas, malos, this.colision, null, this);

	
        juego.physics.arcade.overlap(malos, nave, this.perderVida, null, this);

     // Perdida de vida si pasa de la nave

 	malos.forEachAlive(function(m){
  		if (m.position.y > 520 && m.position.y < 521){
   			vidas -= 1;
   			txtVidas.text = vidas;
 	 	}
 	});

 		if(vidas == 0){
  			juego.state.start('Terminado');
  			alert("Game Over");
		 }

	},
	disparar: function () {
		if(juego.time.now > tiempo && balas.countDead()>0){
			tiempo = juego.time.now+tiempoEntreBalas;
			var bala= balas.getFirstDead();
			bala.anchor.setTo(0.5);
			bala.reset(nave.x, nave.y);
			bala.rotation= juego.physics.arcade.angleToPointer(bala)+Math.PI/2;
			juego.physics.arcade.moveToPointer(bala, 200);

			sonidoDisparo.play();
		}
	},
	crearEnemigo: function(){
		var enem = malos.getFirstDead();
		var num = Math.floor(Math.random()*10+1);
		enem.reset(num*38,0);
		enem.anchor.setTo(0.5);
		enem.body.velocity.y=100;
		enem.checkWorldBounds=true;
		enem.outOfBoundsKill=true;

	},
	colision: function(b, m){
		 b.kill();
		 m.kill();
		 puntos++;
		 txtPuntos.text = puntos;

		 sonidoColision.play();
	},
	perderVida: function (nave, malo) {
        malo.kill();
        vidas -= 1;
        txtVidas.text = vidas;
        if (vidas <= 0) {
            juego.state.start('Terminado');
            alert("Game Over");
        }
    }


};