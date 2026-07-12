import type {Spell, SpellContext} from "../type/spell/Spell.ts";
import type {GameState} from "../type/gameState/GameState.ts";
import {applySpellResult} from "./applySpellResult.ts";
import {applyModifierEffects} from "./applyModifierEffects.ts";

/**
 * Called whenever a spell is being cast
 * @param spell - spell to be cast
 * @param spellContext - spellContext for the spell
 */
export function castSpell(spell: Spell, spellContext: SpellContext): GameState {
    const spellAction = spell.spellAction;
    const spellResult = spellAction(spellContext);
    const gameState = spellContext.gameState;
    const modifiedSpellResult = applyModifierEffects(spellResult, gameState);
    console.log('cast spell returning');
    return applySpellResult(modifiedSpellResult, gameState);
}