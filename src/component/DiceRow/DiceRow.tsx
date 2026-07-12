import type {Dice} from "../../type/dice/Dice.ts";
import {Dice as DiceComponent} from "../Dice/Dice.tsx";
import './DiceRow.css'
import {useCallback, useRef} from "react";
import type {StartRollingFunc} from "../../hook/useDiceRoll.ts";

export type DiceRowProps = {
    dices: Dice[],
    //Passes data to parent
    onDicesMount?: (functions: Map<number, StartRollingFunc>) => void,
    onDicesUnmount?: (functions: Map<number, StartRollingFunc>) => void
}

export function DiceRow({dices, onDicesMount, onDicesUnmount}: DiceRowProps) {
    const defaultSize = 64;
    const padding = 8;

    const rollFunctions =
        useRef<Map<number, StartRollingFunc>>(new Map<number, StartRollingFunc>);       //key is dice id
    const functionsCount = useRef(0);

    const onDiceMount = useCallback((diceId: number, startRolling: StartRollingFunc) => {
        rollFunctions.current.set(diceId, startRolling);
        functionsCount.current++;
        if (onDicesMount && functionsCount.current === dices.length) {
            onDicesMount(new Map(rollFunctions.current));
        }
    }, [dices.length, onDicesMount])

    const onDiceUnmount = useCallback((diceId: number) => {
        rollFunctions.current.delete(diceId);
        functionsCount.current--;
        if (onDicesUnmount) {
            onDicesUnmount(new Map(rollFunctions.current));
        }
    }, [onDicesUnmount])

    return (
        <div className='dice-row-container' style={{
            padding: `${padding}px`,
            gap: `${padding}px`
        }}>
            {dices.map(dice => {
                return <DiceComponent
                    key={dice.id}
                    dice={dice}
                    size={defaultSize}
                    onMount={onDiceMount}
                    onUnmount={onDiceUnmount}
                />
            })}
        </div>
    )
}