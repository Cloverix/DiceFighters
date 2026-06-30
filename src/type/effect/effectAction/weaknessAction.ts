import type {EffectAction, EffectContext} from "../Effect.ts";
import type {Target} from "../../gameState/GameState.ts";
import {isPlayer} from "../../../util/function/isPlayer.ts";

export const weaknessAction: EffectAction = (effectContext: EffectContext) => {
    const target: Target = isPlayer(effectContext.targetCreature) ? 'player' : 'enemy';
    const stackCount = effectContext.stackCount;

    return {
        target: target,
        newStackCount: stackCount - 1
    }
}