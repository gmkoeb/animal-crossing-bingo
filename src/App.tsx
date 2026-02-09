import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./Root";
import { CardGenerator } from "./pages/CardGenerator";
import './index.css'

export function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children:[
        {
          path: 'card-generator',
          Component: CardGenerator
        }
      ]
    }
  ])
 return <RouterProvider router={router} />
}

