import router from './router.jsx'
import { RouterProvider } from 'react-router-dom'
import { useEffect, useState } from "react";

function App() {

 
  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App
