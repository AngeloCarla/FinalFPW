class Jefe extends Phaser.Scene {
    constructor() {
        super("Jefe");
        this.jugador = null;
        this.enemigo = null;
        this.grupoBalas = null;
        this.grupoNaves = null;
        this.cursors = null;
        this.bulletTime = 0;
        this.grupoBalasEnemigas = null; // Grupo de balas enemigas
        this.vidasEnemigo = 10; // Vida del enemigo
        this.vidasJugador = 3; // Número de vidas del jugador
        this.textoVidaJugador = null; // Texto para mostrar la vida del jugador
        this.textoVidaEnemigo = null; // Texto para mostrar la vida del enemigo
        this.maxVidasJugador = 3; // Valor máximo de vida del jugador
        this.maxVidasEnemigo = 10; // Valor máximo de vida del enemigo
        this.barraVidaJugador = null; // Barra de vida del jugador
        this.barraVidaEnemigo = null; // Barra de vida del enemigo
        this.barraAncho = 300; // Ancho para las barras de vida
        this.puntaje = 0; //Puntaje
        this.puntajeMaximo=0; //Mejor Puntaje
        this.textoPuntaje = 0;
        this.nombreJugador = 0; //Nombre del Jugador
        this.grupoBotiquines = null; // Grupo de botiquines
        this.maxVidaBotiquin = 1; // La cantidad de vida que restaura el botiquín
        this.control3 = null;

    }

    preload() {
        this.load.image('background', '/public/images/background2.jpg'); // Fondo del juego
        this.load.spritesheet('supernave', '/public/images/supernave2.png', { frameWidth: 45, frameHeight: 107.5 });//width192 & height144 NaveJugador
        this.load.spritesheet('naveJefe', '/public/images/supernave2-enemiga.png', { frameWidth: 45, frameHeight: 107.5 });//width192 & height144 NaveEnemiga
        this.load.spritesheet('naveEnemiga', '/public/images/enemy3.png', { frameWidth: 90, frameHeight: 49 });
        this.load.image('balaJugador', '/public/images/laserBullet-arriba.png');// Bala jugador
        this.load.image('bullet-enemiga', '/public/images/laserBullet-enemiga-abajo.png'); // Bala enemiga
        this.load.audio('laserSound', '/public/sounds/laserSound.mp3');
        this.load.image('botiquin', '/public/images/botiquin.png'); // Imagen del botiquín
        this.load.image('control3', '/public/images/controles3.png');
    }

    init(data) {
        this.puntaje = data.puntaje; //Recibe el puntaje
        this.puntajeMaximo= data.puntajeMaximo || 0;
        this.nombreJugador = this.registry.get('nombreJugador');
    }

    create() {
        this.background = this.add.tileSprite(663, 298, 1326, 596, 'background'); // Fondo animado

        // Crear jugador
        this.jugador = this.physics.add.sprite(663, 500, 'supernave'); //Creando la nave
        this.jugador.setCollideWorldBounds(true); // Evitar que el jugador salga de los límites
        this.vidasJugador = 3 //Crea al jugador con 3 de vida cuando inicia el escenario
        this.maxVidasJugador = 3;
        this.add.text(1050, 18, this.nombreJugador, { fontSize: '32px', fill: '#fff' }); //Nombre del Jugador en la parte derecha superior
        
       // Crear el enemigo
        this.enemigo = this.physics.add.sprite(663, 50, 'naveJefe');
        this.enemigo.setCollideWorldBounds(true);
        this.vidasEnemigo = 10; // Crea al enemigo con 10 de vida cuando inicia el escenario
        this.maxVidasEnemigo = 10;

        //Imagen control
        this.control3 = this.add.image(663, 298, 'control3').setOrigin(0.5);

        this.time.delayedCall(5000, () => {
            this.control3.destroy(); // Elimina la imagen después de 5 segundos
        });

        // Crear un tween para que el enemigo se mueva de un lado al otro
        this.tweens.add({
            targets: this.enemigo,
            x: { from: 100, to: 1200 }, // Rango de movimiento horizontal
            duration: 3000, // Tiempo que tarda en ir de un lado a otro (en milisegundos)
            ease: 'Linear', // Tipo de movimiento, puede ser 'Linear', 'Sine', 'Power1', etc.
            yoyo: true, // Para que vuelva en la dirección opuesta
            repeat: -1 // Repetir indefinidamente
        });
        
        // Animaciones del jugador
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('supernave', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'derecha',
            frames: this.anims.generateFrameNumbers('supernave', { start: 1, end: 3 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'izquierda',
            frames: this.anims.generateFrameNumbers('supernave', { start: 5, end: 7 }),
            frameRate: 10,
            repeat: 0
        });

        // Animacion Enemy
        this.anims.create({
            key: 'enemy_atack',
            frames: this.anims.generateFrameNumbers('naveEnemiga', { start: 0, end: 14 }),
            frameRate: 10,
            repeat: -1
        })


        // Controles del jugador
        this.cursors = this.input.keyboard.createCursorKeys(); // Controles

        // Grupo de balas del jugador
        this.grupoBalas = this.physics.add.group();

        // Grupo de balas enemigas
        this.grupoBalasEnemigas = this.physics.add.group();

        // Disparar con clic
        this.input.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown()) {
                let sonido = this.sound.add('laserSound');  // Efecto de sonido al disparar
                sonido.play({ volume: 0.2 });
                this.generarBalas();
            }
        });

        // Disparar balas desde el enemigo
        this.time.addEvent({
            delay: 1500, //  Tiempo que el jefe dispara una bala
            callback: this.dispararBalasEnemigo,
            callbackScope: this,
            loop: true
        });

        // Colisiones
        this.physics.add.collider(this.enemigo, this.grupoBalas, this.colisionBalasEnemigas, null, this);
        this.physics.add.collider(this.jugador, this.grupoBalasEnemigas, this.colisionBalasJugador, null, this);
        

        // Crear barra de vida del jugador (color verde)
        this.barraVidaJugador = this.add.graphics();
        this.dibujarBarraVida(this.barraVidaJugador, 20, 555, this.vidasJugador, this.maxVidasJugador, 0x2d8c24); // Verde

        // Crear barra de vida del enemigo (color rojo)
        this.barraVidaEnemigo = this.add.graphics();
        this.dibujarBarraVida(this.barraVidaEnemigo, 20, 525, this.vidasEnemigo, this.maxVidasEnemigo, 0xbf1f1f); // Rojo

        // Crear texto para mostrar vidas
        this.textoVidaJugador = this.add.text(20, 555, "Vida Jugador: "+this.vidasJugador, { fontSize: "20px", fill: "#fff" });
        this.textoVidaEnemigo = this.add.text(20, 525, "Vida Enemigo: "+this.vidasEnemigo, { fontSize: "20px", fill: "#fff" });

        // Muestra mensaje del nivel al jugador
        this.mensaje = this.add.text(663, 150, 'Jefe', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        // Eliminar el mensaje después de 2 segundos
        this.time.delayedCall(2000, () => {
            this.mensaje.destroy(); // Elimina el mensaje
        });

        //Muestra Puntaje
        this.textoPuntaje = this.add.text(18, 18, 'Puntaje: 0', { fontSize: '32px', fill: '#fff' });

        // Crear grupo de botiquines
        this.grupoBotiquines = this.physics.add.group();

        // Crear un evento de tiempo que generará un botiquín cada cierto tiempo
        this.time.addEvent({
        delay: Phaser.Math.Between(7000, 15000), // Tiempo aleatorio entre 7 y 15 segundos
        callback: this.generarBotiquin,
        callbackScope: this,
        loop: true
        });

        // Detectar colisión entre el jugador y los botiquines
        this.physics.add.overlap(this.jugador, this.grupoBotiquines, this.recogerBotiquin, null, this);

        //TIMER

        // Mostrar el temporizador en pantalla (opcional)
        this.textoTemporizador = this.add.text(1050, 50, 'Tiempo: 10', { fontSize: '32px', fill: '#fff' });

        // Crear el temporizador de 10 segundos
        this.tiempoRestante = 10; // 10 segundos
        this.eventoTemporizador = this.time.addEvent({
            delay: 1000, // 1 segundo
            callback: this.actualizarTemporizador,
            callbackScope: this,
            loop: true
        });

        //FIN TIMER

        this.grupoNaves = this.physics.add.group(); //Creando el grupo de naves
        //this.time.addEvent({ delay: 500, callback: this.generarNaves, callbackScope: this, loop: true });
        
        //colision
        this.physics.add.collider(this.jugador, this.grupoNaves, this.colisionJugadorEnemigo, null, this);
        this.physics.add.collider(this.jugador, this.grupoNaves, this.destruirNave, null, this);
        this.physics.add.collider(this.grupoNaves, this.grupoBalas, this.colisionJugadorNave, null, this);
        this.physics.add.collider(this.grupoBalas, this.grupoNaves, this.colisionBalaOvni, null, this);
    
    }
    
    //TIMER
    actualizarTemporizador() {
        this.tiempoRestante--;
        this.textoTemporizador.setText('Tiempo: ' + this.tiempoRestante);
    
        if (this.tiempoRestante <= 0) {
            this.eventoTemporizador.remove(); // Detener el temporizador
            this.generarEnemigos(); // Llamar a la función para generar enemigos
            this.textoTemporizador.destroy();
        }
    }
    
    generarEnemigos() {
        // Mostrar advertencia de que los enemigos están llegando
        this.mensajeAdvertencia = this.add.text(663, 150, '¡Cuidado!', { fontSize: '48px', fill: '#ff0000' }).setOrigin(0.5);
        
        // Hacer que el texto parpadee usando un tween
        this.tweens.add({
            targets: this.mensajeAdvertencia,
            alpha: 0, // Hacer que el texto desaparezca
            ease: 'Linear', // Transición lineal
            duration: 500, // Duración de la transición (0.5 segundos)
            repeat: -1, // Repetir indefinidamente
            yoyo: true // Hacer que el tween vuelva al estado original
        });

        // Eliminar el mensaje después de 3 segundos
        this.time.delayedCall(3000, () => {
            this.mensajeAdvertencia.destroy();
        });
    
        this.time.addEvent({ delay: 1000, callback: this.generarNaves, callbackScope: this, loop: true });
    
    }

    generarNaves() {
        const x = Phaser.Math.Between(0, 1326);
        const naveEnemy = this.grupoNaves.create(x, 0, 'naveEnemiga');
        naveEnemy.play('enemy_atack');
        naveEnemy.setVelocityY(200);
    }
    
    //FIN TIMER

    //Balas del jugador con direccion al puntero
    generarBalas() {
        if (this.time.now > this.bulletTime) {
            // Calcular la rotación del jugador
            const angle = this.jugador.rotation - Math.PI / 2; // Ajusta la rotación
    
            // Longitud de la nave desde el centro hasta la punta (ajusta esto a tu nave)
            const offset = 50; // Ajusta según el tamaño de la nave del jugador
    
            // Calcular las coordenadas de la punta de la nave del jugador
            const puntaX = this.jugador.x + Math.cos(angle) * offset;
            const puntaY = this.jugador.y + Math.sin(angle) * offset;
    
            // Crear la bala en la punta de la nave
            const bullet = this.grupoBalas.create(puntaX, puntaY, 'balaJugador');
    
            // Establecer la velocidad de la bala hacia la dirección en la que apunta el jugador
            const velocidad = 400; // Velocidad de la bala
            bullet.setVelocity(Math.cos(angle) * velocidad, Math.sin(angle) * velocidad);
    
            // Rotar la bala para que apunte en la dirección correcta
            bullet.rotation = angle + Math.PI / 2;
    
            // Controlar el tiempo entre disparos
            this.bulletTime = this.time.now + 200; // Retraso entre disparos
        }
    }
    

    //Balas con direccion del jugador
    dispararBalasEnemigo() {
        // Calcular la dirección hacia el jugador (bala central)
        const directionX = this.jugador.x - this.enemigo.x;
        const directionY = this.jugador.y - this.enemigo.y;
    
        // Calcular el ángulo entre el enemigo y el jugador (bala central)
        const angle = Math.atan2(directionY, directionX);
    
        // Longitud de la nave desde el centro hasta la punta (ajusta esto a tu nave)
        const offset = 50; // Ajusta según el tamaño de la nave
    
        // Calcular las coordenadas de la punta de la nave
        const puntaX = this.enemigo.x + Math.cos(angle) * offset;
        const puntaY = this.enemigo.y + Math.sin(angle) * offset;
    
        // Crear tres balas en la punta de la nave
        const balaCentro = this.grupoBalasEnemigas.create(puntaX, puntaY, 'bullet-enemiga');
        const balaIzquierda = this.grupoBalasEnemigas.create(puntaX, puntaY, 'bullet-enemiga');
        const balaDerecha = this.grupoBalasEnemigas.create(puntaX, puntaY, 'bullet-enemiga');
    
        // Establecer la velocidad de la bala central (disparar hacia el jugador)
        const velocidad = 300; // Velocidad de las balas
        balaCentro.setVelocity(Math.cos(angle) * velocidad, Math.sin(angle) * velocidad);
    
        // Establecer la velocidad de la bala izquierda (ajustar el ángulo)
        const leftAngle = angle - Math.PI / 6; // Disparo ligeramente hacia la izquierda
        balaIzquierda.setVelocity(Math.cos(leftAngle) * velocidad, Math.sin(leftAngle) * velocidad);
    
        // Establecer la velocidad de la bala derecha (ajustar el ángulo)
        const rightAngle = angle + Math.PI / 6; // Disparo ligeramente hacia la derecha
        balaDerecha.setVelocity(Math.cos(rightAngle) * velocidad, Math.sin(rightAngle) * velocidad);
    
        //Rotar las balas hacia la dirección en la que están disparando
        balaCentro.rotation = angle + Math.PI / 2;
        balaIzquierda.rotation = leftAngle + Math.PI / 2;
        balaDerecha.rotation = rightAngle + Math.PI / 2;
    }

    colisionBalasEnemigas(_enemigo,bala) {
        console.log('El ENEMIGO ha sido golpeado'); // Mensaje en la consola
        bala.destroy(); // Destruir la bala
        this.vidasEnemigo--; // Reducir la vida del enemigo
        this.dibujarBarraVida(this.barraVidaEnemigo, 20, 525, this.vidasEnemigo, this.maxVidasEnemigo, 0xbf1f1f); // Actualizar la barra de vida del enemigo
        console.log('Vidas del enemigo:', this.vidasEnemigo); // Mostrar vidas del enemigo
        if (this.vidasEnemigo <= 0) {
            console.log('El ENEMIGO ha sido destruido'); // Mensaje en la consola
            this.scene.start('Victory', {nombreJugador:this.nombreJugador, puntaje:this.puntaje});
            }
    }
    
    colisionBalasJugador(_jugador,balaEnemiga) {
        console.log('El jugador ha sido golpeado'); // Mensaje en la consola
        balaEnemiga.destroy(); // Destruir la bala enemiga
        this.vidasJugador--; // Reducir vida del jugador
        this.dibujarBarraVida(this.barraVidaJugador, 20, 555, this.vidasJugador, this.maxVidasJugador, 0x2d8c24); // Actualizar la barra de vida del jugador
        console.log('Vidas del jugador:', this.vidasJugador); // Mostrar vidas del jugador
        if (this.vidasJugador <= 0) {
            console.log('El jugador ha sido destruido'); // Mensaje en la consola
            this.gameOver(); // Llamar al método gameOver
            }
        
    }

    //COLISION ENEMIGO

    colisionJugadorEnemigo(_jugador, _naveEnemiga) {
        console.log('El jugador ha chocado con el enemigo'); // Mensaje en la consola
    
        // Reducir la vida del jugador
        this.vidasJugador--;
    
        // Actualizar la barra de vida del jugador
        this.dibujarBarraVida(this.barraVidaJugador, 20, 555, this.vidasJugador, this.maxVidasJugador, 0x2d8c24); // Verde
    
        // Actualizar el texto de vida del jugador
        this.textoVidaJugador.setText("Vida Jugador: " + this.vidasJugador);
    
        console.log('Vidas del jugador:', this.vidasJugador); // Mostrar vidas del jugador
        
        _naveEnemiga.destroy(); //destruir la nave cuando el jugador choca

        // Verificar si el jugador ha perdido todas sus vidas
        if (this.vidasJugador <= 0) {
            console.log('El jugador ha sido destruido'); // Mensaje en la consola
            this.gameOver(); // Llamar al método gameOver
        }
    }
    colisionJugadorNave(_naveEnemiga,_balaOvni) {
        console.log('Jugador disparo ovni'); // Mensaje en la consola
        _naveEnemiga.destroy(); //destruir la nave cuando el jugador choca
        _balaOvni.destroy();
    }

    

    update() {
        this.background.tilePositionY -= 2; // Movimiento del fondo
        this.textoVidaJugador.setText("Vida Jugador: " + this.vidasJugador); // Actualiza el texto de vida de Jugador
        this.textoVidaEnemigo.setText("Vida Enemigo: " + this.vidasEnemigo); // Actualiza el texto de vida de Jugador

        this.puntaje += 1; //Aumenta el puntaje
        this.textoPuntaje.setText('Puntaje: ' + this.puntaje); //Actualiza el puntaje

        // Movimiento del jugador
        this.jugador.setVelocityX(0); // Detener horizontalmente
        this.jugador.setVelocityY(0); // Detener verticalmente
        // Para que el enemigo no se mueva al ser golpeado
        this.enemigo.setVelocityX(0); // Detener horizontalmente
        this.enemigo.setVelocityY(0); // Detener verticalmente

        if (this.cursors.left.isDown || this.input.keyboard.checkDown(this.input.keyboard.addKey('a'))) {
            this.jugador.setVelocityX(-300); // Mover a la izquierda
            this.jugador.anims.play('izquierda', true);

        } else if (this.cursors.right.isDown || this.input.keyboard.checkDown(this.input.keyboard.addKey('d'))) {
            this.jugador.setVelocityX(300); // Mover a la derecha
            this.jugador.anims.play('derecha', true);

        } else {
            this.jugador.anims.play('idle', true);
        }

        if (this.cursors.up.isDown || this.input.keyboard.checkDown(this.input.keyboard.addKey('w'))) {
            this.jugador.setVelocityY(-300); // Mover hacia arriba
        } else if (this.cursors.down.isDown || this.input.keyboard.checkDown(this.input.keyboard.addKey('s'))) {
            this.jugador.setVelocityY(300); // Mover hacia abajo
        }

        // Girar el jugador hacia la posición del cursor
        const cursorX = this.input.x;
        const cursorY = this.input.y;

        const directionX = cursorX - this.jugador.x;
        const directionY = cursorY - this.jugador.y;

        // Calcular el ángulo entre el jugador y el cursor
        const angle = Math.atan2(directionY, directionX);
        this.jugador.rotation = angle + Math.PI / 2; // Ajuste si el sprite está rotado

        // Girar el enemigo hacia la posición del jugador
        const directionEnemigoX = this.jugador.x - this.enemigo.x;
        const directionEnemigoY = this.jugador.y - this.enemigo.y;

        // Calcular el ángulo entre el enemigo y el jugador
        const angleEnemigo = Math.atan2(directionEnemigoY, directionEnemigoX);
        this.enemigo.rotation = angleEnemigo + Math.PI / 2;
    }

    generarBotiquin() {
        // Generar coordenadas aleatorias para el botiquín
        const x = Phaser.Math.Between(50, 1276); // Dentro del rango del mundo del juego
        const y = Phaser.Math.Between(50, 500);
        
        // Crear el botiquín en esas coordenadas
        const botiquin = this.grupoBotiquines.create(x, y, 'botiquin');
        
        // Establecer propiedades físicas (opcional)
        botiquin.setCollideWorldBounds(true);
        botiquin.setBounce(0.5); // Opcional, si quieres que rebote
    }

    recogerBotiquin(_jugador, botiquin) {
        // Aumentar la vida del jugador, pero no exceder el máximo de vida
        this.vidasJugador = Math.min(this.vidasJugador + this.maxVidaBotiquin, this.maxVidasJugador);
        
        // Actualizar la barra de vida del jugador
        this.dibujarBarraVida(this.barraVidaJugador, 20, 555, this.vidasJugador, this.maxVidasJugador, 0x2d8c24);
        
        // Destruir el botiquín
        botiquin.destroy();
    }

    // Función para dibujar la barra de vida
    dibujarBarraVida(barra, x, y, vidaActual, vidaMaxima, color) {
        // Limpiar gráfico anterior
        barra.clear();

        // Fondo de la barra
        barra.fillStyle(0x000000, 0.5); // Negro para el fondo con transparencia
        barra.fillRect(x, y, this.barraAncho, 20); // Fondo de la barra de vida (ancho: this.barraAncho)

        // Parte de la vida restante, solo si la vida es mayor que 0
        if (vidaActual > 0) {
            barra.fillStyle(color); // Color para la vida
            let porcentajeVida = vidaActual / vidaMaxima;
            barra.fillRect(x, y, this.barraAncho * porcentajeVida, 20); // Ajustar el ancho según la vida restante
        }

        // Dibuja el contorno de la barra
        barra.lineStyle(2, 0xffffff, 1); // Contorno blanco, grosor de 2 píxeles
        barra.strokeRect(x, y, this.barraAncho, 20); // Dibuja el contorno alrededor de la barra
    }

    gameOver(_jugador) {
        this.physics.pause(); //Pausar el juego
        console.log('GameOver');
        if (this.puntaje > this.puntajeMaximo) {
            this.puntajeMaximo = this.puntaje;
        }
        this.scene.start('GameOver', { puntaje: this.puntaje, puntajeMaximo: this.puntajeMaximo, nombreJugador : this.nombreJugador});
         //Escena GameOver y mostrar puntaje
         //Escena GameOver y mostrar puntaje
    }
}

export default Jefe;
