import "./Input.css";
import FieldError from "./FieldError";

function Input({ type, name, value, placeholder, validateErrors, onChange }) {
  return (
    <>
      {validateErrors?.map((errorMsg, index) => {
        return <FieldError key={index}>{errorMsg}</FieldError>;
      })}

      <input
        type={type ?? "text"}
        name={name ?? ""}
        className={`${validateErrors?.length && "field_error"}`}
        value={value ?? ""}
        placeholder={placeholder ?? ""}
        onChange={onChange}
        autoComplete="off"
      />
    </>
  );
}

export default Input;
