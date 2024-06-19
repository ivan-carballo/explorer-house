import React, { useState } from 'react';
import router from './router.jsx'
import { RouterProvider } from 'react-router-dom'

import NavBar from './componentes/navbar/NavBar.jsx'
import Inmuebles from './componentes/Inmuebles.jsx'

import { useEffect, useState } from "react";


function App() {

  
  const [inmuebles, setInmuebles] = useState([]);
 
  return (
    <>
        <RouterProvider router={router} />

{/*         <NavBar setInmuebles={setInmuebles} />
      
      º<Inmuebles inmuebles={inmuebles} /> */}
    </>
  )
}

export default App
