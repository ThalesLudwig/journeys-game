import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectHero } from "../../config/heroSlice";
import StoreType from "../../types/StoreType";
import { Button } from "../Button/Button";
import { Text } from "../Text/Text";
import { Container, HeroesList, Item, ItemId } from "./TabHeroes.styled";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";

export default function TabHeroes() {
  const dispatch = useDispatch<any>();
  const {
    hero: { heroes },
  } = useSelector((store: StoreType) => store);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateIsModalOpen] = useState(false);

  const openUpdateModal = (hero) => {
    dispatch(selectHero(hero));
    setUpdateIsModalOpen(true);
  };

  return (
    <Container>
      <Button onClick={() => setIsAddModalOpen(true)}>ADICIONAR HERÓI</Button>
      <HeroesList>
        {heroes.map((hero) => (
          <Item key={hero.id} onClick={() => openUpdateModal(hero)}>
            <Text>{hero.name}</Text>
            <ItemId>{hero.xp} XP</ItemId>
          </Item>
        ))}
      </HeroesList>
      <AddModal close={() => setIsAddModalOpen(false)} isOpen={isAddModalOpen} showUpdateModal={setUpdateIsModalOpen} />
      <UpdateModal close={() => setUpdateIsModalOpen(false)} isOpen={isUpdateModalOpen} />
    </Container>
  );
}
