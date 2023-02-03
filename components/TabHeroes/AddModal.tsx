import { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { addHero } from "../../config/heroSlice";
import { HeroType } from "../../types/HeroType";
import { Button } from "../Button/Button";
import { Text } from "../Text/Text";
import { TextInput } from "../TextInput/TextInput";
import { v4 as uuidv4 } from "uuid";
import { ModalContent } from "./TabHeroes.styled";

type AddModalType = {
  isOpen: boolean;
  close: Function;
  showUpdateModal: Function;
};

export default function AddModal({ isOpen, close, showUpdateModal }: AddModalType) {
  const dispatch = useDispatch<any>();
  const [heroName, setHeroName] = useState("");
  const [heroXp, setHeroXp] = useState(35);

  const closeModals = () => {
    setHeroName("");
    setHeroXp(35);
    close();
    showUpdateModal(false);
  };

  const addNewHero = () => {
    const newHero: HeroType = {
      id: uuidv4(),
      name: heroName,
      xp: heroXp,
    };
    closeModals();
    dispatch(addHero(newHero));
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={closeModals}
      style={{ content: { height: "max-content" } }}
    >
      <ModalContent>
        <Text>Adicionar Herói</Text>
        <TextInput value={heroName} onChange={setHeroName} placeholder="Nome" label="Nome do jogador" />
        <TextInput value={heroXp} onChange={setHeroXp} label="Experiência" placeholder="0" type="number" />
        <Button onClick={addNewHero}>ADICIONAR HERÓI</Button>
        <Button onClick={closeModals} secondary>
          CANCELAR
        </Button>
      </ModalContent>
    </Modal>
  );
}
