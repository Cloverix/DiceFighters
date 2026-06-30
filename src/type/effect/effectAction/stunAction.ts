import type {EffectAction, EffectContext} from "../Effect.ts";
import type {Target} from "../../gameState/GameState.ts";
import {isPlayer} from "../../../util/function/isPlayer.ts";

export const stunAction: EffectAction = (effectContext: EffectContext) => {
    const stackCount = effectContext.stackCount;
    const target: Target = isPlayer(effectContext.targetCreature) ? 'player' : 'enemy';
    const targetName = effectContext.targetCreature.name;
    return {
        target: target,
        newStackCount: stackCount - 1,
        logMessage: `${targetName} is stunned and skips their turn!`
    }
}