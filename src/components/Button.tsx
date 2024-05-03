import React from "react";

interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {}

export function Button({ onClick, children, ...rest }: ButtonProps) {
  return (
    <button onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
