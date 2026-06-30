import type {SpellResult} from "../type/spell/Spell.ts";
import type {GameState, Target} from "../type/gameState/GameState.ts";
import type {Effect} from "../type/effect/Effect.ts";
import {effectName} from "../assets/string/effect/effectName.ts";
import {strengthModifier} from "./effectModifications/strengthModifier.ts";
import {weaknessModifier} from "./effectModifications/weaknessModifier.ts";
import {damageUpModifier} from "./effectModifications/damageUpModifier.ts";
import {damageDownModifier} from "./effectModifications/damageDownModifier.ts";
import {reinforcedArmorModifier} from "./effectModifications/reinforcedArmorModifier.ts";
import {brokenArmorModifier} from "./effectModifications/brokenArmorModifier.ts";
import {defenceUpModifier} from "./effectModifications/defenceUpModifier.ts";
import {defenceDownModifier} from "./effectModifications/defenceDownModifier.ts";

/**
 * Changes spellResult according to modifier effects present on characters
 * @param spellResult - spell result to change
 * @param gameState - current game state
 */
export function applyModifierEffects(spellResult: SpellResult, gameState: GameState): SpellResult {
    const caster: Target = spellResult.caster;
    const casterCreature = gameState[caster];
    const targetCreature = caster === 'player' ? gameState.enemy : gameState.player;

    const casterModifierEffects: Effect[] = casterCreature.effects.filter(effect =>
        effect.effectTemplate.effectType.includes('modifier'));
    const targetModifierEffects: Effect[] = targetCreature.effects.filter(effect =>
        effect.effectTemplate.effectType.includes('modifier'));

    let modifiedSpellResult = spellResult;

    casterModifierEffects.forEach(effect => {
        switch (effect.effectTemplate.name) {
            case effectName.strength: {
                modifiedSpellResult = strengthModifier(modifiedSpellResult);
                break;
            }
            case effectName.weakness: {
                modifiedSpellResult = weaknessModifier(modifiedSpellResult);
                break;
            }
            case effectName.damageUp: {
                modifiedSpellResult = damageUpModifier(modifiedSpellResult, effect.stackCount);
                break;
            }
            case effectName.damageDown: {
                modifiedSpellResult = damageDownModifier(modifiedSpellResult, effect.stackCount);
                break;
            }
        }
    })

    targetModifierEffects.forEach(effect => {
        switch (effect.effectTemplate.name) {
            case effectName.reinforcedArmor: {
                modifiedSpellResult = reinforcedArmorModifier(modifiedSpellResult);
                break;
            }
            case effectName.brokenArmor: {
                modifiedSpellResult = brokenArmorModifier(modifiedSpellResult);
                break;
            }
            case effectName.defenceUp: {
                modifiedSpellResult = defenceUpModifier(modifiedSpellResult, effect.stackCount);
                break;
            }
            case effectName.defenceDown: {
                modifiedSpellResult = defenceDownModifier(modifiedSpellResult, effect.stackCount);
                break;
            }
        }
    })

    return modifiedSpellResult;
}