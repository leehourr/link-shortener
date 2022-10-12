import React from 'react';


const Input = React.forwardRef((props, ref) => {
  return (
    <div className={props.class}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} placeholder="Enter url" />
    </div>
  );
});

export default Input;
