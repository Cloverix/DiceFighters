import type {EffectAction, EffectContext} from "./Effect.ts";
import {EffectName} from "../../assets/string/effect/effectName.ts";
import {findEffect} from "../../util/function/findEffect.ts";

export const burnAction: EffectAction = (effectContext: EffectContext) => {
    let stackCount = effectContext.stackCount;
    const targetName = effectContext.target.name;

    const target = effectContext.target;
    const hasWetEffect = findEffect(EffectName.wet, target.effects) !== -1;
    if (hasWetEffect) {
        stackCount--;
    }

    return {
        damageDealt: stackCount,
        healing: 0,
        newStackCount: stackCount - 1,
        removeEffects: [{effectName: EffectName.wet, stackCount: 1}],
        logMessage: `${targetName} took ${stackCount} damage from Burn`
    }
}

export const stunAction: EffectAction = (effectContext: EffectContext) => {
    const stackCount = effectContext.stackCount;
    const targetName = effectContext.target.name;
    return {
        damageDealt: 0,
        healing: 0,
        newStackCount: stackCount - 1,
        logMessage: `${targetName} is stunned and skips their turn!`
    }
}

export const wetAction: EffectAction = (effectContext: EffectContext) => {
    const targetName = effectContext.target.name;
    return {
        damageDealt: 0,
        healing: 0,
        newStackCount: 1,
        removeEffects: [{effectName: EffectName.burn, stackCount: 999}],
        logMessage: `${targetName} becomes Wet`
    }
}