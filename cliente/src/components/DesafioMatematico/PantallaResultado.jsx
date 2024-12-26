import { Button, Card, ProgressBar } from 'react-bootstrap';
import './styles/Pantallaresultado.css';

// Muestra el resultado de un desafio (correcto o incorrecto)
const PantallaResultado = ({ isCorrect, nextRound, correctAnswer, incorrectAnswer, progress }) => {
  return (
    <div className="resultado">
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Card className="text-center" style={{ width: '20rem' }}>
          <Card.Body>
            <Card.Title className="titleDM">{isCorrect ? "¡Correcto!" : "¡Incorrecto!"}</Card.Title>
            {/* Barra de progreso */}
            <div className="progress-container">
              <p>Ronda {correctAnswer + incorrectAnswer} de 10</p>
              <ProgressBar>
                <ProgressBar
                  striped animated
                  variant={isCorrect ? 'success' : 'danger'}
                  now={progress} />
              </ProgressBar>
            </div>
            <Button variant="success" onClick={nextRound}> Siguiente desafío</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};
export default PantallaResultado;
