import type {SpellResult} from "../../type/spell/Spell.ts";

/**
 * Modifies spellResult for case when target has Preparation effect
 * @param spellResult - base spellResult
 * @param stackCount - stack count of the Preparation effect
 * @return - modified spellResult
 */
export function preparationModifier(spellResult: SpellResult, stackCount: number): SpellResult {
    if (!spellResult.damage && !spellResult.healing) {
        return spellResult;
    }

    let newDamage = spellResult.damage;
    let newHealing = spellResult.healing;
    if (newDamage) {
        newDamage += stackCount;
    }
    if (newHealing) {
        newHealing += stackCount;
    }

    return {
        ...spellResult,
        damage: newDamage,
        healing: newHealing
    }
}