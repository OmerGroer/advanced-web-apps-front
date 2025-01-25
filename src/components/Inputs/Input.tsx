import { FC } from "react";

interface InputProps {
  type: string;
  label: string;
  name: string;
  defaultValue?: string
  error?: string;
}

const Input: FC<InputProps> = ({type, label, name, defaultValue, error}) => {
  return (
    <>
      <label>{label}:</label>
      <input type={type} name={name} defaultValue={defaultValue} />
      {error && <span>{error}</span>}
    </>
  );
};

export default Input;
