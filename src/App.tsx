import {type Dice, DiceBuilder} from "./type/dice/Dice.ts";
import {FixedMap} from "./util/class/FixedMap.ts";
import emptyFaceDice from "./assets/sprite/dice/dice-6-side-empty.png";
import {cloneDice} from "./type/dice/cloneDice.ts";
import {useMemo, useState} from "react";
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

    /*
    const dice: Dice = useMemo(() => {
        return {faceCount: 6, equippedSpells: new FixedMap(6), sprite: emptyFaceDice}
    }, []);
    */
    let diceIdCounter = 0;
    const playerDices: Dice[] = useMemo(() => {
        const list: Dice[] = [];
        while (diceIdCounter < 3) {
            const newDice = new DiceBuilder(diceIdCounter, 6).build();
            list.push(newDice);
            diceIdCounter++;
        }
        console.log('player dices created');
        return list;
    }, []);

    const enemyDices: Dice[] = useMemo(() => {
        const list: Dice[] = [];
        while (diceIdCounter < 6) {
            const newDice = new DiceBuilder(diceIdCounter, 6).build();
            list.push(newDice);
            diceIdCounter++;
        }
        console.log('enemy dices created');
        return list;
    }, [])

    const player = new PlayerBuilder('player')
        .setDices(playerDices)
        .build();

    const enemy = new EnemyBuilder(1)
        .setDices(enemyDices)
        .setSprite(goblinSprite)
        .build();

    const gameState: GameState = {
        player: player,
        enemy: enemy,
        currentTurn: 'player',
        currentRollResults: {
            player: [1, 1, 1],
            enemy: [1, 1, 1]
        },
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