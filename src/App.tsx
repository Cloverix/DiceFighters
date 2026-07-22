import { useMemo } from "react";
import goblinSprite from "./assets/sprite/creature/goblin.png";
import { spellName } from "./assets/string/spell/spellName.ts";
import { BattleScreen } from "./component/BattleComp/BattleScreen/BattleScreen.tsx";
import { DiceInventory } from "./component/InventoryComp/DiceInventory/DiceInventory.tsx";
import { DiceSlot } from "./component/InventoryComp/DiceSlot/DiceSlot.tsx";
import { InventoryStorage } from "./component/InventoryComp/InventoryStorage/InventoryStorage.tsx";
import { EnemyBuilder } from "./type/creature/Enemy.ts";
import { PlayerBuilder } from "./type/creature/Player.ts";
import { type Dice, DiceBuilder } from "./type/dice/Dice.ts";
import { type GameState } from "./type/gameState/GameState.ts";
import type { Inventory } from "./type/inventory/Inventory.ts";
import type { Spell } from "./type/spell/Spell.ts";
import { spellList } from "./type/spell/spellList.ts";
import { Inventory as InventoryComponent } from "./component/InventoryComp/Inventory/Inventory.tsx";

function App() {
    
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

    const spells: Spell[] = [];
    for (let i = 0; i < 10; i++) {
        spells.push(spellList[spellName.heavyBlow]);
    }

    const inventory: Inventory = {
        storedSpells: spells
    }

    const player = new PlayerBuilder("player")
        .setDices(playerDices)
        .setInventory(inventory)
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

    //return <BattleScreen gameState={gameState} />;


    const dice: Dice = useMemo(() => DiceBuilder.instance(6).build(), []);
    
    /*
    return (
        <div className='root-el' style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        }}>
            <InventoryStorage inventory={inventory}/>
            <DiceSlot slot={1} spell={null}/>
            <DiceInventory dice={dice}/>
        </div>
    )
    */

    return <InventoryComponent player={player}/>
}

export default App;
