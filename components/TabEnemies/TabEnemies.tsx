import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import StoreType from "../../types/StoreType";
import { Button } from "../Button/Button";
import { Text } from "../Text/Text";
import { selectEnemy } from "../../config/enemySlice";
import { Container, EnemyList, Item, ItemId, NoGameContainer } from "./TabEnemies.styled";
import UpdateModal from "./UpdateModal";
import KillModal from "./KillModal";
import AddModal from "./AddModal";

export default function TabEnemies() {
  const dispatch = useDispatch<any>();
  const {
    enemy: { enemies },
    game: { hasActiveGame },
  } = useSelector((store: StoreType) => store);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isKillModalOpen, setIsKillModalOpen] = useState(false);

  const openUpdateModal = (enemy) => {
    dispatch(selectEnemy(enemy));
    setIsUpdateModalOpen(true);
  };

  return hasActiveGame ? (
    <Container>
      <Button onClick={() => setIsAddModalOpen(true)}>ADICIONAR INIMIGO</Button>
      <EnemyList>
        {enemies.map((enemy, i) => (
          <Item key={i} onClick={() => openUpdateModal(enemy)}>
            <ItemId>{enemy.id}</ItemId>
            <Text>{enemy.name}</Text>
          </Item>
        ))}
      </EnemyList>
      <AddModal isOpen={isAddModalOpen} close={() => setIsAddModalOpen(false)} />
      <UpdateModal
        openKillModal={() => setIsKillModalOpen(true)}
        isOpen={isUpdateModalOpen}
        close={() => setIsUpdateModalOpen(false)}
      />
      <KillModal isOpen={isKillModalOpen} close={() => setIsKillModalOpen(false)} />
    </Container>
  ) : (
    <NoGameContainer>
      <Text>Comece um novo jogo para adicionar inimigos</Text>
    </NoGameContainer>
  );
}
