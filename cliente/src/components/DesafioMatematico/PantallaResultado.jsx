import { Button, Card, ProgressBar } from 'react-bootstrap';
import './styles/Pantallaresultado.css';

// Muestra el resultado de un desafio (correcto o incorrecto)
const PantallaResultado = ({ isCorrect, nextRound, correctAnswer, incorrectAnswer, progress }) => {

  const resultClass = isCorrect ? 'resultado-correcto' : 'resultado-incorrecto';
  
  return (
    <div className={`resultado ${resultClass}`}>
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Card className="text-center" style={{ width: '20rem' }}>
          <Card.Body>
            <Card.Title className="titleDM">{isCorrect ? "¡Correcto!" : "¡Incorrecto!"}</Card.Title>
            {/* Barra de progreso */}
            <div className="progress-container">
              <p>Ronda {correctAnswer + incorrectAnswer} de 10</p>
              <ProgressBar
                striped animated
                variant={isCorrect ? 'success' : 'danger'}
                now={progress} />
            </div>
            <Button variant="success" onClick={nextRound}>Siguiente desafío</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};
export default PantallaResultado;
