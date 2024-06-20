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
                    <div id='div-mensajes'>
                        
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
                <h1>Aqui van los mensajes</h1>
            </div>
        </>
    )
}



export {
    Mensajes
}