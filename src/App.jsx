import styled from "@emotion/styled" // para definir un style component
import ImagenCripto from '../src/img/imagen-criptos.png'
import { Formulario } from "./components/Formulario"
import { useEffect, useState } from "react"
import { Resultado } from "./components/Resultado"
import { Spinner } from "./components/Spinner"


// en este lado se ponen los style component tiene q ser primera Mayusucla
// h1 se refiere en lo que se va a convertir este HEading
const Contenedor = styled.div`
/* es obligatorio terminar la linea con; */
max-width: 900px;
margin: 0 auto;
width: 90%;
/* asi se hace un media query en styled component */
@media (min-width: 992px){
  display: grid;

  grid-template-columns: repeat(2, 1fr);
  column-gap: 2rem
}
`

const Imagen = styled.img`
max-width: 400px;
width: 80%;
margin: 100px auto 0 auto;
display: block;
`


const Heading = styled.h1`
font-family: 'Lato', sans-serif;
color: #FFF;
text-align: center;
font-weight: 700;
margin-top: 80px;
margin-bottom: 50px;
font-size: 34px;

/* seudo elemento */
/* para hacer la linea de abajo por subrayado */
&::after {
  content: '';
  width: 120px;
  height: 6px;
  background-color: #66a2fe;
  display: block;
  /* cuando se escribe asi el codigo del margin el orden es arriba/derecha/abajo/izquierda */
  margin: 10px auto 0 auto;
}
`


function App() {

  const [monedas, setMonedas] = useState({})
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)


  useEffect(() => {
    // para prevenir que se ejecute cuando inice la app dice que si es mayor a cero el objeto
    if (Object.keys(monedas).length > 0) {
      const cotizarCripto = async () => {
        setResultado({}) // para que limpie la pantalla si habia una peticion antes
        setCargando(true) //para poder mostrar el spinner de cargando
        // extraemos del state los valores
        const { moneda, criptomoneda } = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

        const respuesta = await fetch(url)
        const resultado = await respuesta.json() // para crear la respuesta en un json
        // con esta forma DISPLAY[criptomoneda][moneda] le estamos diciendo que busque una propiedad en ese objeto que tenga esos nombres
        setResultado(resultado.DISPLAY[criptomoneda][moneda]);
        setCargando(false)
      }
      cotizarCripto()
    }

  }, [monedas])


  return (
    <Contenedor>
      <Imagen
        src={ImagenCripto}
        alt="imagenes criptomonedas"
      />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario
          setMonedas={setMonedas}
        />


        {cargando && <Spinner />  }
        {/* revisa si en el state de resultado existe precio y muestra el componente */}
        {resultado.PRICE && <Resultado resultado={resultado} />}
      </div>
    </Contenedor>
  )
}

export default App
