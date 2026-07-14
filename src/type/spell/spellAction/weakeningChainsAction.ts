import type {SpellAction, SpellContext, SpellResult} from "../Spell.ts";
import type {Target} from "../../gameState/GameState.ts";
import {isPlayer} from "../../../util/function/isPlayer.ts";
import type {EffectReference} from "../../effect/Effect.ts";
import {effectName} from "../../../assets/string/effect/effectName.ts";
import { constructSpellLogMessage } from "../../../util/function/constructSpellLogMessage.ts";

export const weakeningChainsAction: SpellAction = (spellContext: SpellContext): SpellResult => {
    const diceValue = spellContext.diceValue;
    const casterName= spellContext.casterCreature.name;
    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';
    const targetName: string = caster === 'player' ? spellContext.gameState.enemy.name : casterName;

    const stackCount = Math.ceil(diceValue / 2);
    const damageDownInstance: EffectReference = {effectName: effectName.damageDown, stackCount: stackCount};

    const message = `entangles ${targetName} in chains`;
    return {
        caster: caster,
        casterName: casterName,
        diceValue: diceValue,
        applyToOpponent: [damageDownInstance],
        logMessage: {method: 'message', message: constructSpellLogMessage(diceValue, casterName, message)}
    }
}