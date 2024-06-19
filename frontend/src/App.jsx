import router from './router.jsx'
import { RouterProvider } from 'react-router-dom'
import NavBar from './components/navbar/NavBar.jsx'
import Inmuebles from './components/Inmuebles.jsx'

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
