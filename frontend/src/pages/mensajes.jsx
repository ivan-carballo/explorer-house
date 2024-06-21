import { useState, useEffect } from "react";
import { mensajeCreate, getmensaje } from "../api/apiMensaje.js"

import { Navbar } from "../componentes/navbar.jsx";
import Cookies from 'js-cookie';
import { sha256 } from 'js-sha256';
import { FormatearFecha } from "../funciones/fecha.js"

import "../scss/mensaje.scss"


function Mensajes() {
    const [recarga, setRecarga] = useState('true')
    const [listaMensajes, setListaMensajes] = useState('')


    useEffect(() => {
        buscarMensajes()
        async function buscarMensajes() {
            if (recarga) {
                let getMensajes = await getmensaje()
                getMensajes = getMensajes.data 
                getMensajes.reverse()

                let mensajesFiltrados = getMensajes.filter((data) => sha256(data.vendor) == Cookies.get('username'))
                
                const mensajesDiv = await mensajesFiltrados.map((data) => 
                    <div id='div-mensaje-cuadro'>
                        <ul>
                            <li>Fecha: {data.date}</li>
                            <li>Usuario: {data.username}</li>
                            <li>Estado: {data.estado}</li>
                            <li>Propiedad: {data.propiedad}</li>
                            <li>Mensaje: {data.mensaje}</li>
                        </ul>
                        <div id='div-mensaje-cuadro-buttons'>
                            <input type="button" value="Visto" />
                            <input type="button" value="Contestar" />
                        </div>
                    </div>
                
                )

                setListaMensajes(mensajesDiv)
                setRecarga('false')
            }
        }
    }, [recarga]); 



    return (
        <>
            <Navbar />
            <div id='mensajes-cuerpo'>
                <h1>Mensajes recibidos</h1>
                <div id='div-mensajes'>
                    {listaMensajes}
                </div>
            </div>
        </>
    )
}



export {
    Mensajes
}