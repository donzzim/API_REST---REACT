import { Routes as RoutesManager, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";

function Routes() {
  return (
    <>
      <RoutesManager>
        <Route path="/" element={<Home />} />
        <Route path="/cadastrar" element={<Register />} />
        <Route path="/alterar/:userId" element={<Register />} />
        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </RoutesManager>
    </>
  );
}

export default Routes;
