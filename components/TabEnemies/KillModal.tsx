import { useMemo, useState } from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { HeroType } from "../../types/HeroType";
import StoreType from "../../types/StoreType";
import { Button } from "../Button/Button";
import { Text } from "../Text/Text";
import { removeEnemy } from "../../config/enemySlice";
import { Select, Item, ItemId, ModalContent } from "./TabEnemies.styled";
import { updateHero } from "../../config/heroSlice";

type KillModalType = {
  isOpen: boolean;
  close: Function;
};

export default function KillModal({ isOpen, close }: KillModalType) {
  const dispatch = useDispatch<any>();
  const {
    enemy: { selected: selectedEnemy },
    hero: { heroes },
  } = useSelector((store: StoreType) => store);
  const [selectedHero, setSelectedHero] = useState<HeroType>(heroes[0]);

  const onSelectHero = (e) => {
    setSelectedHero(heroes.find((hero) => hero.id === e.target.value));
  };

  const totalHealth = useMemo(
    () => (selectedEnemy?.baseHealth || 0) + (selectedEnemy?.baseShield || 0) + (selectedEnemy?.baseMagic || 0),
    [selectedEnemy],
  );

  const killEnemyAndGrantXP = () => {
    dispatch(removeEnemy());
    dispatch(updateHero({ ...selectedHero, xp: selectedHero.xp + totalHealth }));
    close();
  };

  return (
    <Modal ariaHideApp={false} isOpen={isOpen} onRequestClose={close} style={{ content: { height: "max-content" } }}>
      <ModalContent>
        <Text bold={900}>Este inimigo será eliminado.</Text>
        <Item>
          <ItemId>{selectedEnemy?.id}</ItemId>
          <Text>{selectedEnemy?.name}</Text>
        </Item>
        <Text>Fornecer Experiência para:</Text>
        <Select onChange={onSelectHero}>
          {heroes.map((hero) => (
            <option key={hero.id} value={hero.id}>
              {hero.name}
            </option>
          ))}
        </Select>
        <Button onClick={killEnemyAndGrantXP}>ELIMINAR INIMIGO</Button>
        <Button onClick={close} secondary>
          CANCELAR
        </Button>
      </ModalContent>
    </Modal>
  );
}
