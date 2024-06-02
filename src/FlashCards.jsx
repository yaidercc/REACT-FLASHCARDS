import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home, Login, SignUp } from "./components";
import { useAuth } from "./hooks/useAuth";

const router = createBrowserRouter([
  {
    path:"/",
    element: <Home />,
  },
  {
    path:"/login",
    element: <Login />,
  },
  {
    path:"/singup",
    element: <SignUp />,
  },
  
])

const FlashCards = () => {
  useAuth()
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}
export default FlashCards