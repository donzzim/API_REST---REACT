import { IoMdCloseCircleOutline } from "react-icons/io";
import "./Modal.css";
import ReactDOM from "react-dom";

function Modal({ children, isOpen, title, onClose }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={`box_dark ${isOpen && "opened"}`}>
      <div className="modal">
        <div className="header">
          <h1>{title}</h1>
          <IoMdCloseCircleOutline onClick={onClose} />
        </div>

        <div className="content">{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default Modal;
