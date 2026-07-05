import {HealthBar} from "./component/HealthBar/HealthBar.tsx";
import {useState} from "react";
import {Creature} from "./component/Creature/Creature.tsx";
import {Dice as DiceComponent} from "./component/Dice/Dice.tsx";
import playerSprite from './assets/sprite/creature/player.png'
import goblinSprite from './assets/sprite/creature/goblin.png'
import goblinCorpseSprite from './assets/sprite/creature/goblin_corpse.png'
import type {Dice} from "./type/dice/Dice.ts";
import {FixedMap} from "./util/class/FixedMap.ts";
import emptyFaceDice from "./assets/sprite/dice/dice-6-sides-empty.png";


function App() {
    const [hp1, setHp1] = useState(100);

    const decreaseAll = () => {
        setHp1(prev => Math.max(0, prev - 20));
    }

    const increaseAll = () => {
        setHp1(prev => Math.min(100, prev + 20));
    }

    const dice: Dice = {faceCount: 6, equippedSpells: new FixedMap(6), sprite: emptyFaceDice};

  return (
      <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px'
      }}>
          <HealthBar hp={hp1} maxHp={100}/>
          <button onClick={decreaseAll}>
              Deal damage
          </button>
          <button onClick={increaseAll}>
              Heal
          </button>
          <Creature name={'player'} sprite={playerSprite}/>
          <Creature name={'goblin'} sprite={goblinSprite}/>
          <Creature name={'goblin-corpse'} sprite={goblinCorpseSprite}/>
          <DiceComponent dice={dice}/>
      </div>
  );
}

export default App;