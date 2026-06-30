import type {EffectResult} from "../type/effect/Effect.ts";
import {type GameState, GameStateBuilder, type Target} from "../type/gameState/GameState.ts";

//Applies effectResult to the targetCreature. First, any effects passed through effectResult are removed,
// then damage and healing are applied, them additional effects are added.
export function applyEffectResult(effectResult: EffectResult, target: Target, gameState: GameState): GameState {
    const builder = new GameStateBuilder(gameState);
    if (effectResult.removeEffects) {
        builder.removeEffects(effectResult.removeEffects, target);
    }
    if (effectResult.damageDealt) {
        builder.applyDamage(effectResult.damageDealt, target);
    }
    if (effectResult.healing) {
        builder.applyHealing(effectResult.healing, target);
    }
    if (effectResult.applyEffects) {
        builder.applyEffects(effectResult.applyEffects, target);
    }
    if (effectResult.logMessage) {
        builder.addLog(effectResult.logMessage);
    }
    return builder.build();
}