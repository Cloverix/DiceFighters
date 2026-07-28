import {type GameState} from "../../../type/gameState/GameState.ts";
import "./BattleScreen.css"
import {useCallback, useRef, useState} from "react";
import {CreatureAndDices} from "../CreatureAndDices/CreatureAndDices.tsx";
import {RollButton} from "../RollButton/RollButton.tsx";
import {useGameLoop} from "../../../hook/useGameLoop.ts";
import type {StartRollingFunc} from "../../../hook/useDiceRoll.ts";
import {useRollButton} from "../../../hook/useRollButton.ts";
import { Inventory } from "../../InventoryComp/Inventory/Inventory.tsx";

type BattleScreenProps = {
    gameState: GameState
}

export function BattleScreen({gameState}: BattleScreenProps) {
    const {
        state,
        updateRollResults,
        handleTakeTurn,
        handleEndBattle,
        handleEquipSpell,
        handleUnequipSpell
    } = useGameLoop(gameState);

    const [playerRollFunctions, setPlayerRollFunctions] =
        useState<Map<number, StartRollingFunc>>(new Map<number, StartRollingFunc>());
    const [enemyRollFunctions, setEnemyRollFunctions] =
        useState<Map<number, StartRollingFunc>>(new Map<number, StartRollingFunc>());

    const playerAftercastAnim = useRef<(() => void) | undefined>(undefined);
    const enemyAftercastAnim = useRef<(() => void) | undefined>(undefined);

    const passPlayerAftercastAnim = (animationFunc: () => void) => {
        playerAftercastAnim.current = animationFunc;
    }

    const passEnemyAftercastAnim = (animationFunc: () => void) => {
        enemyAftercastAnim.current = animationFunc;
    }

    const {disabled, onRollClick} = useRollButton(
        updateRollResults,
        handleTakeTurn,
        () => playerAftercastAnim.current?.(),
        () => enemyAftercastAnim.current?.()
    );

    const onClick = useCallback(() => {
        onRollClick(playerRollFunctions, enemyRollFunctions);
    }, [onRollClick, playerRollFunctions, enemyRollFunctions]);


    //TODO: for testing
    const [isInventoryOpen, setIsInventoryOpen] = useState(false);

    return (
        <div className="battle-screen-root">
            <div className={`battle-screen-container ${isInventoryOpen ? 'in-background' : ''}`}>
                <div className='creatures-row'>
                    <CreatureAndDices
                        creature={state.player}
                        dices={state.player.dices}
                        passAftercastAnimation={passPlayerAftercastAnim}
                        onDicesMount={setPlayerRollFunctions}
                        onDicesUnmount={setPlayerRollFunctions}
                    />
                    <CreatureAndDices
                        creature={state.enemy}
                        dices={state.enemy.dices}
                        passAftercastAnimation={passEnemyAftercastAnim}
                        onDicesMount={setEnemyRollFunctions}
                        onDicesUnmount={setEnemyRollFunctions}
                    />
                </div>
                <RollButton className='roll-dice-button' onClick={onClick} disabled={disabled}/>
            </div>
            {isInventoryOpen && (
                <Inventory player={state.player} onEquip={handleEquipSpell} onUnequip={handleUnequipSpell}/>
            )}
        </div>
    )
}