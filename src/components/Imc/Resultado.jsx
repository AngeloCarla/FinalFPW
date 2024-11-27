const Resultado=({nombre, apellido, imc, nivelPeso})=>{

    return (
        <>
        <h2 className='h2'>Resultado:</h2>
            <div className='resultado'>
                <p>Nombre del paciente: {nombre} {apellido}</p>
                <p>Tu IMC es: {imc}</p>
                <p>Tu nivel de peso es: {nivelPeso}</p>
            </div>
        </>
    );
};
export default Resultado;
