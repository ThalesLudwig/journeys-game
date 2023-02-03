import styled from "styled-components";
import { THEME } from "../../constants/theme";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 15px;
`;

export const HeroesList = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Item = styled.div`
  display: flex;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid ${THEME.chip};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
`;

export const ItemId = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 8px;
  background-color: ${THEME.chip};
  color: ${THEME.text};
  font-size: 12px;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
