import { Route, Routes } from "react-router-dom";
import { Home, Login, Profile, SignUp,ChangePassword,ForgotPassword } from "./components";
import { UserProvider } from "./context/UserProvider.jsx";
import { PrivateRoute } from "./guards/PrivateRoute.jsx";
import { PublicRoute } from "./guards/PublicRoute.jsx";
import { TopicsAndFlashcardsProvider } from "./context/Topics/TopicsAndFlashcardsProvider.jsx";
import { PageNotFound } from "./utils/PageNotFound/PageNotFound.jsx";
import { Menu } from "./components/Home/Menu.jsx";

const FlashCards = () => {
  return (
    <UserProvider>
      <TopicsAndFlashcardsProvider>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Menu />
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Menu />
                <Profile />
              </PrivateRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/changePassword/:token"
            element={
              <PublicRoute>
                <ChangePassword />
              </PublicRoute>
            }
          />
          <Route
            path="/forgotPassword"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </TopicsAndFlashcardsProvider>
    </UserProvider>
  );
};
export default FlashCards;
