import React from "react";

export const Button = ({ type, className, onClick, children }) => {
  return (
    <button className={className} type={type || "button"} onClick={onClick}>
      {children}
    </button>
  );
};
