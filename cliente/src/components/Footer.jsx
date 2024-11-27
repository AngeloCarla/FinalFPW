/* Importamos el archivo css para darle estilo al componente Footer */
import '../styles/Footer.css'

/* Componente para el footer de nuestro proyecto */
function Footer(){

	/* Retornamos lo que es la parte visual del componente Footer */
    return(
        <>
            {/* Footer */}
			{/* El footer tiene fondo de color negro, el texto es de color blanco y se queda fijo en la parte inferior de la pantalla */}
			<footer className="sticky-footer bg-dark text-white">
				{/* Tiene centrado vertical automatico */}
				<div className="container my-auto">
					{/* Centra el texto dentro del contenedor */}
					<div className="copyright text-center my-auto">
						{/* Contenedor para el texto y el link */}
						<span className='footer'>Copyright &copy; Grupo 1 {'- '}
						<a href="https://github.com/tammarabm/proyectofinal_grupo_1.git" className="linkk">proyectofinal_grupo_1</a>
						</span>
					</div>
				</div>
			</footer>
			{/* End of Footer */}
        </>
    )
}

/* Exportamos el componente Footer para que pueda ser utilizado en otras partes del proyecto */
export default Footer;