import Routes from "./routes/Routes";
import "./assets/styles/global.css";
import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/toast_custom.css";

function App() {
  return (
    <>
      <Routes />
      <ToastContainer autoClose={3000} position="top-right" />
    </>
  );
}

export default App;
