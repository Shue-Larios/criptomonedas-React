import styled from "@emotion/styled" // para definir un style component

const Contenedor = styled.div`
/* es obligatorio terminar la linea con; */
color: #FFF;
font-family: 'Lato', sans-serif;
display: flex;
align-items: center;
gap: 1rem;
margin-top: 30px;
`
const Imagen = styled.img`
/* es obligatorio terminar la linea con; */
display: block; // para que la imagen no se estire
width: 120px;
`


const Precio = styled.p`
/* es obligatorio terminar la linea con; */
font-size: 24px;
span {
    font-weight: 700 ;
}
`

const Texto = styled.p`
font-size: 18px;
span {
    font-weight: 700 ;
}
`

export const Resultado = ({ resultado }) => {

    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = resultado

    return (
        <Contenedor>
            <Imagen src={`https://cryptocompare.com/${IMAGEURL}`} alt="imagen Cripto" />
            <div>
                <Precio>El precio es de: <span>{PRICE}</span>   </Precio>
                <Texto>Precio mas alto del dia: <span>{HIGHDAY}</span>   </Texto>
                <Texto>Precio mas bajo del dia: <span>{LOWDAY}</span>   </Texto>
                <Texto>Variacion ultimas 24 horas: <span>{CHANGEPCT24HOUR}</span>   </Texto>
                <Texto>ultima actualizacion: <span>{PRICE}</span>   </Texto>

            </div>


        </Contenedor>
    )
}
