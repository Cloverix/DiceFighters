import { useCallback, useMemo, useRef, useState } from "react";
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
import { LootSlot } from "./component/LootComp/LootSlot/LootSlot.tsx";
import { LootRow } from "./component/LootComp/LootRow/LootRow.tsx";
import { selectLootOptions } from "./util/function/selectLootOptions.ts";
import { LootScreen } from "./component/LootComp/LootScreen/LootScreen.tsx";
import { InventoryButton } from "./component/Shared/InventroyButton/InventoryButton.tsx";
import { useLootGrabAnimation } from "./hook/useLootGrabAnimation.ts";

function App() {
    const playerDices: Dice[] = [];
    const enemyDices: Dice[] = [];
    for (let i = 0; i < 2; i++) {
        playerDices.push(DiceBuilder.instance(6).build());
        console.log(`player dice id: ${playerDices[i].id}`);
    }
    for (let i = 0; i < 3; i++) {
        enemyDices.push(DiceBuilder.instance(6).build());
        console.log(`enemy dice id: ${enemyDices[i].id}`);
    }

    const spells: Spell[] = [];
    for (let i = 0; i < 3; i++) {
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
        .setHp(1)
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

    return <BattleScreen gameState={gameState}/>

    /*
    const spell: Spell = useMemo(() => spellList[spellName.heavyBlow], []);
    const lootList = useMemo(() => [spell, spell, spell], [spell]);

    const [isOpened, setIsOpened] = useState(false);
    const onClick = useCallback(() => {
        setIsOpened(!isOpened);
    }, [isOpened]);

    return <div style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <LootScreen lootList={lootList}/>
    </div>
    */
}

export default App;
