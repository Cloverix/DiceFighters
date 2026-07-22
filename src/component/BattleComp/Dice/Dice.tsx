import type {Dice} from "../../../type/dice/Dice.ts";
import './Dice.css'
import {useEffect, useRef} from "react";
import {type StartRollingFunc, useDiceRoll} from "../../../hook/useDiceRoll.ts";
import initialSprite from "../../../assets/sprite/dice/dice-face-1.png"

export type DiceProps = {
    dice: Dice,
    size?: number,
    //Callback to pass data about the roll to the parent
    onMount?: (diceId: number, startRolling: StartRollingFunc) => void,
    onUnmount?: (diceId: number) => void
}

export function Dice({dice, size = 64, onMount, onUnmount}: DiceProps) {
    const {sprite, scale, startRolling, cleanup} = useDiceRoll(dice, 1, initialSprite);
    const startRollingRef = useRef(startRolling);

    useEffect(() => {
        startRollingRef.current = startRolling;
    }, [startRolling]);

    useEffect(() => {
        if (onMount) {
            onMount(dice.id, startRollingRef.current);
        }
    }, [dice.id])

    useEffect(() => {
        return () => {
            if (onUnmount) {
                onUnmount(dice.id);
            }
            cleanup();
        };
    }, [dice.id, onUnmount, cleanup]);

    return (
        <div className='dice-container' style={{
            width: `${size}px`,
            height: `${size}px`,
            transform: `scale(${scale})`
        }}>
            <img className='dice-bg' alt='dice-bg' src={dice.sprite} style={{
                width: size,
                height: size
            }}/>
            <img className='spell-sprite' alt='spell-sprite' src={sprite} style={{
                width: size,
                height: size
            }}/>
        </div>
    )
}