import {DiceRow} from "../DiceRow/DiceRow.tsx";
import './CreatureAndDices.css'
import type {Dice} from "../../type/dice/Dice.ts";
import {type ComponentPropsWithoutRef} from "react";
import type {Creature} from "../../type/creature/Creature.ts";
import {Creature as CreatureComponent} from "../Creature/Creature.tsx";

type CreatureAndDicesProps = {
    creature: Creature,
    dices: Dice[],
    onRollFunctionsReady?: (functions: (() => void)[]) => void          //Passes functions to roll the dices to parent
} & ComponentPropsWithoutRef<'div'>

export function CreatureAndDices({creature, dices, onRollFunctionsReady}: CreatureAndDicesProps) {
    const diceRowCallback = (functions: (() => void)[]) => {
        if (onRollFunctionsReady) {
            onRollFunctionsReady(functions);
        }
    }

    return (
        <div className='creature-and-dices-container'>
            <CreatureComponent name={creature.name} sprite={creature.sprite}/>
            <DiceRow dices={dices} onRollFunctionsReady={diceRowCallback}/>
        </div>
    )
}