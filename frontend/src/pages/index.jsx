import { useState, useEffect } from "react";
import { getPropiedad } from "../api/apiPropiedad.js"
import { citaCreate } from "../api/apiCita.js"
import { userLogin } from "../api/apiUser.js";

import { Navbar } from "../componentes/navbar.jsx";
import Cookies from 'js-cookie';
import { activeLogin } from "../funciones/activeLogin.js"

import "../scss/index.scss"




function Index() {
    const [listado, setListado] = useState('')

    
    activeLogin()


    useEffect(() => {
        Propiedades()
        async function Propiedades() {
            setListado('')
            const getAll = await getPropiedad()
            let getArray = await getAll.data
            getArray.sort()


            const propiedadesDiv = await getArray.map((data) => 
                <div id='div-pisos' key={data._id}>
                    <img id='img-pisos' src={data.imagen} />
                    <p>Tipo: {data.tipo}</p>
                    <p>Ciudad: {data.ciudad}</p>
                    <p>Descripcion: {data.descripcion}</p>
                    <p>Habitaciones: {data.habitacion}</p>
                    <p>Metros: {data.metros}</p>
                    <p>Altura: {data.altura}</p>
                    <p>Precio: {data.precio}</p>
                    <p>Vendedor: {data.vendor}</p>
                    <input id={data._id} className="button-pisos" type="button" value="Pedir cita" onClick={newCita} />
                </div>
            )
            setListado(propiedadesDiv)
        }
    }, []); 



    async function newCita(e) {
        const propiedadID = e.target.id
        const vendor = e.target.parentElement.childNodes[8].lastChild.data
        const id = Cookies.get('id')
        
        let listUser = await userLogin()
        listUser = listUser.data

        let username;

        for (let i = 0; listUser.length > i; i++) {
            if(listUser[i]._id == id) {
                username = listUser[i].username
            }
        }

        const citaArrayNew = {'username':username, 'propiedad':propiedadID, 'date': Date.now(), 'vendor': vendor, 'place': 'Plaza'}

        const data = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(citaArrayNew),
            };

        const citaCrear = await citaCreate(data)
    }




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