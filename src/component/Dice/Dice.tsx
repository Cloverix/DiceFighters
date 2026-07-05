import type {Dice} from "../../type/dice/Dice.ts";
import {useSpellSprite} from "../../hook/useSpellSprite.ts";
import diceFaceOne from "../../assets/sprite/dice/dice-face-1.png";

import './Dice.css'

type DiceProps = {
    dice: Dice,
    size?: number
}

export function Dice(props: DiceProps) {
    const dice: Dice = props.dice;
    const size: number = props.size ?? 128;
    const initialSprite: string = dice.equippedSpells.get(0)?.sprite ?? diceFaceOne;
    const {sprite, finalRollResult, startRolling, cleanup} = useSpellSprite(dice, 1, initialSprite);

    //TODO: remove 'temp' and 'roll-button' elements, make one button for all the rolling in a different component
    return (
        <div className='temp'>
            <div className='dice-container'>
                <img className='dice-bg' alt='dice-bg' src={dice.sprite} style={{
                    width: size,
                    height: size
                }}/>
                <img className='spell-sprite' alt='spell-sprite' src={sprite} style={{
                    width: size,
                    height: size
                }}/>
            </div>
            <button className='roll-button' onClick={startRolling}>
                Roll!
            </button>
        </div>
    )
}