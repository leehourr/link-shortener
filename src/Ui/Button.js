import React from "react";

export const Button = (props) => {
  return (
    <button
      className={props.class}
      type={props.type || "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
