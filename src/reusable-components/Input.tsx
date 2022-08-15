import React, { ChangeEvent, FC, useState } from "react";

type InputProps = {
  type: string;
  className: string;
  name: string;
  value?: any;
  //   stateValue: null | string;
  onChangeState?: (data: string) => void;
  onClick?: () => void;
  submit?: boolean;
  setState?: any;
  state?: any;
  placeholder?: string;
};

const Input: FC<InputProps> = ({
  type,
  className,
  onChangeState,
  onClick,
  name,
  submit,
  value,
  state,
  setState,
  placeholder,
}) => {
  //   const [state, setState] = useState(stateValue);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
    // console.log(state);

    // onChangeState(state);
  };

  const blurHandler = () => {
    if (!state) return;
    if (submit) return;
    if (state) {
      //   onChangeState(state);
    }
  };

  console.log(state);

  return (
    <>
      <input
        placeholder={placeholder}
        type={type}
        name={name}
        id={name}
        value={!value ? state : value}
        className={className}
        onChange={changeHandler}
        onClick={onClick}
        onBlur={blurHandler}
      />
    </>
  );
};

export default Input;
