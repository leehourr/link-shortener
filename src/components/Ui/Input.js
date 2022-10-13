import React from "react";

const Input = React.forwardRef(
  (
    { id, name, type, autoComplete, onChange, className, placeholder, label },
    ref
  ) => {
    return (
      <div>
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          onChange={onChange}
          className={className}
          ref={ref}
          placeholder={placeholder}
        />
      </div>
    );
  }
);

export default Input;
