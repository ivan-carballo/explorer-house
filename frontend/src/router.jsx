import { createBrowserRouter } from "react-router-dom";
import { Root } from './root.jsx'





const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
            path: "/",
            element: <Root />
        }
      ]
    }    
  ]);


export default router;