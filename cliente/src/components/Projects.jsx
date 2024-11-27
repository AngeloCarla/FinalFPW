import { Card, Button } from 'react-bootstrap';
import '../styles/Project.css';

function Projects({ proyectos }) {

    return (
        <>
            <section className="repositorios">
                <section className="project">
                    {proyectos.map((r, idx) => (
                        <Card className="r" key={idx}>
                            <Card.Body>
                                <Card.Title>{r.name}</Card.Title>
                                <Card.Text>{r.title}</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Button variant='outline-dark' onClick={() => window.open(r.url, '_blank')}>Ir a {r.name}</Button>
                            </Card.Footer>
                        </Card>
                    ))}
                </section>
            </section>
        </>
    );
}

export default Projects;