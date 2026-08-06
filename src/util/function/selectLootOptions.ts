import { spellName } from "../../assets/string/spell/spellName";
import type { Spell } from "../../type/spell/Spell";
import { spellList } from "../../type/spell/spellList";

/**
 * Get a list of different random spells that are dropped after a fight
 * @param count count of selected spells
*/
export function selectLootOptions(count: number = 3): Spell[] {
    const actualCount: number = Math.min(count, Object.entries(spellList).length);
    const allowedSpells: Spell[] = Object.values(spellList).filter(spell => spell.name !== spellName.strike);
    const shuffled: Spell[] = allowedSpells.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, actualCount);
}