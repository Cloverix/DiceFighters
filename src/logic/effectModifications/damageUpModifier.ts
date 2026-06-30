import type {SpellResult} from "../../type/spell/Spell.ts";

/**
 * Modifies spellResult for case when caster has Damage up effect
 * @param spellResult - base spellResult
 * @param stackCount - stack count of the Damage up effect
 * @return - modified spellResult
 */
export function damageUpModifier(spellResult: SpellResult, stackCount: number): SpellResult {
    if (!spellResult.damage) {
        return spellResult;
    }
    const newDamage = Math.max(0, spellResult.damage + stackCount);
    return {
        ...spellResult,
        damage: newDamage
    }
}