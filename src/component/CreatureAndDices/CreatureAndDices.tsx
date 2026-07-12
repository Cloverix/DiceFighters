import {DiceRow} from "../DiceRow/DiceRow.tsx";
import './CreatureAndDices.css'
import type {Dice} from "../../type/dice/Dice.ts";
import {type ComponentPropsWithoutRef, useCallback} from "react";
import type {Creature} from "../../type/creature/Creature.ts";
import {Creature as CreatureComponent} from "../Creature/Creature.tsx";
import {HealthBar} from "../HealthBar/HealthBar.tsx";
import type {StartRollingFunc} from "../../hook/useDiceRoll.ts";

type CreatureAndDicesProps = {
    creature: Creature,
    dices: Dice[],
    //Passes data to parent
    onDicesMount?: (functions: Map<number, StartRollingFunc>) => void,
    onDicesUnmount?: (functions: Map<number, StartRollingFunc>) => void
} & ComponentPropsWithoutRef<'div'>

export function CreatureAndDices({creature, dices, onDicesMount, onDicesUnmount}: CreatureAndDicesProps) {
    const diceRowMountCallback = useCallback((
        functions: Map<number, StartRollingFunc>
    ) => {
        if (onDicesMount) {
            onDicesMount(new Map(functions));
        }
    }, [onDicesMount]);

    const diceRowUnmountCallback = useCallback((
        functions: Map<number, StartRollingFunc>
    ) => {
        if (onDicesUnmount) {
            onDicesUnmount(new Map(functions))
        }
    }, [onDicesUnmount]);

    return (
        <div className='creature-and-dices-container'>
            <CreatureComponent name={creature.name} sprite={creature.sprite}/>
            <HealthBar hp={creature.hp} maxHp={creature.maxHp}/>
            <DiceRow dices={dices} onDicesMount={diceRowMountCallback} onDicesUnmount={diceRowUnmountCallback}/>
        </div>
    )
}