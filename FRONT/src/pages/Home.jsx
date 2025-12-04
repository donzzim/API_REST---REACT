import { Button } from "../components/common/Button";
import Navbar from "../components/layout/Navbar";
import { useEffect, useState } from "react";
import BoxUser from "../components/layout/BoxUser";
import Loader from "../components/common/Loader";
import api from "../services/api";
import "./Home.css";

function Home() {
  const numUsersPerPage = 3;
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [users, setUsers] = useState([
    // {
    //   id: 1,
    //   name: "Rafa",
    //   email: "rafa@eduteka.com.br",
    //   date_of_birth: "01/01/2000",
    // },
  ]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);

    await api
      .get("/users", {
        params: {
          current_page: currentPage,
          // per_page: 3,
        },
      })
      .then((response) => {
        setUsers([...users, ...response.data.data]);
        setCurrentPage(currentPage + 1);
        setTotalUsers(response.data.infos.total_users);
        setIsLoading(false);
      })
      .catch((error) => {
        // console.error("Erro ao buscar usuários:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (totalUsers !== users.length) {
      fixCurrentPage();
    }
  }, [totalUsers]);

  const fixCurrentPage = () => {
    //Arredonda pra cima
    let maxNumPage = Math.ceil(totalUsers / numUsersPerPage);
    
    if (currentPage > maxNumPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const loadMore = () => {
    loadUsers();
  };

  return (
    <div>
      <Navbar />

      <div className="main_feed">
        <div className="feed_form">
          <h1>Listagem dos usuários</h1>
          <p>Listagem de todos usuários cadastrados na aplicação.</p>

          {users.length <= 0 ? (
            <>
              {isLoading ? (
                <Loader />
              ) : (
                <p>Ops! Nenhum usuário cadastrado até o momento!.</p>
              )}
            </>
          ) : (
            <>
              {users.length === 1 ? (
                <span>1 Usuário</span>
              ) : (
                <span>{totalUsers} Usuários</span>
              )}

              {users.map((user, index) => {
                return (
                  <BoxUser
                    key={index}
                    user={user}
                    users={users}
                    setUsers={setUsers}
                    totalUsers={totalUsers}
                    setTotalUsers={setTotalUsers}
                  />
                );
              })}

              {users.length < totalUsers && (
                <>
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <Button onClick={() => loadMore()}>Carregar mais</Button>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
