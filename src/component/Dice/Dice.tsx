import type {Dice} from "../../type/dice/Dice.ts";
import './Dice.css'
import {useEffect} from "react";
import {useDiceRoll} from "../../hook/useDiceRoll.ts";
import initialSprite from "../../assets/sprite/dice/dice-face-1.png"

export type DiceProps = {
    dice: Dice,
    size?: number,
    onMount?: (startRolling: () => void) => void             //Callback to pass startRolling function to the parent
}

export function Dice({dice, size = 64, onMount}: DiceProps) {
    const {sprite, scale, startRolling, cleanup} = useDiceRoll(dice, 1, initialSprite);

    useEffect(() => {
        if (onMount) {
            onMount(startRolling);
        }
    }, [onMount, startRolling])

    useEffect(() => {
        return cleanup;
    }, [cleanup]);

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