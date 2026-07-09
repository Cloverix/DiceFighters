import type {Dice} from "./type/dice/Dice.ts";
import {FixedMap} from "./util/class/FixedMap.ts";
import emptyFaceDice from "./assets/sprite/dice/dice-6-side-empty.png";
import {cloneDice} from "./type/dice/cloneDice.ts";
import {useState} from "react";
import {BattleScreen} from "./component/BattleScreen/BattleScreen.tsx";
import {type GameState} from "./type/gameState/GameState.ts";
import {PlayerBuilder} from "./type/creature/Player.ts";
import {EnemyBuilder} from "./type/creature/Enemy.ts";
import goblinSprite from "./assets/sprite/creature/goblin.png"


function App() {
    const [hp, setHp] = useState(100);

    const damage = () => {
        setHp(Math.max(hp - 20, 0));
    }

    const heal = () => {
        setHp(Math.min(hp + 20, 100));
    }

    const dice: Dice = {faceCount: 6, equippedSpells: new FixedMap(6), sprite: emptyFaceDice};
    const dices: Dice[] = [];
    for (let i = 0; i < 3; i++) {
        dices.push(cloneDice(dice));
    }

    const player = new PlayerBuilder('player')
        .setDices(dices)
        .build();

    const enemy = new EnemyBuilder(1)
        .setDices(dices)
        .setSprite(goblinSprite)
        .build();

    const gameState: GameState = {
        player: player,
        enemy: enemy,
        currentTurn: 'player',
        logs: []
    }

  return (
      /*
      <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px'
      }}>
      </div>
       */
      <BattleScreen gameState={gameState}/>
  );
}

export default App;