import { FC, ButtonHTMLAttributes } from "react";
import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "./button.styles";

export enum BUTTON_TYPE_CLASSES {
  base = "base",
  google = "google-sign-in",
  inverted = "inverted",
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => {
  const giveButton = {
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  };
  return giveButton[buttonType];

  //or you can directly do this and return as:
  // return {
  //   [BUTTON_TYPE_CLASSES.base]: BaseButton,
  //   [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
  //   [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  // }[buttonType];
};

type ButtonProps = {
  isLoading?: boolean;
  label: string;
  buttonType?: BUTTON_TYPE_CLASSES;
} & ButtonHTMLAttributes<HTMLButtonElement>;

// children is React node so its type is inferred automatically when we use FC<Props> to define react's functional component and its props type
// also as we are building a custom element over html element(here button), we always get its attributes type, that we can use to infer type of diff. attributes that can be used in this element (here as otherProps)
const Button: FC<ButtonProps> = ({
  children,
  isLoading,
  label,
  buttonType,
  ...otherProps
}) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton disabled={isLoading} {...otherProps}>
      {children ? children : label}
    </CustomButton>
  );
};

export default Button;
