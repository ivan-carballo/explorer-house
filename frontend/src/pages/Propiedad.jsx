import { useState, useEffect } from "react";
import React from "react";
import { sha256 } from 'js-sha256'
import Cookies from 'js-cookie'
import { Navbar } from "../componentes/navbar.jsx";
import { getPropiedad } from "../api/apiPropiedad";

import "../scss/propiedad.scss"



function Propiedad() {
    const [listado, setListado] = useState('')



    useEffect(() => {
            Propiedades()
            async function Propiedades() {
                setListado('')
                const getAll = await getPropiedad()
                let getArray = await getAll.data
                getArray.reverse()

                const username = Cookies.get('username')
                const arrayFiltrado = getArray.filter((dato) => sha256(dato.vendor) == username)

                const propiedadesDiv = await arrayFiltrado.map((data) =>
                    <div id='div-propiedades-cuadro' key={data._id}>
                        <h1>{data.tipo} en {data.ciudad}</h1>
                        <p id='descripcion-propiedades'>{data.descripcion}</p>
                        <img id='img-propiedades' src={data.imagen != null ? data.imagen: '../../public/noPhoto.avif'} />
                        <ul>
                            <li>Habitaciones: {data.habitaciones}</li>
                            <li>Metros: {data.metros}</li>
                            <li>Altura: {data.altura}</li>
                            <li>Precio: {data.precio} €</li>
                            <li>Vendedor: {data.vendor}</li>
                        </ul>
                    </div>
                )
                setListado(propiedadesDiv)
            }
    }, []); 




    return (
        <>
            <Navbar />
            <div id='propiedad-cuerpo'>
                <h1 id='rotulo-h1'>Tus propiedades</h1>
                <div id='div-propiedades'>
                    {listado}
                </div>
            </div>
        </>
    )
}



export {
    Propiedad
}