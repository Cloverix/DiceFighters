import type {SpellResult} from "../type/spell/Spell.ts";
import {type GameState, GameStateBuilder, type Target} from "../type/gameState/GameState.ts";

//Applies spellResult
export function applySpellResult(spellResult: SpellResult, gameState: GameState): GameState {
    const caster: Target = spellResult.caster;
    const opponent: Target = spellResult.caster === 'player' ? 'enemy' : 'player';
    let builder: GameStateBuilder = new GameStateBuilder(gameState)
        .removeEffects(spellResult.removeFromCaster ?? [], caster)
        .removeEffects(spellResult.removeFromOpponent ?? [], opponent);

    if (spellResult.logMessage) {
        if (spellResult.logMessage.method === 'message') {
            builder = builder.addLog(spellResult.logMessage.message);
        }
        else {
            const message = spellResult.logMessage.generator(spellResult, builder.build());
            builder = builder.addLog(message);
        }
    }
    
    const hitTimes = spellResult.hitTimes ?? 1;
    for (let i = 0; i < hitTimes; i++) {
        builder = builder.applyDamage(spellResult.damage ?? 0, opponent);
    }

    builder = builder
        .applyHealing(spellResult.healing ?? 0, caster)
        .applyEffects(spellResult.applyToCaster ?? [], caster)
        .applyEffects(spellResult.applyToOpponent ?? [], opponent);

    if (spellResult.customSpellActions !== undefined) {
        for (const customSpellAction of spellResult.customSpellActions) {
            builder = builder.applyCustomSpellAction(customSpellAction);
        }
    }

    const updatedState: GameState = builder.build();
    if (updatedState.player.hp <= 0) {
        return new GameStateBuilder(updatedState).setBattleStatus('enemyWon').build();
    }
    else if (updatedState.enemy.hp <= 0) {
        console.log('player won');
        return new GameStateBuilder(updatedState).setBattleStatus('playerWon').build();
    }
    return updatedState;
}