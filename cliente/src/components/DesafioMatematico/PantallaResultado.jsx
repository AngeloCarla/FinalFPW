import { Button, Card, ProgressBar } from 'react-bootstrap';
import './styles/Pantallaresultado.css';

// Muestra el resultado de un desafio (correcto o incorrecto)
const PantallaResultado = ({ isCorrect, nextRound, correctAnswer, incorrectAnswer, progress }) => {
  return (
    <div className="resultado">
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Card className="text-center" style={{ width: '20rem' }}>
          <Card.Body>
            {/* Barra de progreso */}
            <div className="progress-container">
              <p>Progreso: Ronda {correctAnswer + incorrectAnswer} de 5</p>
              <ProgressBar striped animated variant="success" now={progress}/>
            </div>

            <Card.Title className="title">{isCorrect ? "¡Correcto!" : "¡Incorrecto!"}</Card.Title>
            <br />
            <Button variant="success" onClick={nextRound}> Siguiente desafío</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};
export default PantallaResultado;
