import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { removeHero, updateHero } from "../../config/heroSlice";
import StoreType from "../../types/StoreType";
import { Button } from "../Button/Button";
import { Text } from "../Text/Text";
import { TextInput } from "../TextInput/TextInput";
import { ButtonsWrapper, ModalContent } from "./TabHeroes.styled";

type UpdateModalType = {
  isOpen: boolean;
  close: Function;
};

export default function UpdateModal({ isOpen, close }: UpdateModalType) {
  const dispatch = useDispatch<any>();
  const {
    hero: { selected },
  } = useSelector((store: StoreType) => store);

  return (
    <Modal ariaHideApp={false} isOpen={isOpen} onRequestClose={close} style={{ content: { height: "max-content" } }}>
      <ModalContent>
        <Text>Atualizar Herói</Text>
        <TextInput
          value={selected.name}
          onChange={(name) => dispatch(updateHero({ ...selected, name }))}
          placeholder="Nome"
          label="Nome do jogador"
        />
        <TextInput
          value={selected.xp}
          onChange={(xp) => dispatch(updateHero({ ...selected, xp }))}
          label="Experiência"
          placeholder="0"
          type="number"
        />
        <ButtonsWrapper>
          <Button
            onClick={() => {
              dispatch(removeHero());
              close();
            }}
            secondary
            streach
          >
            REMOVER
          </Button>
          <Button onClick={close} secondary streach>
            CANCELAR
          </Button>
        </ButtonsWrapper>
      </ModalContent>
    </Modal>
  );
}
