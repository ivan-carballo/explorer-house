import { useState, useEffect } from "react";
import { getPropiedad } from "../api.js"

import { Navbar } from "../componentes/navbar.jsx";

import "../scss/index.scss"




function Index() {
    const [listado, setListado] = useState('')


    useEffect(() => {
        Propiedades()
        async function Propiedades() {
            const getAll = await getPropiedad()
            let getArray = await getAll.data
            getArray.sort()


            const propiedadesDiv = await getArray.map((data) => 
                <div id='div-pisos' key={data._id}>
                    <p key={data._id}>Tipo: {data.tipo}</p>
                    <p key={data._id}>ciudad: {data.ciudad}</p>
                    <p key={data._id}>descripcion: {data.descripcion}</p>
                    <p key={data._id}>habitaciones: {data.habitacion}</p>
                    <p key={data._id}>Metros: {data.metros}</p>
                    <p key={data._id}>Altura: {data.altura}</p>
                    <p key={data._id}>Precio: {data.precio}</p>
                </div>
            )
            setListado(propiedadesDiv)
        }
    }, []); 




    return (
        <>
            <Navbar />
            <div id='div-body'>
                {listado}
            </div>
        </>
    )
}




export {
    Index
}