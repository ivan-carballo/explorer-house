import { useState, useEffect } from "react";
import { sha256 } from 'js-sha256'
import Cookies from 'js-cookie';

import { Navbar } from "../componentes/navbar.jsx";
import { createPropiedad } from "../api/apiPropiedad";
import { userLogin } from "../api/apiUser";
import { getCita } from "../api/apiCita.js"


import "../scss/newPropiedad.scss"



function NewPropiedad() {
    const [citas, setCitas] = useState('')
    const [recarga, setRecarga] = useState('true')
    const [listado, setListado] = useState('')


    useEffect(() => {
        if (recarga) {
            Citas()
            async function Citas() {
                setListado('')
                const getAllCita = await getCita()
                let getArrayCita = await getAllCita.data
                getArrayCita.reverse()

                let arrayCitaVendor = []

                for (let i = 0; getArrayCita.length > i; i++) {
                    if (sha256(getArrayCita[i].vendor) == Cookies.get('username')) {
                        arrayCitaVendor.push(getArrayCita[i])
                    }
                }

                const citasDiv = await arrayCitaVendor.map((data) =>
                    <div id='div-citas' key={data._id}>
                        <ul>
                            <li>Fecha: {data.date}</li>
                            <li>Usuario: {data.username}</li>
                            <li>Estado: {data.state}</li>
                        </ul>
                        <input id={data._id} className="button-pisos" type="button" value='Aceptar' onClick={aceptarCita} />
                        <input id={data._id} className="button-pisos" type="button" value='Denegar' onClick={denegarCita} />
                    </div>
                )
                setListado(citasDiv)
                setRecarga(false)
            }
        }
    }, [recarga]); 


    async function aceptarCita() {

    }

    async function denegarCita() {

    }


    async function enviarPropiedad(e) {
        let formVendor;

        let users = await userLogin()
        users = await users.data

        for (let i = 0; users.length > i; i++) {
            if (sha256(users[i].username) == Cookies.get('username')) {
                formVendor = users[i].username
            }
        }

        const formTipo = e.target.form[0].value
        const formCiudad = e.target.form[1].value
        const formDescripcion = e.target.form[2].value
        const formHabitaciones = e.target.form[3].value
        const formMetros = e.target.form[4].value
        const formAltura = e.target.form[5].value
        const formPrecio = e.target.form[6].value
        const formImagen = e.target.form[7].value
        

        const propiedadArrayNew = {'tipo': formTipo, 
                                    'ciudad': formCiudad, 
                                    'descripcion': formDescripcion,
                                    'habitaciones': formHabitaciones,
                                    'metros': formMetros,
                                    'altura': formAltura,
                                    'precio': formPrecio,
                                    'vendor': formVendor
                                }

        const data = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(propiedadArrayNew),
            };

        const userCrear = await createPropiedad(data)
    }


    return (
        <div id='nuevaPropiedad'>
            <Navbar />
            <div id='nuevo-cuerpo'>
                <div id='nuevo-citas'>
                    <h1>Solicitudes de citas</h1>
                    <div id='nuevo-citas-div'>
                        {listado}
                    </div>
                </div>

                <div id='nuevo-propiedad'>
                    <div id='nuevo-rotulo'>
                        <h1>Añadir nueva propiedad</h1>
                    </div>
                    <div id='nuevo-div-form'>
                        <form id='nuevo-form'>
                            <input type="text" name="" id="" placeholder='Tipo' />
                            <input type="text" name="" id="" placeholder='Ciudad' />
                            <input type="text" name="" id="" placeholder='Descripcion' />
                            <input type="number" min='0' name="" id="" placeholder='Habitaciones' />
                            <input type="number" min='0' name="" id="" placeholder='Metros' />
                            <input type="number" min='0' name="" id="" placeholder='Altura' />
                            <input type="number" min='0' name="" id="" placeholder='Precio' />
                            <input type="file" name="" id="" />
                            <input id='nuevo-button' type="button" value="Dar de alta" onClick={enviarPropiedad}/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export {
    NewPropiedad
}