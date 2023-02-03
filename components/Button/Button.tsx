import { Container } from "./Button.styled";

type ButtonType = {
  children: string;
  onClick?: Function;
  secondary?: boolean;
  streach?: boolean;
};

export const Button = ({ children, onClick, secondary, streach }: ButtonType) => {
  return (
    <Container streach={streach} secondary={secondary} onClick={() => onClick()}>
      {children}
    </Container>
  );
};
