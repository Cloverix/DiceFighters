import {DiceRow} from "../DiceRow/DiceRow.tsx";
import './CreatureAndDices.css'
import type {Dice} from "../../type/dice/Dice.ts";
import {type ComponentPropsWithoutRef, useCallback, useEffect} from "react";
import type {Creature} from "../../type/creature/Creature.ts";
import {Creature as CreatureComponent} from "../Creature/Creature.tsx";
import {HealthBar} from "../HealthBar/HealthBar.tsx";
import type {StartRollingFunc} from "../../hook/useDiceRoll.ts";
import {useCreatureAnimation} from "../../hook/useCreatureAnimation.ts";
import {isPlayer} from "../../util/function/isPlayer.ts";

type CreatureAndDicesProps = {
    creature: Creature,
    dices: Dice[],
    //Passes data to parent
    passAftercastAnimation?: (animationFunc: () => void) => void
    onDicesMount?: (functions: Map<number, StartRollingFunc>) => void,
    onDicesUnmount?: (functions: Map<number, StartRollingFunc>) => void
} & ComponentPropsWithoutRef<'div'>

export function CreatureAndDices({creature, dices, onDicesMount, onDicesUnmount, passAftercastAnimation}: CreatureAndDicesProps) {
    const {offsetX, triggerCastAnimation, cleanup} = useCreatureAnimation(isPlayer(creature) ? 'player' : 'enemy');

    useEffect(() => {
        if (passAftercastAnimation) {
            passAftercastAnimation(triggerCastAnimation);
        }
    }, [passAftercastAnimation, triggerCastAnimation]);

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

    useEffect(() => {
        return cleanup;
    }, [cleanup]);

    return (
        <div className='creature-and-dices-container'>
            <CreatureComponent name={creature.name} sprite={creature.sprite} style={{
                transform: `translateX(${offsetX}px)`
            }}/>
            <HealthBar hp={creature.hp} maxHp={creature.maxHp}/>
            <DiceRow dices={dices} onDicesMount={diceRowMountCallback} onDicesUnmount={diceRowUnmountCallback}/>
        </div>
    )
}