import './styles/imc.css';

const Sugerencia=({nivelPeso})=>{
    
    let mensaje;

    if (nivelPeso==="Bajo peso"){
        mensaje="Se recomienda comer alimentos ricos en nutrientes y proteínas como frutas, verduras, legumbres, frutos secos y productos lácteos, para alcanzar un peso saludable. \nTambién debes realizar ejercicio, especialmente el fortalecimiento muscular, y tener una buena hidratacion. \nLo mejor que puedes hacer es consultar con un nutricionista para ayudarte a ganar peso de forma saludable y crear un plan según tus necesidades.";
    }else if (nivelPeso==="Saludable"){
        mensaje="Se recomienda mantener su estilo de vida saludable con una dieta equilibrada. \nAdemás, es esencial realizar actividad física de forma regular, como caminar, nadar o practicar ciclismo. Recordar que debe hidratarse bien.";
    }else if (nivelPeso==="Sobrepeso"){
        mensaje="Reduce el consumo de calorías y elige comidas altas en nutrientes como frutas y verduras. \nTambién debes reducir el consumo de alimentos procesados y el azúcar.  \nSe recomienda aumentar la actividad física y una buena hidratación. \nPara más información podría consultar con un profesional de la salud para diseñar un plan de pérdida de peso adecuado.";
    }else if (nivelPeso==="Obesidad"){
        mensaje="Consultar a un médico o nutricionista para diseñar un plan personalizado de pérdida de peso adecuado. Generalmente, se recomienda comer alimentos saludables, una buena hidratación, evitar el consumo de alimentos ultraprocesados, así como disminuir las cantidades de sal y azúcar, y realizar actividades físicas intensas moderadas, en algunos casos, los médicos pueden recomendar intervenciones médicas o quirúrgicas.";
    }
    return(
        <>  
            <h2 className='h2'>Sugerencia: </h2>
            <p className='resultado'>{mensaje}</p>
        </>
    );
}

export default Sugerencia; 