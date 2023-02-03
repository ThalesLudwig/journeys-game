import styled from "styled-components";
import { THEME } from "../../constants/theme";

export const Container = styled.p<{ color?: string; bold?: number }>`
  padding: 0;
  margin: 0;
  font-size: 16px;
  color: ${({ color }) => (color ? color : THEME.text)};
  font-weight: ${({ bold }) => (bold ? bold : "normal")};
`;
