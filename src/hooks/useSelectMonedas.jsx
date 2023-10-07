import styled from "@emotion/styled" // para definir un style component
import { useState } from "react"


const Label = styled.label`
 color: #FFF;
 display: block;
 font-family: 'Lato', sans-serif;
 font-size: 24px;
 font-weight: 700;
margin: 15px 0;
`

const Select = styled.select`
width: 100%;
font-size: 18px;
padding: 14px;
border-radius: 10px;
text-align: center;
`


// y aca se leen como props pero sin {}
export const useSelectMonedas = (label, opciones) => {

    const [state, setState] = useState('')

    // cuando cambio el { } por () es dando a entender el return implicito
    const SelectMonedas = () => (
        <>
            <Label >{label}</Label>
            <Select name="" id=""
                value={state}
                onChange={(e) => setState(e.target.value)}
            >
                <option value="">  -- Seleccione --  </option>

                {/* para iterar sobre las opciones que mando */}
                {opciones.map(opcion => (
                    <option
                        value={opcion.id}
                        key={opcion.id}
                    >
                        {opcion.nombre}
                    </option>
                ))}
            </Select>
        </>
    )

    return [
        // no xk aca la nombre asi significa que donde la extraiga ve debe llamar asi sino que la extrae por su indice
        state,
        SelectMonedas
    ]
}
