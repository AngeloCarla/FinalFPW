import React, { useState, useEffect, useRef } from "react";
import Phaser from 'phaser';
import Escena1 from "./Scenes/Escena1.js";
import GameOver from "./Scenes/GameOver.js";
import Escena2 from "./Scenes/Escena2.js";
import Escena3 from "./Scenes/Escena3.js";
import Inicio from "./Scenes/Inicio.js";
import Escena4 from "./Scenes/Escena4.js";
import Bonustrack from "./Scenes/Bonustrack.js";
import Victory from "./Scenes/Victory.js";
import Top from "./Scenes/Top.js";
import Jefe from "./Scenes/Jefe.js";
import './styles/JuegoPhaser.css';


// Componente del formulario de entrada
function NombreJugadorForm({ nombreJugador, setNombreJugador, handleStartGame }) {
    return (
        <>
        <div id="nombreForm">
            <input
                type="text"
                id="nombreJugador"
                placeholder="Nombre"
                value={nombreJugador}
                onChange={(e) => setNombreJugador(e.target.value)}
            />
            <button id="botonStart" onClick={handleStartGame}>JUGAR</button>
        </div>
            
        </>
    );
}

function JuegoPhaser() {
    const [nombreJugador, setNombreJugador] = useState("");
    const [iniciarJuego, setIniciarJuego] = useState(false);
    const contenedor = useRef(null);
    const [escenaInicioActiva, setEscenaInicioActiva] = useState(false); // Nuevo estado para verificar si "Inicio" está activo

    const handleStartGame = () => {
        if (nombreJugador.trim() !== "") {
            setIniciarJuego(true); 
        } else {
            alert("Por favor, ingrese un nombre");
        }
    };

    // Efecto para iniciar el juego de Phaser una vez que el estado "iniciarJuego" sea verdadero
    useEffect(() => {
        if (iniciarJuego){
            const Escenas = [Inicio, Escena1, GameOver, Escena2, Escena3, Escena4, Bonustrack, Victory, Top, Jefe];
            const crearEscena = Scene => {
                if (Scene === Inicio) {
                    setEscenaInicioActiva(true);  // Establece que la escena de "Inicio" está activa
                }
                return new Scene({ nombreJugador });
            };
            let config = {
                type: Phaser.AUTO,
                width: 1326,
                height: 595,
                parent: contenedor.current,
                physics: {
                    default: "arcade",
                    arcade: {
                        gravity: { y: 0 },
                        debug: false
                    }
                },
                scene: Escenas.map(crearEscena)
            };

            const game = new Phaser.Game(config);

            // Registrar el nombre del jugador en el sistema de Phaser
            game.registry.set('nombreJugador', nombreJugador); 

            return () => {
                game.destroy(true); // Destruye el juego al desmontar el componente
            };
        }
    }, [iniciarJuego, nombreJugador]); // Solo ejecuta el efecto si cambia "iniciarJuego" o "nombreJugador"

    return (
        <div className="fondo-animado">
            {!iniciarJuego && (
                <NombreJugadorForm
                    nombreJugador={nombreJugador}
                    setNombreJugador={setNombreJugador}
                    handleStartGame={handleStartGame}
                />
            )}
            {!iniciarJuego && (
                <div>
                    <p className="texto-parpadeante">JUEGO PHASER</p>
                    <p className="texto-nombre">¡Hola {nombreJugador}!</p>
                </div>
            )}
            
            {iniciarJuego && (
                <div>
                    <div ref={contenedor}></div>
                </div>
            )}
        </div>
    );
}

export default JuegoPhaser;