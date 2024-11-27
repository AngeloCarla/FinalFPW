import { Row } from "react-bootstrap";
import { useState } from "react";
import {Button} from "react-bootstrap";
import Cuadrado from "./Cuadrado";
import './styles/tablero.css';

function Tablero({volverAlInicio}) {
        const [valores, setValores] = useState(Array(9).fill("_"));
        const [turnoX, setTurnoX] = useState(true);
        const ganador = calcularGanador(valores);

        const tableroLleno = valores.every(valor => valor !== "_");

        let estado;
        if (ganador){
            estado = 'Ganó el jugador: ' + ganador;
        } else if (tableroLleno){
            estado="Empate";
        } else{
                estado = 'Siguiente jugador: ' + (turnoX ? 'X' : 'O');
        }
        const cambiarValorCuadrados = (i) => {
            if (valores[i] !== "_" || ganador) {
                return;
            }

        const nuevosValores = valores.slice();
        nuevosValores[i] = turnoX ? "X" : "O";
        setValores(nuevosValores);
        setTurnoX(!turnoX);
        }
        //Esta funcion recorre cada linea posible del tablero para determinar si existe un ganador
        function calcularGanador (valores){
            const lineas = [
                [0,1,2],
                [3,4,5],
                [6,7,8],
                [0,3,6],
                [1,4,7],
                [2,5,8],
                [0,4,8],
                [2,4,6]
            ];
            for (let i = 0; i < lineas.length; i++){
                const [a,b,c] = lineas [i];
                if (valores[a] !== "_"  && valores[a] === valores [b] && valores[a] === valores[c]){
                    return valores[a];
                }
            }
            return null;
        }

        // Función para reiniciar el juego
        const reiniciarJuego = () => {
            setValores(Array(9).fill("_"));
            setTurnoX(true);
        };

        
        //Esta porcion del codigo dibuja el tablero
        return (
            
            <>
            
                <div className="tablero">
                    <div className="tarjetaTitulo"> 
                        <h1 className="estadoJugador">  {estado}  </h1>
                    </div>    
                    <Row xs="auto">
                        <Cuadrado valor={valores[0]} cambiarValorCuadrado={() => cambiarValorCuadrados(0)} />
                        <Cuadrado valor={valores[1]} cambiarValorCuadrado={() => cambiarValorCuadrados(1)} />
                        <Cuadrado valor={valores[2]} cambiarValorCuadrado={() => cambiarValorCuadrados(2)} />
                    </Row>
                    <Row xs="auto">
                        <Cuadrado valor={valores[3]} cambiarValorCuadrado={() => cambiarValorCuadrados(3)} />
                        <Cuadrado valor={valores[4]} cambiarValorCuadrado={() => cambiarValorCuadrados(4)} />
                        <Cuadrado valor={valores[5]} cambiarValorCuadrado={() => cambiarValorCuadrados(5)} />
                    </Row>
                    <Row xs="auto">
                        <Cuadrado valor={valores[6]} cambiarValorCuadrado={() => cambiarValorCuadrados(6)} />
                        <Cuadrado valor={valores[7]} cambiarValorCuadrado={() => cambiarValorCuadrados(7)} />
                        <Cuadrado valor={valores[8]} cambiarValorCuadrado={() => cambiarValorCuadrados(8)} />
                    </Row>
                    <div className="botones-control">
                        <Button variant="info" onClick={reiniciarJuego}>Volver a Jugar</Button>
                        <Button variant="light" onClick={volverAlInicio}>Volver al Menu</Button>
                    </div>
                </div>
            </>
        );
        }
            
export default Tablero;


