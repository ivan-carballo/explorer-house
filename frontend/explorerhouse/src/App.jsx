import { useState } from 'react'
/* import './App.css' */
import NavBar from './components/navbar/NavBar.jsx'
import Inmuebles from './components/Inmuebles.jsx'
function App() {

  const [inmuebles, setInmuebles] = useState([]);

  return (
    <>
      <NavBar setInmuebles={setInmuebles} />
      
      <Inmuebles inmuebles={inmuebles} />

    </>
  )
}

export default App
