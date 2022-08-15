import { FC } from "react";
import { OrderedData } from "../components/Profile/ProfileOptions/ProfileOrders";
import classes from "./Button.module.css";

type ButtonProps = {
  onClick: (id: any | null) => void;
  id?: number | OrderedData;
  boo?: boolean;
  text: string;
  classNameBut?: string | undefined;
  type: "button" | "submit" | "reset" | undefined;
};

export const Button: FC<ButtonProps> = ({
  onClick,
  id,
  text,
  classNameBut,
  type,
  boo,
}) => {
  //   console.log(id);
  const add = (e: any) => {
    e.preventDefault();
    onClick(id);
  };

  return (
    <button
      onClick={add}
      className={
        classNameBut ? `${classes.button} ${classNameBut}` : classes.button
      }
      type={type}>
      {text}
    </button>
  );
};
