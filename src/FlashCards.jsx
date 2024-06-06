import { Route, Routes } from "react-router-dom";
import { Home, Login, SignUp } from "./components";
import { UserProvider } from "./context/UserProvider.jsx";
import { PrivateRoute } from "./guards/PrivateRoute.jsx";
import { PublicRoute } from "./guards/PublicRoute.jsx";
import { TopicsAndFlashcardsProvider } from "./context/Topics/TopicsAndFlashcardsProvider.jsx";

const FlashCards = () => {
  return (
    <UserProvider>
      <TopicsAndFlashcardsProvider>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                {" "}
                <Home />{" "}
              </PrivateRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />{" "}
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                {" "}
                <SignUp />{" "}
              </PublicRoute>
            }
          />
        </Routes>
      </TopicsAndFlashcardsProvider>
    </UserProvider>
  );
};
export default FlashCards;
