import styled from "styled-components";
import { THEME } from "../../constants/theme";

export const Container = styled.button<{ secondary?: boolean; streach?: boolean }>`
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid ${THEME.chip};
  background-color: ${({ secondary }) => (secondary ? "transparent" : THEME.button)};
  box-shadow: ${({ secondary }) => (secondary ? "none" : "0px 10px 15px -3px rgba(0, 0, 0, 0.1)")};
  width: ${({ streach }) => (streach ? "100%" : "auto")};
`;
