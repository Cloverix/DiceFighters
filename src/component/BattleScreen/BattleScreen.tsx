    import {type GameState} from "../../type/gameState/GameState.ts";
    import "./BattleScreen.css"
    import {useCallback, useState} from "react";
    import {CreatureAndDices} from "../CreatureAndDices/CreatureAndDices.tsx";
    import {RollButton} from "../RollButton/RollButton.tsx";
    import {useGameLoop} from "../../hook/useGameLoop.ts";
    import type {StartRollingFunc} from "../../hook/useDiceRoll.ts";
    import { useRollButton } from "../../hook/useRollButton.ts";

    type BattleScreenProps = {
        gameState: GameState
    }

    export function BattleScreen({gameState}: BattleScreenProps) {
        const {state, updateRollResults, handleTakeTurn, handleEndBattle} = useGameLoop(gameState);

        const [playerRollFunctions, setPlayerRollFunctions] =
            useState<Map<number, StartRollingFunc>>(new Map<number, StartRollingFunc>());
        const [enemyRollFunctions, setEnemyRollFunctions] =
            useState<Map<number, StartRollingFunc>>(new Map<number, StartRollingFunc>());

        //const [rollButtonDisabled, setRollButtonDisabled] = useState(false);

        const {disabled, onRollClick} = useRollButton(updateRollResults, handleTakeTurn);

        const onClick = useCallback(() => {
            onRollClick(playerRollFunctions, enemyRollFunctions);
        }, [onRollClick, playerRollFunctions, enemyRollFunctions]);

        /*
        const onRollClick = () => {
            const playerRollResults: number[] = [];
            let resultsCount = 0;

            setRollButtonDisabled(true);
            playerRollFunctions.forEach((fn, index) => {
                fn(1200, (result: number) => {
                    playerRollResults[index] = result;
                    resultsCount++;
                    if (resultsCount === playerRollFunctions.size) {
                        updateRollResults(playerRollResults, 'player');
                        handleTakeTurn();
                    }
                });
            });
            setRollButtonDisabled(false);
        }
        */

        return (
            <div className='battle-screen-container'>
                <div className='creatures-row'>
                    <CreatureAndDices
                        creature={state.player}
                        dices={state.player.dices}
                        onDicesMount={setPlayerRollFunctions}
                        onDicesUnmount={setPlayerRollFunctions}
                    />
                    <CreatureAndDices
                        creature={state.enemy}
                        dices={state.enemy.dices}
                        onDicesMount={setEnemyRollFunctions}
                        onDicesUnmount={setEnemyRollFunctions}
                    />
                </div>
                <RollButton className='roll-dice-button' onClick={onClick} disabled={disabled}/>
            </div>
        )
    }