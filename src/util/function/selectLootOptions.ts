import { spellName } from "../../assets/string/spell/spellName";
import type { Spell } from "../../type/spell/Spell";
import { spellList } from "../../type/spell/spellList";
import { getRandomInt } from "./getRandomInt";

/**
 * Get a list of different random spells that are dropped after a fight
 * @param count count of selected spells
 */
export function selectLootOptions(count: number = 3): Spell[] {
    const allSpellNames: string[] = Object.keys(spellName);
    const randomSpells: Set<Spell> = new Set();
    count = Math.min(count, allSpellNames.length);

    while (randomSpells.size < count) {
        const randomName: string = allSpellNames[getRandomInt(0, allSpellNames.length - 1)];
        randomSpells.add(spellList[randomName]);
    }

    return [...randomSpells.values()];
}