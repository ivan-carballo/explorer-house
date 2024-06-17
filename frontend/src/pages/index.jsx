import { useState, useEffect } from "react";
import { getPropiedad } from "../api/apiPropiedad.js"
import { getCita, citaCreate } from "../api/apiCita.js"
import { userLogin } from "../api/apiUser.js";

import { Navbar } from "../componentes/navbar.jsx";
import Cookies from 'js-cookie';
import { sha256 } from 'js-sha256';
import { activeLogin } from "../funciones/activeLogin.js"
import { FormatearFecha } from "../funciones/fecha.js"

import "../scss/index.scss"




function Index() {
    const [listado, setListado] = useState('')
    const [recarga, setRecarga] = useState(true)
    const user = Cookies.get('username')

    
    activeLogin()


    useEffect(() => {
        if (recarga) {
            Propiedades()
            async function Propiedades() {
                setListado('')
                const getAll = await getPropiedad()
                let getArray = await getAll.data
                getArray.sort()

                const getCitas = await getCita()
                let getArrayCitas = await getCitas.data
                let userCitas = '';

                for (let i = 0; getArrayCitas.length > i; i++) {
                    if (sha256(getArrayCitas[i].username) == user) {
                        userCitas += getArrayCitas[i].propiedad
                    }
                }

                const propiedadesDiv = await getArray.map((data) =>
                    <div id='div-pisos' key={data._id}>
                        <h1>{data.tipo} en {data.ciudad}</h1>
                        <p id='descripcion'>{data.descripcion}</p>
                        <img id='img-pisos' src={data.imagen} />
                        <ul>
                            <li>Habitaciones: {data.habitacion}</li>
                            <li>Metros: {data.metros}</li>
                            <li>Altura: {data.altura}</li>
                            <li>Precio: {data.precio}</li>
                            <li>Vendedor: {data.vendor}</li>
                        </ul>
                        <input id={data._id} className="button-pisos" type="button" value={userCitas.includes(data._id) ? 'Cita solicitada' : (sha256(data.vendor) == Cookies.get('username') ? 'Es tu propiedad' : 'Pedir cita') } onClick={newCita} />
                    </div>
                )
                setListado(propiedadesDiv)
                setRecarga(false)
            }
        }
    }, [recarga]); 
 



    async function newCita(e) {
        const citaPedida = e.target.attributes.value.value
        const propiedadID = e.target.id
        const vendor = e.target.parentElement.childNodes[4].previousElementSibling.childNodes[4].lastChild.data
        const id = Cookies.get('id')
        
        
        let listUser = await userLogin()
        listUser = listUser.data

        const fechaNow = await FormatearFecha(Date.now())

        let username;

        for (let i = 0; listUser.length > i; i++) {
            if(listUser[i]._id == id) {
                username = listUser[i].username
            }
        }

        const citaArrayNew = await {'username': username, 
                            'propiedad': propiedadID, 
                            'date': fechaNow, 
                            'vendor': vendor, 
                            'place': 'Plaza', 
                            'state': 'Solicitud pendiente de verificar'}

        const data = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(citaArrayNew),
            };

        if (citaPedida == 'Pedir cita') {
            const citaCrear = await citaCreate(data)
            setTimeout(() => {
                setRecarga(true)
            }, 300);
        }
    }




    return (
        <>
            <Navbar />
            <h2 id="titulo-pagina">Pisos Disponibles:</h2>
            <div id='div-body'>
                {listado}
            </div>
            <div id="circulo-decoracion"></div>
            <div id="circulo-decoracion2"></div>
        </>
    )
}




export {
    Index
}