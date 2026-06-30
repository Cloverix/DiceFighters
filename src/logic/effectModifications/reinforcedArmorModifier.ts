import type {SpellResult} from "../../type/spell/Spell.ts";

/**
 * Modifies spellResult for case when target has Reinforced armor effect
 * @param spellResult - base spellResult
 * @return - modified spellResult
 */
export function reinforcedArmorModifier(spellResult: SpellResult): SpellResult {
    if (!spellResult.damage) {
        return spellResult;
    }
    const newDamage = Math.round(spellResult.damage * 0.75);
    return {
        ...spellResult,
        damage: newDamage
    }
}