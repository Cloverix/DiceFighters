import type {Spell, SpellContext} from "../type/spell/Spell.ts";
import type {GameState} from "../type/gameState/GameState.ts";
import {applySpellResult} from "./applySpellResult.ts";

export function castSpell(spell: Spell, spellContext: SpellContext): GameState {
    const spellAction = spell.spellAction;
    const spellResult = spellAction(spellContext);
    const gameState = spellContext.gameState;
    return applySpellResult(spellResult, gameState);
}