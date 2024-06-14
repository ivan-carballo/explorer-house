import { useState, useEffect } from "react";
import { sha256 } from 'js-sha256'
import Cookies from 'js-cookie';

import { Navbar } from "../componentes/navbar.jsx";
import { createPropiedad } from "../api/apiPropiedad";
import { userLogin } from "../api/apiUser";


import "../scss/newPropiedad.scss"



function NewPropiedad() {


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
                    <input id='nuevo-button' type="button" value="Dar de alta" onClick={enviarPropiedad}/>
                </form>
            </div>
        </div>
    )
}


export {
    NewPropiedad
}