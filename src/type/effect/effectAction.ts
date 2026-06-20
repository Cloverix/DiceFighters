import type {EffectAction, EffectContext} from "./Effect.ts";
import {EffectName} from "../../assets/string/effect/effectName.ts";
import {findEffect} from "../../util/function/findEffect.ts";

export const burnAction: EffectAction = (effectContext: EffectContext) => {
    let stackCount = effectContext.stackCount;
    const targetName = effectContext.targetCreature.name;

    const target = effectContext.targetCreature;
    const hasWetEffect = findEffect(EffectName.wet, target.effects) !== -1;
    if (hasWetEffect) {
        stackCount--;
    }

    return {
        damageDealt: stackCount,
        healing: 0,
        newStackCount: stackCount - 1,
        removeEffects: [{effectName: EffectName.wet}],
        logMessage: `${targetName} took ${stackCount} damage from Burn`
    }
}

export const stunAction: EffectAction = (effectContext: EffectContext) => {
    const stackCount = effectContext.stackCount;
    const targetName = effectContext.targetCreature.name;
    return {
        damageDealt: 0,
        healing: 0,
        newStackCount: stackCount - 1,
        logMessage: `${targetName} is stunned and skips their turn!`
    }
}

export const wetAction: EffectAction = (effectContext: EffectContext) => {
    const targetName = effectContext.targetCreature.name;
    return {
        damageDealt: 0,
        healing: 0,
        removeEffects: [{effectName: EffectName.burn}],
        logMessage: `${targetName} becomes Wet`
    }
}