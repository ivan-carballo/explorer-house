import { useState, useEffect } from "react";
import { mensajeCreate, getmensaje, mensajeUpdate } from "../api/apiMensaje.js"
import { Modal } from "../modal.jsx";

import { Navbar } from "../componentes/navbar.jsx";
import Cookies from 'js-cookie';
import { sha256 } from 'js-sha256';
import { FormatearFecha } from "../funciones/fecha.js"

import "../scss/mensaje.scss"


function Mensajes() {
    const [recarga, setRecarga] = useState(true)
    const [listaMensajes, setListaMensajes] = useState('')
    const [data, setData] = useState('')
    const [mensajeEnviado, setMensajeEnviado] = useState('')
    const [mensajeRechazado, setMensajeRechazado] = useState('')


    useEffect(() => {
        buscarMensajes()
        async function buscarMensajes() {
            if (recarga) {
                let getMensajes = await getmensaje()
                getMensajes = getMensajes.data 
                getMensajes.reverse()

                let mensajesFiltrados = getMensajes.filter((data) => sha256(data.vendor) == Cookies.get('username'))
                
                const mensajesDiv = await mensajesFiltrados.map((data) => 
                    <div key={data._id} id='div-mensaje-cuadro'>
                        <ul>
                            <li>Fecha: {data.date}</li>
                            <li>Usuario: {data.username}</li>
                            <li>Estado: {data.estado}</li>
                            <li>Propiedad: {data.propiedad}</li>
                            <li>Mensaje: {data.mensaje}</li>
                        </ul>
                        <div id='div-mensaje-cuadro-buttons'>
                            <input id={data._id} estado={data.estado} type="button" value="Visto" onClick={mensajeVisto}/>
                            <input id={data._id} type="button" value="Contestar" onClick={async ()=>{setData(data)}}/>
                        </div>
                    </div>
                
                )

                setListaMensajes(mensajesDiv)
                setRecarga(false)
            }
        }
    }, [recarga]); 




    async function mensajeVisto(e) {
        const buttonID = e.target.id
        const buttonEstado = e.target.attributes.estado.value

        const mensajeArrayUpdate = {'estado': 'Visto'}

        const data = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(mensajeArrayUpdate),
            };

            if (buttonEstado === 'Pendiente') {
                const mensajeEstadoCambiar = await mensajeUpdate(buttonID, data)
                setRecarga(true)
            }
    }





    async function enviar(e) {
        setMensajeRechazado('')
        let userList = await userLogin()
        userList = await userList.data

        let userFiltrar = await userList.filter((dato) => sha256(dato.username) == user)
        userFiltrar = await userFiltrar[0].username

        const userMensaje = userFiltrar
        const textoMensaje = e.target.offsetParent.children[0].childNodes[3].lastChild.value
        const propiedadMensaje = e.target.id
        const dateMensaje = Date.now()
        const vendorMensaje = e.target.attributes[2].value

        
        const mensajeArrayNew = {'username': userMensaje, 
                                    'vendor': vendorMensaje, 
                                    'propiedad': propiedadMensaje, 
                                    'mensaje': textoMensaje, 
                                    'date': dateMensaje,
                                    'estado': 'Pendiente' }

        const data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mensajeArrayNew),
        };


        if (textoMensaje !== undefined && textoMensaje.length > 5) {
            const mensajeCrear = await mensajeCreate(data)
            setMensajeEnviado('Su mensaje se ha enviado de forma correcta')

            setTimeout(() => {
                setData(null)
                setMensajeEnviado('')
            }, 5000);
            
        } else {
            setMensajeRechazado('Su mensaje no ha podido ser entregado, recargue la pagina y vuelva a intentarlo')
        }
    }


    


    async function cerrar() {
        setData(null)
        setMensajeRechazado('')
    }









    return (
        <>
            <Navbar />
            <div id='mensajes-cuerpo'>
                <h1>Mensajes recibidos</h1>


                {data &&
                <Modal isOpen={true}>

                    <div id='modal-completo'>
                        <h1 id='modal-enviado'>{mensajeEnviado}</h1>
                        <h1 id='modal-rechazado'>{mensajeRechazado}</h1>
                        <h1 id='modal-rotulo'>Contestar a {data.username}</h1>
                        <div id='modal-form'>
                            <textarea id="modal-mensaje" placeholder="Escriba su mensaje" rows='25' cols='150' />
                        </div>
                        <div id='modal-buttons'>
                            <button className='buttonModal' onClick={cerrar}>Cerrar</button>
                            <button className='buttonModal' onClick={enviar} id={data._id} vendor={data.vendor}>Enviar</button>
                        </div>
                    </div>

                </Modal>
                }


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