
import {Button} from 'react-bootstrap'
import './styles/cuadrado.css'

function Cuadrado({valor, cambiarValorCuadrado}){
    return (
        <button className="cuadrado" onClick={cambiarValorCuadrado}>{valor}</button>

    )
}

export default Cuadrado;