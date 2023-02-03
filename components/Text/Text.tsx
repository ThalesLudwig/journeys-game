import { Container } from "./Text.styled";

type TextType = {
  children: string;
  color?: string;
  bold?: number;
};

export const Text = ({ children, color, bold }: TextType) => {
  return (
    <Container color={color} bold={bold}>
      {children}
    </Container>
  );
};
