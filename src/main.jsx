import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import FlashCards from "./FlashCards.jsx";
import "./styles/global.scss";
import "./styles/index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FlashCards />
  </BrowserRouter>
);
