import React from "react";

function Input({
  label,
  type = "Text",
  Id,
  onchange,
  placeholder = "enter something",
  inputSpan = "inputSpan",
  ...props
}) {
  return (
    <>
      {" "}
      <span className={inputSpan}>
        <label htmlFor={Id}>{label}</label>
        <input
          type={type}
          id={Id}
          placeholder={placeholder}
          onChange={onchange}
          {...props}
        />
      </span>
    </>
  );
}

export default Input;
