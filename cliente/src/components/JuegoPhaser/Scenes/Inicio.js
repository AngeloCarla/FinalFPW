import Phaser  from "phaser";

class Inicio extends Phaser.Scene {
    constructor() {
        super("Inicio");
    }

    preload() {
        this.load.image('background', '/public/images/background2.jpg');
        this.load.image('Tuto', '/public/images/controles.png');
        this.load.image('Mouse', '/public/images/click.png');
    }

    create() {
        this.background = this.add.tileSprite(663, 298, 1326, 596, 'background');
        this.pressStart = this.add.image(663, 500, 'Mouse').setOrigin(0.5);
        this.Tuto = this.add.image(1326, 596, 'Tuto').setOrigin(1);

        this.pressStart.setScale(0.5); //Escala de la imagen

        //Configura el parpadeo de la imagen
        this.time.addEvent({
            delay: 600, //Tiempo en milisegundos
            callback: this.blink,
            callbackScope: this,
            loop: true //Hacer que parpadee en bucle
        });
        
        // Agregar un evento de clic para iniciar la escena
        this.input.once('pointerdown', () => {
                this.scene.start('Escena1'); // Inicia la Escena1 al hacer clic

        });
    }
    update(){
    
    }

    blink() {
        //Alterna la visibilidad de la imagen
        this.pressStart.visible = !this.pressStart.visible;
    }
}

export default Inicio; 