import { FC, PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<{
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}>;

export const Button: FC<ButtonProps> = ({ children }) => {
  return <button>{children}</button>;
};
