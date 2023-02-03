import styled from "styled-components";
import { THEME } from "../constants/theme";

export const Main = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  background-color: ${THEME.accent};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Counter = styled.h1`
  color: white;
  font-size: 28px;
`;

export const TabRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 15px;
  padding: 15px;
  border-bottom: 1px solid ${THEME.text};
`;

export const Tab = styled.button<{ isActive: boolean }>`
  color: ${THEME.text};
  font-size: 16px;
  background-color: transparent;
  border: none;
  font-weight: ${({ isActive }) => (isActive ? "900" : "normal")};
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
