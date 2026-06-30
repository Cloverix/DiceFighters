import type {SpellResult} from "../../type/spell/Spell.ts";

/**
 * Modifies spellResult for case when target has Defence down effect
 * @param spellResult - base spellResult
 * @param stackCount - stack count of the Defence down effect
 * @return - modified spellResult
 */
export function defenceDownModifier(spellResult: SpellResult, stackCount: number): SpellResult {
    if (!spellResult.damage) {
        return spellResult;
    }
    const newDamage = Math.max(0, spellResult.damage + stackCount);
    return {
        ...spellResult,
        damage: newDamage
    }
}