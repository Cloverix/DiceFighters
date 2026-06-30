import type {SpellAction, SpellContext} from "../Spell.ts";
import type {EffectReference} from "../../effect/Effect.ts";
import {effectName} from "../../../assets/string/effect/effectName.ts";
import type {Target} from "../../gameState/GameState.ts";
import {isPlayer} from "../../../util/function/isPlayer.ts";
import {constructSpellLogMessage} from "../../../util/function/constructSpellLogMessage.ts";

export const sprinkleAction: SpellAction = (spellContext: SpellContext) => {
    const diceValue = spellContext.diceValue;
    const casterName= spellContext.casterCreature.name;

    const wetInstance: EffectReference = {effectName: effectName.wet};

    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';
    const message = 'sprinkles themselves with water';
    return {
        caster: caster,
        casterName: casterName,
        diceValue: diceValue,
        applyToCaster: [wetInstance],
        logMessage: {method: 'message', message: constructSpellLogMessage(diceValue, casterName, message)}
    }
}