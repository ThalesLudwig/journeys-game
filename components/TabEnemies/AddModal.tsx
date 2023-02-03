import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { ENEMIES } from "../../constants/enemies";
import { EnemyType } from "../../types/EnemyType";
import { Button } from "../Button/Button";
import { Text } from "../Text/Text";
import { TextInput } from "../TextInput/TextInput";
import { addEnemy } from "../../config/enemySlice";
import { Select, InputWrapper, ModalContent } from "./TabEnemies.styled";
import StoreType from "../../types/StoreType";
import { decreaseMenace } from "../../config/menaceSlice";

type AddModalType = {
  isOpen: boolean;
  close: Function;
};

export default function AddModal({ isOpen, close }: AddModalType) {
  const dispatch = useDispatch<any>();
  const {
    menace: { level: menaceLevel },
  } = useSelector((store: StoreType) => store);

  const defaultEnemy = ENEMIES.find((e) => e.id === "1");
  const [id, setId] = useState("0");
  const [name, setName] = useState(defaultEnemy.name);
  const [health, setHealth] = useState(defaultEnemy.health);
  const [shield, setShield] = useState(0);
  const [magic, setMagic] = useState(0);
  const [speed, setSpeed] = useState(defaultEnemy.speed);
  const [attack, setAttack] = useState(defaultEnemy.attack);
  const [cost, setCost] = useState(defaultEnemy.cost);

  useEffect(() => {
    setShield(0);
    setMagic(0);
  }, [isOpen]);

  const onSelectEnemy = (e) => {
    const enemy = ENEMIES.find((enemy) => enemy.id === e.target.value);
    setName(enemy.name || "");
    setHealth(enemy.health);
    setAttack(enemy.attack);
    setSpeed(enemy.speed);
    setCost(enemy.cost);
  };

  const addNewEnemy = () => {
    const enemy: EnemyType = {
      id,
      name,
      health: parseInt(health.toString()),
      shield: parseInt(shield.toString()),
      magic: parseInt(magic.toString()),
      speed: parseInt(speed.toString()),
      attack: parseInt(attack.toString()),
      baseMagic: parseInt(magic.toString()),
      baseShield: parseInt(shield.toString()),
      baseHealth: parseInt(health.toString()),
      cost: parseInt(cost.toString()),
    };
    dispatch(decreaseMenace(cost));
    dispatch(addEnemy(enemy));
    close();
  };

  const hasEnoughMenace = useMemo(() => cost <= menaceLevel, [cost, menaceLevel]);

  return (
    <Modal ariaHideApp={false} isOpen={isOpen} onRequestClose={close} style={{ content: { height: "max-content" } }}>
      <ModalContent>
        <Text>Adicionar Inimigo</Text>
        <Select onChange={onSelectEnemy}>
          {ENEMIES.map((enemy) => (
            <option key={enemy.id} value={enemy.id}>
              {enemy.name}
            </option>
          ))}
        </Select>
        <Text color="#FF6961">{`Custo de ameaça: ${cost}`}</Text>
        <Text>{`Ameaça atual: ${menaceLevel}`}</Text>
        <InputWrapper>
          <TextInput value={id} onChange={setId} label="Identificador" placeholder="0" type="number" />
          <TextInput value={health} onChange={setHealth} label="Vida" placeholder="0" type="number" />
        </InputWrapper>
        <InputWrapper>
          <TextInput value={attack} onChange={setAttack} label="Ataque" placeholder="0" type="number" />
          <TextInput value={speed} onChange={setSpeed} label="Velocidade" placeholder="0" type="number" />
        </InputWrapper>
        <InputWrapper>
          <TextInput value={shield} onChange={setShield} label="Escudo" placeholder="0" type="number" />
          <TextInput value={magic} onChange={setMagic} label="Magia" placeholder="0" type="number" />
        </InputWrapper>
        <Button onClick={hasEnoughMenace ? addNewEnemy : () => {}}>
          {hasEnoughMenace ? "ADICIONAR INIMIGO" : "SEM AMEAÇA SUFICIENTE"}
        </Button>
        <Button onClick={close} secondary>
          CANCELAR
        </Button>
      </ModalContent>
    </Modal>
  );
}
