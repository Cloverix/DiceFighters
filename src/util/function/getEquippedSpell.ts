import type {Dice} from "../../type/dice/Dice.ts";
import type {Spell} from "../../type/spell/Spell.ts";
import {spellList} from "../../type/spell/spellList.ts";
import {spellName} from "../../assets/string/spell/spellName.ts";

//Get spell on this dice by slot (usually the value from dice throw)
//If none is equipped, returns the Strike spell
//!! slot is 1-indexed, but get() method is called with slot - 1 parameter because data in FixedMap is 0-indexed
export function getEquippedSpell(dice: Dice, slot: number): Spell {
    const spell: Spell | null = dice.equippedSpells.get(slot - 1);
    return spell === null ? spellList[spellName.strike] : spell;
}