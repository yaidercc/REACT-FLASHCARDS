import { Login,SignUp,Home } from "./components"
import { RouterProvider,createBrowserRouter } from 'react-router-dom';

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
  return (
    <>
      <RouterProvider router={router}/>;
    </>
  )
}
export default FlashCards