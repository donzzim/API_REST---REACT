import { useState } from "react";
import { Button, ButtonSmall } from "../common/Button";
import "./BoxUser.css";
import { BiTrash, BiEdit, BiSolidUserCircle } from "react-icons/bi";
import Modal from "../common/Modal";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/dateUtils";

function BoxUser({ user, users, setUsers, totalUsers, setTotalUsers }) {
  const [modalRmvUserIsOpen, setModalRmvUserIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (userId) => {
    setIsLoading(true);

    await api
      .delete(`/users/${userId}`)
      .then((response) => {
        // console.log(response);
        setUsers(users.filter((user) => user.id !== userId));
        setTotalUsers(totalUsers - 1);
        setIsLoading(false);
        setModalRmvUserIsOpen(!modalRmvUserIsOpen);
      })
      .catch((error) => {
        // console.error("Erro ao deletar usuários:", error);
        setIsLoading(false);
      });
  };

  const handleUpdate = (userId) => {
    navigate(`/alterar/${userId}`);
  };

  return (
    <div className="box_user">
      <div className="box_picture">
        <BiSolidUserCircle />
      </div>

      <div className="box_infos">
        <div className="infos">
          <div>
            <h2>{user.name}</h2>
            <span>{user.email}</span>
          </div>

          <div className="birthday">
            <span>{formatDate(user.date_of_birth)}</span>
          </div>
        </div>

        <div className="actions">
          <ButtonSmall
            className="updt"
            tooltipId="react-tooltip-edt"
            tooltipContent="Editar"
            onClick={() => handleUpdate(user.id)}
          >
            <BiEdit />
          </ButtonSmall>

          <ButtonSmall
            className="rmv"
            tooltipId="react-tooltip-rmv"
            tooltipContent="Remover"
            onClick={() => setModalRmvUserIsOpen(true)}
          >
            <BiTrash />
          </ButtonSmall>
        </div>
      </div>

      <Modal
        title="Remover"
        isOpen={modalRmvUserIsOpen}
        onClose={() => setModalRmvUserIsOpen(!modalRmvUserIsOpen)}
      >
        <p>
          Tem certeza que deseja remover o usuário <b>{user.name}</b>?
        </p>

        <Button onClick={() => handleDelete(user.id)}>
          {isLoading ? "Removendo..." : "Confirmar remoção"}
        </Button>
      </Modal>
    </div>
  );
}

export default BoxUser;
