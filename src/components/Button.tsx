import { ButtonHTMLAttributes } from 'react';

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  outLined?: boolean;
};

export function Button({ outLined = false, ...props }: ButtonProps) {
  return (
    <button className={`button ${outLined ? 'outlined' : ''}`} {...props} />
  );
}
