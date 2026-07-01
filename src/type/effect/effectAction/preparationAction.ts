import type {EffectAction, EffectContext, EffectResult} from "../Effect.ts";
import {isPlayer} from "../../../util/function/isPlayer.ts";
import type {Target} from "../../gameState/GameState.ts";

export const preparationAction: EffectAction = (effectContext: EffectContext): EffectResult => {
    const target: Target = isPlayer(effectContext.targetCreature) ? 'player' : 'enemy';

    return {
        target: target,
        logMessage: `${effectContext.targetCreature.name} is preparing for their next action`
    }
}