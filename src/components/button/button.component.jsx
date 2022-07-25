import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

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

const Button = ({ children, label, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton {...otherProps}>{children ? children : label}</CustomButton>
  );
};

export default Button;
