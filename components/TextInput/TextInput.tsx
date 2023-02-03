import { Container, Label, Wrapper } from "./TextInput.styled";

type TextInputType = {
  value: string | number;
  onChange?: Function;
  placeholder?: string;
  type?: "text" | "number";
  label: string;
  disabled?: boolean;
};

export const TextInput = ({ value, onChange, placeholder, type, label, disabled, ...rest }: TextInputType) => {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Container
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...rest}
      />
    </Wrapper>
  );
};
