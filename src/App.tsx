import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./Root";
import { CardGenerator } from "./pages/CardGenerator";
import './index.css'
import { Home } from "./pages/Home";

export function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children:[
        { 
          index: true,
          path: "/",
          Component: Home
        },
        {
          path: 'card-generator',
          Component: CardGenerator
        }
      ]
    }
  ])
 return <RouterProvider router={router} />
}

