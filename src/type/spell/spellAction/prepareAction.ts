import type {SpellAction, SpellContext, SpellResult} from "../Spell.ts";
import type {Target} from "../../gameState/GameState.ts";
import {isPlayer} from "../../../util/function/isPlayer.ts";
import type {EffectReference} from "../../effect/Effect.ts";
import {effectName} from "../../../assets/string/effect/effectName.ts";

export const prepareAction: SpellAction = (spellContext: SpellContext): SpellResult => {
    const diceValue = spellContext.diceValue;
    const casterName= spellContext.casterCreature.name;
    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';

    const preparationInstance: EffectReference = {effectName: effectName.preparation, stackCount: diceValue};

    const message = `${casterName} prepares for their next move`;
    return {
        caster: caster,
        casterName: casterName,
        diceValue: diceValue,
        applyToCaster: [preparationInstance],
        logMessage: {method: 'message', message: message}
    }
}