import type {Spell} from "../type/spell/Spell.ts";
import {spellList} from "../type/spell/spellList.ts";
import {getRandomInt} from "../util/function/getRandomInt.ts";

/**
 * Gives a list of spells that the player may choose their new spell from after win in battle.
 * @param count - quantity of offered spells
 * @return - a list of spells for the player to choose from
 */
export function offerSpellOptions(count: number): Spell[] {
    const allSpells: Spell[] = Object.values(spellList);
    const allSpellsCount = allSpells.length;
    const randomSpells: Set<Spell> = new Set<Spell>();

    while (randomSpells.size < Math.min(count, allSpellsCount)) {
        const randomIndex = getRandomInt(0, allSpellsCount - 1);
        randomSpells.add(allSpells[randomIndex]);
    }

    return [...randomSpells];
}