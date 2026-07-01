import type {Effect, EffectContext, TriggerOn} from "../type/effect/Effect.ts";
import {type GameState, GameStateBuilder, type Target} from "../type/gameState/GameState.ts";
import {applyEffectResult} from "./applyEffectResult.ts";

//Trigger all effects on target that match any of passed triggers
export function triggerEffects(target: Target, triggers: TriggerOn[], gameState: GameState): GameState {
    let currentState: GameState = gameState;
    const initialEffects: Effect[] = currentState[target].effects;

    for (const initialEffect of initialEffects) {
        const currentEffects: Effect[] = currentState[target].effects;
        const currentEffect: Effect | undefined = currentEffects
            .find(effect => effect.effectTemplate.name === initialEffect.effectTemplate.name);
        if (!currentEffect) continue;

        for (const [trigger, action] of Object.entries(currentEffect.effectTemplate.effectActions)) {
            if (triggers.includes(trigger as TriggerOn)) {
                const context: EffectContext = {
                    targetCreature: currentState[target],
                    stackCount: currentEffect.stackCount,
                    gameState: currentState
                };
                const effectResult = action(context);
                currentState = applyEffectResult(effectResult, target, currentState);
                if (effectResult.newStackCount !== undefined) {
                    currentState = new GameStateBuilder(currentState)
                        .tickEffect(initialEffect.effectTemplate.name, target, effectResult.newStackCount)
                        .build();
                }
            }
        }
    }

    return currentState;
}