import {useState} from "react";
import goblinSprite from "./assets/sprite/creature/goblin.png";
import {BattleScreen} from "./component/BattleScreen/BattleScreen.tsx";
import {EnemyBuilder} from "./type/creature/Enemy.ts";
import {PlayerBuilder} from "./type/creature/Player.ts";
import {type Dice, DiceBuilder} from "./type/dice/Dice.ts";
import {type GameState} from "./type/gameState/GameState.ts";

function App() {
  const [hp, setHp] = useState(100);

  const damage = () => {
    setHp(Math.max(hp - 20, 0));
  };

  const heal = () => {
    setHp(Math.min(hp + 20, 100));
  };

  const playerDices: Dice[] = [];
  const enemyDices: Dice[] = [];
  for (let i = 0; i < 3; i++) {
    playerDices.push(DiceBuilder.instance(6).build());
    console.log(`player dice id: ${playerDices[i].id}`);
  }
  for (let i = 0; i < 3; i++) {
    enemyDices.push(DiceBuilder.instance(6).build());
    console.log(`enemy dice id: ${enemyDices[i].id}`);
  }
  
  const player = new PlayerBuilder("player")
    .setDices(playerDices)
    .build();

  const enemy = new EnemyBuilder(1)
    .setDices(enemyDices)
    .setSprite(goblinSprite)
    .build();
  

  const gameState: GameState = {
    player: player,
    enemy: enemy,
    currentTurn: "player",
    currentRollResults: {
      player: new Map(playerDices.map(dice => [dice.id, 1])),
      enemy: new Map(enemyDices.map(dice => [dice.id, 1])),
    },
    logs: [],
  };

  return <BattleScreen gameState={gameState} />;
}

export default App;
