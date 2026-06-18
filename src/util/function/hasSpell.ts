import type {Creature} from "../../type/creature/Creature.ts";
import type {Spell} from "../../type/spell/Spell.ts";
import type {Dice} from "../../type/dice/Dice.ts";

//Checks if creature has given spell equipped on any of its dices
export function hasSpell(creature: Creature, spellName: string): boolean {
    const dices: Dice[] = creature.dices.values;

    for (const dice of dices) {
        const equippedSpells: Spell[] = dice.equippedSpells.values;
        for (const spell of equippedSpells) {
            if (spell.name === spellName) return true;
        }
    }

    return false;
}