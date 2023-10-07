import styled from "@emotion/styled" // para definir un style component
import { useSelectMonedas } from "../hooks/useSelectMonedas"
import { monedas } from "../data/Monedas"
import { useEffect, useState } from "react"
import { Error } from "./Error"


const InputSubmit = styled.input`
background-color: #9497FF;
border: none;
width: 100%;
padding: 10px;
color: #FFF;
font-weight: 700;
text-transform: uppercase;
font-size: 20px;
border-radius: 5px;
transition: background-color .3s ease;
margin-top: 30px;
&:hover{
    background-color: #7a7DFE;
    cursor: pointer;
}
`


export const Formulario = ({ setMonedas }) => {


    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)


    // lo del parentecis siempre es su valor inicial     y como que estuviera mandando props a ese hook
    // moneda es un state de ese componente no xk alla lo llame state no le pueda poner otro nombre donde la extraigo sino que se extrae por su indice
    const [moneda, SelectMonedas] = useSelectMonedas('Eligue tu Moneda', monedas);

    const [criptomoneda, SelectCriptomoneda] = useSelectMonedas('Eligue tu Criptomoneda', criptos);


    // useEffect es un buen lugar para llamar una api ejemplo con fetchAPI
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api-v2.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            // await para bloquear y esperar la respuesta de la api
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()


            // map nos contruye un nuevo arreglo
            const arrayCriptos = resultado.Data.map(cripto => {
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName,
                }
                // para retornar cuando no es implicito el retunr
                return objeto
            })

            setCriptos(arrayCriptos)
        }
        // llamamos la funcion
        consultarAPI()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if ([moneda, criptomoneda].includes('')) {
            setError(true)
            return
        }

        // la parte si los campos no estan vacios
        setError(false)
        setMonedas({ moneda, criptomoneda })
    }




    // SelectMonedas() // asi se llama si la funcion del hook creado no retorna cosas html

    return (

        <>
            {/* si mando el msj asi se manda como children, asi se leen en ese componente */}
            {error && <Error> Todos los campos son obligatorios </Error>}


            <form onSubmit={handleSubmit}>

                {/* si el hook creado retorna html/css se llama asi */}
                <SelectMonedas />
                <SelectCriptomoneda />

                <InputSubmit
                    type="submit"
                    value="cotizar"
                />

            </form>
        </>
    )
}
