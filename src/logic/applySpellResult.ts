import type {SpellResult} from "../type/spell/Spell.ts";
import {type GameState, GameStateBuilder, type Target} from "../type/gameState/GameState.ts";

//Applies spellResult
export function applySpellResult(spellResult: SpellResult, gameState: GameState): GameState {
    const caster: Target = spellResult.caster;
    const opponent: Target = spellResult.caster === 'player' ? 'enemy' : 'player';
    const gameStateBuilder: GameStateBuilder = new GameStateBuilder(gameState)
        .removeEffects(spellResult.removeFromCaster ?? [], caster)
        .removeEffects(spellResult.removeFromOpponent ?? [], opponent);

    const hitTimes = spellResult.hitTimes ?? 1;
    for (let i = 0; i < hitTimes; i++) {
        gameStateBuilder.applyDamage(spellResult.damage ?? 1, opponent);
    }

    gameStateBuilder
        .applyHealing(spellResult.healing ?? 0, caster)
        .applyEffects(spellResult.applyToCaster ?? [], caster)
        .applyEffects(spellResult.applyToOpponent ?? [], opponent);

    if (spellResult.customSpellActions !== undefined) {
        for (const customSpellAction of spellResult.customSpellActions) {
            gameStateBuilder.applyCustomSpellAction(customSpellAction);
        }
    }

    if (spellResult.logMessage) {
        if (spellResult.logMessage.method === 'message') {
            gameStateBuilder.addLog(spellResult.logMessage.message);
        }
        else {
            const message = spellResult.logMessage.generator(spellResult, gameState);
            gameStateBuilder.addLog(message);
        }
    }

    return gameStateBuilder.build();
}