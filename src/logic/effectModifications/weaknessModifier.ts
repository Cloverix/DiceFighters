import type {SpellResult} from "../../type/spell/Spell.ts";

/**
 * Modifies spellResult for case when caster has Weakness effect
 * @param spellResult - base spellResult
 * @return - modified spellResult
 */
export function weaknessModifier(spellResult: SpellResult): SpellResult {
    if (!spellResult.damage) {
        return spellResult;
    }
    const newDamage = Math.round(spellResult.damage * 0.75);
    return {
        ...spellResult,
        damage: newDamage
    }
}