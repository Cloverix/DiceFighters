import type {EffectAction, EffectContext} from "../Effect.ts";
import type {Target} from "../../gameState/GameState.ts";
import {isPlayer} from "../../../util/function/isPlayer.ts";
import {effectName} from "../../../assets/string/effect/effectName.ts";

export const wetOnApplyAction: EffectAction = (effectContext: EffectContext) => {
    const target: Target = isPlayer(effectContext.targetCreature) ? 'player' : 'enemy';
    return {
        target: target,
        removeEffects: [{effectName: effectName.burn}]
    }
}