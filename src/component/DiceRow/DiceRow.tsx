import type {Dice} from "../../type/dice/Dice.ts";
import {Dice as DiceComponent} from "../Dice/Dice.tsx";
import './DiceRow.css'
import {useRef} from "react";

export type DiceRowProps = {
    dices: Dice[],
    onRollFunctionsReady?: (functions: (() => void)[]) => void          //Passes functions to roll the dices to parent
}

export function DiceRow({dices, onRollFunctionsReady}: DiceRowProps) {
    const defaultSize = 64;
    const padding = 8;

    const rollFunctions = useRef<(() => void)[]>([]);
    const functionsCount = useRef(0);

    const onDiceMount = (startRolling: () => void) => {
        rollFunctions.current.push(startRolling);
        functionsCount.current += 1;
        if (functionsCount.current === dices.length && onRollFunctionsReady) {
            onRollFunctionsReady(rollFunctions.current);
        }
    }

    return (
        <div className='dice-row-container' style={{
            padding: `${padding}px`,
            gap: `${padding}px`
        }}>
            {dices.map((dice, index) => {
                return <DiceComponent key={`dice-${index + 1}`} dice={dice} size={defaultSize} onMount={onDiceMount}/>
            })}
        </div>
    )
}