//import Inicio from '../JuegoPhaser/Scenes/Inicio';
import Inicio from './Inicio';
import Tablero from './Tablero'
import { useState} from 'react'


function Juego(){

    const [juegoComenzado, setJuegoComenzado] = useState(false);

    const comenzarJuego = () => {
        setJuegoComenzado(true);
    };

    const volverAlInicio = () => {
        setJuegoComenzado(false);
    };

    return(
        <div>
            {juegoComenzado ? (
            <Tablero volverAlInicio={volverAlInicio} />
            ) : (
            <Inicio comenzarJuego={comenzarJuego} />
            )}
        </div>
    );

} export default Juego;
