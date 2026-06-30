import type {EffectAction, EffectContext} from "../Effect.ts";
import type {Creature} from "../../creature/Creature.ts";
import {findEffect} from "../../../util/function/findEffect.ts";
import {effectName} from "../../../assets/string/effect/effectName.ts";
import {isPlayer} from "../../../util/function/isPlayer.ts";
import type {Target} from "../../gameState/GameState.ts";

export const deepWoundsOnApplyAction: EffectAction = (effectContext: EffectContext) => {
    const targetCreature: Creature = effectContext.targetCreature;
    const existingDeepWoundsIndex = findEffect(effectName.deepWounds, targetCreature.effects);
    let damageDealt = 0;
    if (existingDeepWoundsIndex !== -1) {
        damageDealt = targetCreature.effects[existingDeepWoundsIndex].stackCount;
    }

    const target: Target = isPlayer(targetCreature) ? 'player' : 'enemy';
    const targetName = targetCreature.name;
    return {
        target: target,
        damageDealt: damageDealt,
        logMessage: `${targetName} suffered ${damageDealt} damage from deep wounds`
    }
}