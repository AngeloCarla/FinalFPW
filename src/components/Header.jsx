// Importamos los componentes para crear la barra de navegación
import { Navbar, Nav, NavDropdown, Dropdown, Container } from 'react-bootstrap';

/*Se importa el archivo de estilos CSS para el componente Header*/
import '../styles/Header.css';

function Header() {
    return (
        <>
            {/* Header */}
            {/* Contenedor principal de la barra de navegación */}
            <header className='header'>
                {/* Barra de navegación con fondo negro, utilizando react-bootstrap */}
                <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                    {/*Contenedor para centrar y alinear los elementos dentro de la barra */}
                    <Container>
                        {/* Logo de la página que redirige al inicio */}
                        <Navbar.Brand className="logo" href="/">
                            <img src="/images/logo2.png" alt="Logo" width="45" height="45" />
                            {' '} <span>GRUPO 1</span> {/* Nombre del grupo */}
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse id="navbar-nav">
                            {/* Contenedor de los enlaces de navegación */}
                            <Nav className="me-auto">
                                {/* Enlace de la página principal (Home) */}
                                <Nav.Link className="nav-link" href="/">Home</Nav.Link>
                                {/* Enlace para la página de About Us */}
                                <Nav.Link className="nav-link" href="/aboutUs">About Us</Nav.Link>
                                {/* Menú desplegable para los proyectos */}
                                <NavDropdown id="basic-nav-dropdown" title="Proyectos">
                                    {/* Título del menú desplegable */}
                                    <Dropdown.Header>Nuestros Proyectos</Dropdown.Header>
                                    {/* Enlace a la pagina de IMC */}
                                    <NavDropdown.Item href="/imc">Indice de Masa Corporal</NavDropdown.Item>
                                    {/* Enlace a la pagina de Billeteras Virtuales */}
                                    <NavDropdown.Item href="/billeterasVirtuales">Gestor de Transacciones de Billeteras Virtuales</NavDropdown.Item>
                                    {/* Enlace al juego Phaser*/}
                                    <NavDropdown.Item href="/juegoPhaser">Juego Phaser</NavDropdown.Item>
                                    {/* Enlace al desafio matematico */}
                                    <NavDropdown.Item href="/desafioMatematico">Desafio Matematico</NavDropdown.Item>
                                </NavDropdown>
                                {/* Menú desplegable para los extras */}
                                <NavDropdown id="basic-nav-dropdown" title="Mas">
                                    {/* Título para la sección de Extras */}
                                    <Dropdown.Header>Extras</Dropdown.Header>
                                    {/* Enlace al juego Tateti */}
                                    <NavDropdown.Item href="/juegoTateti">Juego Tateti</NavDropdown.Item>
                                    {/* Enlace a la pagina Projects */}
                                    <NavDropdown.Item href="/projects">Repositorios</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            {/* End of Header */}
        </>
    )
}

/* Exportamos el componente Header para que pueda ser utilizado en otras partes del proyecto */
export default Header