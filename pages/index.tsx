import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../components/Button/Button";
import TabEnemies from "../components/TabEnemies/TabEnemies";
import TabHeroes from "../components/TabHeroes/TabHeroes";
import TabMenace from "../components/TabMenace/TabMenace";
import { Text } from "../components/Text/Text";
import { THEME } from "../constants/theme";
import { useStopwatch } from "react-timer-hook";
import { ButtonsWrapper, Counter, Header, Main, Tab, TabRow } from "../styles/Home.styled";
import { useDispatch, useSelector } from "react-redux";
import StoreType from "../types/StoreType";
import { pauseGame, startGame, stopGame, updateTime } from "../config/gameSlice";
import { restoreEnemiesState } from "../config/enemySlice";
import { restoreHeroesState } from "../config/heroSlice";
import { restoreMenaceState } from "../config/menaceSlice";

export default function Home() {
  const dispatch = useDispatch<any>();
  const {
    hero: { heroes },
    game: { hasActiveGame, hours: currentHours, minutes: currentMinutes, isRunning: isGameRunning },
  } = useSelector((store: StoreType) => store);

  const offsetTimestamp = useMemo(() => {
    const stopwatchOffset = new Date();
    stopwatchOffset.setMinutes(stopwatchOffset.getMinutes() + currentMinutes);
    stopwatchOffset.setHours(stopwatchOffset.getHours() + currentHours);
    return stopwatchOffset;
  }, [currentMinutes, currentHours]);

  const [activeTab, setActiveTab] = useState<1 | 2 | 3>(1);
  const { seconds, minutes, hours, isRunning, start, pause, reset } = useStopwatch({
    autoStart: isGameRunning,
    offsetTimestamp,
  });

  useEffect(() => {
    dispatch(updateTime({ minutes, hours, isRunning }));
  }, [minutes, hours, isRunning, dispatch]);

  const gameStart = () => {
    if (heroes.length === 0) {
      alert("Adicione ao menos um Herói");
      return;
    }
    start();
    dispatch(startGame());
  };

  const gamePause = () => {
    pause();
    dispatch(pauseGame());
  };

  const gameStop = () => {
    const shouldStop = confirm("Tem certeza que quer encerrar esta partida?");
    if (!shouldStop) return;
    reset();
    pause();
    dispatch(stopGame());
    dispatch(restoreEnemiesState());
    dispatch(restoreHeroesState());
    dispatch(restoreMenaceState());
  };

  return (
    <>
      <Head>
        <title>Jornadas</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#55683F" />
        <meta name="description" content="Jornadas na Terra Média" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Main>
        <Header>
          <Text color={THEME.chip}>Tempo de jogo</Text>
          <Counter>{`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`}</Counter>
          {!hasActiveGame && <Button onClick={gameStart}>NOVA PARTIDA</Button>}
          {hasActiveGame && isGameRunning && (
            <ButtonsWrapper>
              <Button onClick={gamePause}>PAUSAR</Button>
              <Button onClick={gameStop}>PARAR</Button>
            </ButtonsWrapper>
          )}
          {hasActiveGame && !isGameRunning && (
            <ButtonsWrapper>
              <Button onClick={gameStart}>CONTINUAR</Button>
              <Button onClick={gameStop}>PARAR</Button>
            </ButtonsWrapper>
          )}
        </Header>
        <TabRow>
          <Tab isActive={activeTab === 1} onClick={() => setActiveTab(1)}>
            Inimigos
          </Tab>
          <Tab isActive={activeTab === 2} onClick={() => setActiveTab(2)}>
            Heróis
          </Tab>
          <Tab isActive={activeTab === 3} onClick={() => setActiveTab(3)}>
            Ameaça
          </Tab>
        </TabRow>
        {activeTab === 1 && <TabEnemies />}
        {activeTab === 2 && <TabHeroes />}
        {activeTab === 3 && <TabMenace />}
      </Main>
    </>
  );
}
