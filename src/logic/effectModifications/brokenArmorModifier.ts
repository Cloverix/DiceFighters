import type {SpellResult} from "../../type/spell/Spell.ts";

/**
 * Modifies spellResult for case when target has Broken armor effect
 * @param spellResult - base spellResult
 * @return - modified spellResult
 */
export function brokenArmorModifier(spellResult: SpellResult): SpellResult {
    if (!spellResult.damage) {
        return spellResult;
    }
    const newDamage = Math.round(spellResult.damage * 1.25);
    return {
        ...spellResult,
        damage: newDamage
    }
}