import "./FieldError.css";

function FieldError({ children }) {
  return <span className="error_message">{children}</span>;
}

export default FieldError;
