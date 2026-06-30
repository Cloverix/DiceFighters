import type {SpellResult} from "../../type/spell/Spell.ts";

/**
 * Modifies spellResult for case when caster has Strength effect
 * @param spellResult - base spellResult
 * @return - modified spellResult
 */
export function strengthModifier(spellResult: SpellResult): SpellResult {
    if (!spellResult.damage) {
        return spellResult;
    }
    const newDamage = Math.round(spellResult.damage * 1.25);
    return {
        ...spellResult,
        damage: newDamage
    }
}