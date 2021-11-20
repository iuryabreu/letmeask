import { ButtonHTMLAttributes } from "react";

// import "../styles/button.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  outLined?: boolean;
  danger?: boolean;
};

export function Button({
  outLined = false,
  danger = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`button 
      ${outLined ? "outlined" : ""} 
      ${danger ? "danger" : ""}
      `
    }
      {...props}
    />
  );
}
