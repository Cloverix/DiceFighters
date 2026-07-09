import type {Dice} from "../../type/dice/Dice.ts";
import type {Spell} from "../../type/spell/Spell.ts";
import {spellName} from "../../assets/string/spell/spellName.ts";
import {getEquippedSpell} from "./getEquippedSpell.ts";
import diceFaceOne from '../../assets/sprite/dice/dice-face-1.png';
import diceFaceTwo from '../../assets/sprite/dice/dice-face-2.png';
import diceFaceThree from '../../assets/sprite/dice/dice-face-3.png';
import diceFaceFour from '../../assets/sprite/dice/dice-face-4.png';
import diceFaceFive from '../../assets/sprite/dice/dice-face-5.png';
import diceFaceSix from '../../assets/sprite/dice/dice-face-6.png';

/**
 * Get sprite of the spell by roll result.
 * If no spell is equipped on the chosen slot, return sprite of numeric dice face.
 * If rollResult is out of bounds or spell doesn't have a sprite, return an empty 6-faced dice sprite.
 * @param dice - dice to use
 * @param rollResult - slot to take spell sprite from
 */
export function getSpellSpriteByRollResult(dice: Dice, rollResult: number): string | null {
    const spell: Spell = getEquippedSpell(dice, rollResult);

    if (spell.name === spellName.strike) {
        switch (rollResult) {
            case 1: return diceFaceOne;
            case 2: return diceFaceTwo;
            case 3: return diceFaceThree;
            case 4: return diceFaceFour;
            case 5: return diceFaceFive;
            case 6: return diceFaceSix;
            default: return null;
        }
    }
    else {
        return spell.sprite ?? null;
    }
}