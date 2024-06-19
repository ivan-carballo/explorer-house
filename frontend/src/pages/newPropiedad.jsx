import { useState, useEffect } from "react";
import React from 'react';
import { sha256 } from 'js-sha256'
import Cookies from 'js-cookie'


import { Navbar } from "../componentes/navbar.jsx";
import { createPropiedad, getPropiedad } from "../api/apiPropiedad";
import { userLogin } from "../api/apiUser";
import { getCita, getCitaByID, citaUpdate } from "../api/apiCita.js"


import "../scss/newPropiedad.scss"




function NewPropiedad() {
    const [recarga, setRecarga] = useState('true')
    const [listado, setListado] = useState('')
    const [nuevaPropiedad, setNuevaPropiedad] = useState('')
    const [verificada, setVerificada] = useState('')



    useEffect(() => {
        if (recarga) {
            Citas()
            async function Citas() {
                setListado('')
                const getAllCita = await getCita()
                let getArrayCita = await getAllCita.data
                getArrayCita.reverse()

                let listPropiedad = await getPropiedad()
                listPropiedad = await listPropiedad.data

                let arrayCitaVendor = []
                let arrayCitaUni = []

                for (let i = 0; getArrayCita.length > i; i++) {
                    if (sha256(getArrayCita[i].vendor) == Cookies.get('username')) {
                        arrayCitaUni.push(getArrayCita[i].date) //0
                        arrayCitaUni.push(getArrayCita[i].username) //1
                        arrayCitaUni.push(getArrayCita[i].state) //2
                        arrayCitaUni.push(getArrayCita[i]._id) //3

                        for (let j = 0; listPropiedad.length > j; j++) {
                            if (getArrayCita[i].propiedad == listPropiedad[j]._id) {
                                arrayCitaUni.push(`${listPropiedad[j].tipo} en ${listPropiedad[j].ciudad}`) //4
                                arrayCitaUni.push(listPropiedad[j].descripcion) //5
                                arrayCitaUni.push(listPropiedad[j].imagen) //6
                            }
                        }
                    }
                    arrayCitaVendor.push(arrayCitaUni)
                    arrayCitaUni = []
                }

                let arrayFiltrado = arrayCitaVendor.filter(objeto => Object.keys(objeto).length !== 0);

                const citasDiv = await arrayFiltrado.map((data) =>
                    <div id='div-citas' key={data[3]} className={data[2] == 'Solicitud aceptada' ? 'aceptada' : data[2] == 'Solicitud denegada' ? 'denegada' : 'pendiente'}>
                        <ul id='div-citas-ul'>
                            <li>Fecha: {data[0]}</li>
                            <li>{data[4]}</li>
                            <li>{data[5]}</li>
                            <li>Usuario: {data[1]}</li>
                            <li>Estado: {data[2]}</li>
                        </ul>
                        <img id='div-citas-img' src={data[6] != null ? data[6]: '../../public/noPhoto.avif'} />
                        <div id='div-citas-buttons'>
                            <input id={data[3]} className="button-pisos button-aceptar" type="button" value='Aceptar' onClick={estadoCita} />
                            <input id={data[3]} className="button-pisos button-denegar" type="button" value='Denegar' onClick={estadoCita} />
                        </div>
                    </div>
                )
                setListado(citasDiv)
                setRecarga(false)
            }
        }
    }, [recarga]); 


    
    async function estadoCita(e) {
        let nuevoEstado;
        if (e.target.value === 'Aceptar') {
            nuevoEstado = 'Solicitud aceptada'
        } else if (e.target.value == 'Denegar') {
            nuevoEstado = 'Solicitud denegada'
        } else {
            nuevoEstado = 'Solicitud pendiente de verificar'
        }

        let buttonID = e.target.id
        const citaRevisarEstado = await getCitaByID(buttonID)

        const citaArrayUpdate = {'state': nuevoEstado}

        const data = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(citaArrayUpdate),
            };

        if (citaRevisarEstado.data.state == 'Solicitud pendiente de verificar') {
            const citaEstadoCambiar = await citaUpdate(buttonID, data)
            setTimeout(() => {
                setRecarga(true)
            }, 300);
        } else {
            setVerificada('No se permite cambiar el estado una vez que la cita ha sido aceptada o denegada')

            setTimeout(() => {
                setVerificada('')
            }, 7500);
        }
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
        

        let file = e.target.form[7].files[0];
        const reader = new FileReader();

        reader.onload = async function(e) {
            const base64Image = e.target.result;

          
            
            const propiedadArrayNew = {'tipo': formTipo, 
                'ciudad': formCiudad, 
                'descripcion': formDescripcion,
                'habitaciones': formHabitaciones,
                'metros': formMetros,
                'altura': formAltura,
                'precio': formPrecio,
                'vendor': formVendor,
                'imagen': base64Image
            }
    
    
            const data = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(propiedadArrayNew),
            };



            if (formTipo.length > 1 && formCiudad.length > 1 && formDescripcion.length > 1 && formHabitaciones.length > 0 && formMetros.length > 0 && formAltura.length > 0 && formPrecio.length > 1 && formImagen.length > 0) {
                const userCrear = await createPropiedad(data)
                setNuevaPropiedad('La propiedad se ha dado de alta correctamente')
/* 
                let form_tipo = document.getElementById('form-tipo')
                let form_ciudad = document.getElementById('form-ciudad')
                let form_descripcion = document.getElementById('form-descripcion')
                let form_habitaciones = document.getElementById('form-habitaciones')
                let form_metros = document.getElementById('form-metros')
                let form_altura = document.getElementById('form-altura')
                let form_precio = document.getElementById('form-precio')
                form_tipo.value = ''
                form_ciudad.value = ''
                form_descripcion.value = ''
                form_habitaciones.value = ''
                form_metros.value = ''
                form_altura.value = ''
                form_precio.value = '' */

            } else {
                setNuevaPropiedad('Debe rellenar todos los campos de forma correcta')
            }

        }
        
        formImagen.length > 0 ? reader.readAsDataURL(file) : '' ;
            
        
    }




    

    return (
        <div id='nuevaPropiedad'>
            <Navbar />
            <div id='nuevo-cuerpo'>
                <div id='nuevo-citas'>
                    <h1>Solicitudes de citas</h1>
                    <h4 id='div-citas-delete'>{verificada}</h4>
                    <div id='nuevo-citas-div'>
                        {listado}
                    </div>
                </div>

                <div id='nuevo-propiedad'>
                    <div id='nuevo-rotulo'>
                        <h1>Añadir nueva propiedad</h1>
                        <h3>{nuevaPropiedad}</h3>
                    </div>
                    <div id='nuevo-div-form'>
                        <form id='nuevo-form'>
                            <input type="text" id='form-tipo' placeholder='Tipo' />
                            <input type="text" id='form-ciudad 'placeholder='Ciudad' />
                            <input type="text" id='form-descripcion' placeholder='Descripcion' />
                            <input type="number" id='form-habitaciones' min='0' placeholder='Habitaciones' />
                            <input type="number" id='form-metros' min='0' placeholder='Metros' />
                            <input type="number" id='form-altura' min='0' placeholder='Altura' />
                            <input type="number" id='form-precio' min='0' placeholder='Precio' />
                            <input type="file" />
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