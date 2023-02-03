import styled from "styled-components";
import { THEME } from "../../constants/theme";

export const Container = styled.input`
  font-size: 16px;
  padding: 10px;
  border-radius: 8px;
  color: ${({ color }) => (color ? color : THEME.text)};
  border: 1px solid ${THEME.chip};
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Label = styled.label`
  color: ${THEME.text};
  font-size: 14px;
`;
