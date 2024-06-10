import { createBrowserRouter } from "react-router-dom";
import { Root } from './root.jsx'





const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
            //path: "/",
            //element: <Root />
        },

        {
          //path: "/buscador",
          //element: <Root />
        },


        {
          //path: "/cita",
          //element: <Root />
        },
        {
          //path: "/user",
          //element: <Root />
        },

      ]
    }    
  ]);


export default router;