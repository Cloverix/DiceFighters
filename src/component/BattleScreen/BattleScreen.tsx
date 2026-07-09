import type {GameState} from "../../type/gameState/GameState.ts";
import "./BattleScreen.css"
import {use, useState} from "react";
import {CreatureAndDices} from "../CreatureAndDices/CreatureAndDices.tsx";
import {RollButton} from "../RollButton/RollButton.tsx";

type BattleScreenProps = {
    gameState: GameState
}

export function BattleScreen({gameState}: BattleScreenProps) {
    const [player, setPlayer] = useState(gameState.player);
    const [enemy, setEnemy] = useState(gameState.enemy);
    const [rollFunctions, setRollFunctions] = useState<(() => void)[]>([]);

    const playerDicesCallback = (functions: (() => void)[]) => {
        setRollFunctions(functions);
    }

    const handleRoll = () => {
        rollFunctions.forEach(fn => fn());
    }

    return (
        <div className='battle-screen-container'>
            <div className='creatures-row'>
                <CreatureAndDices creature={player} dices={player.dices} onRollFunctionsReady={playerDicesCallback}/>
                <CreatureAndDices creature={enemy} dices={player.dices}/>
            </div>
            <RollButton className='roll-player-dice-button' handleRoll={handleRoll}/>
        </div>
    )
}