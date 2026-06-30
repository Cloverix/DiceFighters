import type {SpellAction, SpellContext} from "../Spell.ts";
import type {EffectReference} from "../../effect/Effect.ts";
import {effectName} from "../../../assets/string/effect/effectName.ts";
import type {Target} from "../../gameState/GameState.ts";
import {isPlayer} from "../../../util/function/isPlayer.ts";
import {constructSpellLogMessage} from "../../../util/function/constructSpellLogMessage.ts";

export const sparkAction: SpellAction = (spellContext: SpellContext) => {
    const diceValue = spellContext.diceValue;
    const casterName = spellContext.casterCreature.name;
    const targetName = spellContext.gameState.enemy.name;

    const burnInstance: EffectReference = {effectName: effectName.burn};

    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';
    const message = `cast spark and lit ${targetName} on fire`;
    return {
        caster: caster,
        casterName: casterName,
        diceValue: diceValue,
        damage: diceValue,
        applyToOpponent: [burnInstance],
        logMessage: {method: 'message', message: constructSpellLogMessage(diceValue, casterName, message)}
    }
}