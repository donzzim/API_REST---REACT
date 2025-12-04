import { Button } from "../components/common/Button";
import Input from "../components/common/Input";
import Form from "../components/common/Form";
import Navbar from "../components/layout/Navbar";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function Register() {
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date_of_birth: "",
  });

  const [formDataErrors, setFormDataErrors] = useState({
    name: [],
    email: [],
    date_of_birth: [],
  });

  useEffect(() => {
    if (userId) {
      loadUser();
    }
  }, [userId]);

  const loadUser = async () => {
    setIsLoading(true);

    await api
      .get(`/users/${userId}`)
      .then((response) => {
        setFormData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        // console.error("Erro ao buscar usuários:", error);
        setIsLoading(false);
      });
  };

  const handleUpdate = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setFormDataErrors({});

    await api
      .put(`/users/${userId}`, formData)
      .then((response) => {
        // console.log(response);
        toast.success("Cadastro alterado com sucesso!");
        setIsLoading(false);
      })
      .catch((error) => {
        // Erro de validação dos dados
        if (error.status === 422) {
          setFormDataErrors(error.response.data.errors);
        } else {
          // console.log(error);
          toast.error(error.response.data);
        }

        setIsLoading(false);
      });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setFormDataErrors({});

    await api
      .post("/users", formData)
      .then((response) => {
        // console.log(response);
        toast.success("Cadastro realizado com sucesso!");
        setFormData({});
        setIsLoading(false);
      })
      .catch((error) => {
        // Erro de validação dos dados
        if (error.status === 422) {
          setFormDataErrors(error.response.data.errors);
        } else {
          // console.log(error);
          toast.error(error.response.data);
        }

        setIsLoading(false);
      });
  };

  return (
    <div>
      <Navbar />

      <div className="main_feed">
        <div className="feed_form">
          {userId ? (
            <>
              <h1>Alterar usuário</h1>
              <p>Altere os dados do usuário na aplicação.</p>
            </>
          ) : (
            <>
              <h1>Cadastrar novo usuário</h1>
              <p>Cadastre um novo usuário na aplicação.</p>
            </>
          )}

          <Form>
            <Input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Nome"
              validateErrors={formDataErrors?.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <Input
              type="email"
              name="email"
              value={formData.email}
              placeholder="E-mail"
              validateErrors={formDataErrors?.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <Input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              placeholder="Data de nascimento"
              validateErrors={formDataErrors?.date_of_birth}
              onChange={(e) =>
                setFormData({ ...formData, date_of_birth: e.target.value })
              }
            />

            <Link
              to={{
                pathname: "/",
                // search: "?query=string",
                // hash: "#hash",
              }}
            >
              Ver listagem
            </Link>

            {userId ? (
              <Button onClick={(e) => handleUpdate(e)}>
                {isLoading ? "Alterando..." : "Alterar"}
              </Button>
            ) : (
              <Button onClick={(e) => handleSubmit(e)}>
                {isLoading ? "Cadastrando..." : "Cadastrar"}
              </Button>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
