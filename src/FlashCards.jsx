import { Route, Routes } from "react-router-dom";
import { Home, Login, SignUp } from "./components";
import { UserProvider } from "./context/UserProvider.jsx";
import { PrivateRoute } from "./guards/PrivateRoute.jsx";
import { PublicRoute } from "./guards/PublicRoute.jsx";

const FlashCards = () => {
  
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<PrivateRoute> <Home /> </PrivateRoute>} />
        <Route path="/login" element={<PublicRoute><Login /> </PublicRoute>} />
        <Route path="/signup" element={<PublicRoute> <SignUp /> </PublicRoute>} />
      </Routes>
    </UserProvider>
  );
};
export default FlashCards;
