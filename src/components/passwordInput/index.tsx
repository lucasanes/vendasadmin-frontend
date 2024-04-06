import { Input, InputProps } from "@nextui-org/react";
import React from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";

export default function PasswordInput(props: InputProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      {...props}
      isRequired
      label={props.label ? props.label : "Senha"}
      labelPlacement="outside"
      placeholder={props.placeholder ? props.placeholder : "Digite sua senha"}
      startContent={<MdLockOutline className="pallet" size={20} />}
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <IoEyeOutline className="pallet" size={18} />
          ) : (
            <IoEyeOffOutline className="pallet" size={18} />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
    />
  );
}
