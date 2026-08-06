import {type GameState} from "../../../type/gameState/GameState.ts";
import "./BattleScreen.css"
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {CreatureAndDices} from "../CreatureAndDices/CreatureAndDices.tsx";
import {RollButton} from "../RollButton/RollButton.tsx";
import {useGameLoop} from "../../../hook/useGameLoop.ts";
import type {StartRollingFunc} from "../../../hook/useDiceRoll.ts";
import {useRollButton} from "../../../hook/useRollButton.ts";
import { Inventory } from "../../InventoryComp/Inventory/Inventory.tsx";
import { LootScreen } from "../../LootComp/LootScreen/LootScreen.tsx";
import type { Spell } from "../../../type/spell/Spell.ts";
import { selectLootOptions } from "../../../util/function/selectLootOptions.ts";
import { useLootGrabAnimation } from "../../../hook/useLootGrabAnimation.ts";
import { InventoryButton } from "../../Shared/InventroyButton/InventoryButton.tsx";
import { LOOT_COUNT } from "../../../assets/constants/numericConstants.ts";

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
        handleUnequipSpell,
        handleAddToInventory
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

    //const inventoryButtonRef = useRef<HTMLDivElement | null>(null);

    const [chosenLootEl, setChosenLootEl] = useState<HTMLDivElement | null>(null);
    const chosenLootRef = useCallback((el: HTMLDivElement | null) => {
        setChosenLootEl(el);
    }, []);

    const [inventoryButtonEl, setInventoryButtonEl] = useState<HTMLDivElement | null>(null);
    const inventoryButtonRef = useCallback((el: HTMLDivElement | null) => {
        setInventoryButtonEl(el);
    }, []);

    const [isNewInventory, setIsNewInventory] = useState(false);

    const animationTimeSec = useMemo(() => 0.5, []);
    
    const {
        translateX,
        translateY,
        lootRotate,
        lootScale,
        lootOpacity,
        otherRotateY,
        inventoryScale,
        startAnimation
    } = useLootGrabAnimation(chosenLootEl, inventoryButtonEl, animationTimeSec, () => setIsNewInventory(true));



    //TODO: all below is for testing
    const [isInventoryOpen, setIsInventoryOpen] = useState(false);
    const [isLootOpen, setIsLootOpen] = useState(false);

    console.log(`isLootOpen: ${state.battleStatus === 'playerWon'}`);

    const [lootList, setLootList] = useState<Spell[]>([]);
    
    useEffect(() => {
        if (state.battleStatus === 'playerWon') {
            const timeoutId = setTimeout(() => setIsLootOpen(true), animationTimeSec * 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [state.battleStatus, animationTimeSec, isLootOpen]);
    
    useEffect(() => {
        if (state.battleStatus === 'playerWon') {
            setLootList(selectLootOptions(LOOT_COUNT));
        }
    }, [state.battleStatus]);

    return (
        <div className="battle-screen-root">
            <div className={`align-to-screen-center ${isInventoryOpen ? 'in-background' : ''}`}>
                {isLootOpen
                ? <LootScreen
                    lootList={lootList}
                    className={`align-to-screen-center ${isInventoryOpen ? 'in-background' : ''}`}
                    startAnimation={startAnimation}
                    onChoiceDone={chosenLootRef}
                    chosenItemStyle={{
                        transform: `translate(${translateX}px, ${translateY}px) rotate(${lootRotate}rad) scale(${lootScale})`,
                        opacity: lootOpacity,
                        pointerEvents: 'none',
                        transition: `transform ${animationTimeSec}s ease-in, scale ${animationTimeSec}s ease-in`
                    }}
                    itemDisappearStyle={{
                        transform: `rotateY(${otherRotateY}rad)`,
                        transition: `transform ${animationTimeSec}s ease-in`
                    }}
                />
                : <div className="battle-screen-container">
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
                }
            </div>
            {isInventoryOpen && (
                <Inventory player={state.player} onEquip={handleEquipSpell} onUnequip={handleUnequipSpell}/>
            )}
            <InventoryButton
                isOpened={false}
                newIndicator={isNewInventory}
                onClick={() => {
                    setIsNewInventory(false)
                    setIsInventoryOpen(!isInventoryOpen)
                }}
                innerRef={inventoryButtonRef}
                style={{
                    scale: inventoryScale,
                    position: 'fixed',
                    top: '85vh',
                    left: '90vw'
                }}
            />
        </div>
    )
}