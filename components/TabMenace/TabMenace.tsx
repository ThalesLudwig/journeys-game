import { useMemo, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { restoreMagic } from "../../config/enemySlice";
import { increseMenace, increseTurn } from "../../config/menaceSlice";
import StoreType from "../../types/StoreType";
import { Button } from "../Button/Button";
import { Text } from "../Text/Text";
import { Container, List, Item, ItemId, ModalContent, NoGameContainer } from "./TabMenace.styled";

export default function TabMenace() {
  const dispatch = useDispatch<any>();
  const {
    hero: { heroes },
    menace: { level, turn },
    game: { hasActiveGame },
  } = useSelector((store: StoreType) => store);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const menaceThreshold = useMemo(() => 4 + heroes.length, [heroes]);

  const passTurn = () => {
    dispatch(restoreMagic());
    dispatch(increseMenace(menaceThreshold));
    dispatch(increseTurn());
    setIsModalOpen(false);
  };

  return hasActiveGame ? (
    <Container>
      <Button onClick={() => setIsModalOpen(true)}>PASSAR TURNO</Button>
      <List>
        <Item>
          <Text>Ameaça atual</Text>
          <ItemId>{level}</ItemId>
        </Item>
        <Item>
          <Text>Turno</Text>
          <ItemId>{turn}</ItemId>
        </Item>
      </List>
      <Modal
        ariaHideApp={false}
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{ content: { height: "max-content" } }}
      >
        <ModalContent>
          <Text bold={900}>{`Passar turno e aumentar ${menaceThreshold} de ameaça?`}</Text>
          <Text>Inimigos sobreviventes recuperarão toda magia.</Text>
          <Button onClick={passTurn}>PASSAR TURNO</Button>
          <Button onClick={() => setIsModalOpen(false)} secondary>
            CANCELAR
          </Button>
        </ModalContent>
      </Modal>
    </Container>
  ) : (
    <NoGameContainer>
      <Text>Comece um novo jogo</Text>
    </NoGameContainer>
  );
}
