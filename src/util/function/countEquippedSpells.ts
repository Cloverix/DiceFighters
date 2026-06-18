import type {Creature} from "../../type/creature/Creature.ts";
import type {Dice} from "../../type/dice/Dice.ts";

export function countEquippedSpells(creature: Creature): number {
    const dices: Dice[] = creature.dices.values;
    let spellCount = 0;
    dices.forEach(dice => spellCount += dice.equippedSpells.values.length);
    return spellCount;
}