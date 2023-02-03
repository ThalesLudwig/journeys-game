import { useMemo } from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import StoreType from "../../types/StoreType";
import { Button } from "../Button/Button";
import { Text } from "../Text/Text";
import { TextInput } from "../TextInput/TextInput";
import { removeEnemy, hitEnemy } from "../../config/enemySlice";
import { InputWrapper, Item, ItemId, ModalContent } from "./TabEnemies.styled";

type UpdateModalType = {
  isOpen: boolean;
  close: Function;
  openKillModal: Function;
};

export default function UpdateModal({ isOpen, close, openKillModal }: UpdateModalType) {
  const dispatch = useDispatch<any>();
  const {
    enemy: { selected: selectedEnemy },
  } = useSelector((store: StoreType) => store);

  const forceRemoveEnemy = () => {
    const shouldRemove = confirm("Tem certeza que quer remover este inimigo do jogo?");
    if (!shouldRemove) return;
    dispatch(removeEnemy());
    close();
  };

  const totalHealth = useMemo(
    () => (selectedEnemy?.health || 0) + (selectedEnemy?.shield || 0) + (selectedEnemy?.magic || 0),
    [selectedEnemy],
  );

  const attackEnemy = () => {
    dispatch(hitEnemy());
    if (selectedEnemy.health < 1) {
      close();
      openKillModal();
    }
  };

  return (
    <Modal ariaHideApp={false} isOpen={isOpen} onRequestClose={close} style={{ content: { height: "max-content" } }}>
      <ModalContent>
        <Text>Atualizar Inimigo</Text>
        <Item>
          <ItemId>{selectedEnemy?.id}</ItemId>
          <Text>{selectedEnemy?.name}</Text>
        </Item>
        <InputWrapper>
          <TextInput disabled value={selectedEnemy?.health} label="Vida" placeholder="0" type="number" />
          <TextInput disabled value={selectedEnemy?.shield} label="Escudo" placeholder="0" type="number" />
          <TextInput disabled value={selectedEnemy?.magic} label="Magia" placeholder="0" type="number" />
        </InputWrapper>
        <TextInput disabled value={totalHealth} label="Saúde total" type="number" />
        <InputWrapper>
          <TextInput disabled value={selectedEnemy?.attack} label="Ataque" placeholder="0" type="number" />
          <TextInput disabled value={selectedEnemy?.speed} label="Velocidade" placeholder="0" type="number" />
        </InputWrapper>
        <Button onClick={attackEnemy}>{totalHealth === 0 ? "ELIMINAR INIMIGO" : "GOLPEAR INIMIGO"}</Button>
        <InputWrapper>
          <Button onClick={forceRemoveEnemy} secondary streach>
            REMOVER
          </Button>
          <Button onClick={close} secondary streach>
            CANCELAR
          </Button>
        </InputWrapper>
      </ModalContent>
    </Modal>
  );
}
