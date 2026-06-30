import type {EffectAction, EffectContext} from "../Effect.ts";
import type {Target} from "../../gameState/GameState.ts";
import {isPlayer} from "../../../util/function/isPlayer.ts";
import {findEffect} from "../../../util/function/findEffect.ts";
import {effectName} from "../../../assets/string/effect/effectName.ts";

export const burnAction: EffectAction = (effectContext: EffectContext) => {
    let stackCount = effectContext.stackCount;
    const targetName = effectContext.targetCreature.name;

    const targetCreature = effectContext.targetCreature;
    const target: Target = isPlayer(effectContext.targetCreature) ? 'player' : 'enemy';

    const hasWetEffect = findEffect(effectName.wet, targetCreature.effects) !== -1;
    if (hasWetEffect) {
        stackCount--;
    }

    return {
        target: target,
        damageDealt: stackCount,
        newStackCount: stackCount - 1,
        removeEffects: [{effectName: effectName.wet}],
        logMessage: `${targetName} took ${stackCount} damage from Burn`
    }
}