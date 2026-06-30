import type {SpellAction, SpellContext} from "../Spell.ts";
import type {EffectReference} from "../../effect/Effect.ts";
import {effectName} from "../../../assets/string/effect/effectName.ts";
import type {Target} from "../../gameState/GameState.ts";
import {isPlayer} from "../../../util/function/isPlayer.ts";
import type {Player} from "../../creature/Player.ts";
import type {Enemy} from "../../creature/Enemy.ts";
import {constructSpellLogMessage} from "../../../util/function/constructSpellLogMessage.ts";

export const igniteAction: SpellAction = (spellContext: SpellContext) => {
    const diceValue = spellContext.diceValue;
    const casterName= spellContext.casterCreature.name;

    const burnInstance: EffectReference = {effectName: effectName.burn, stackCount: diceValue};

    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';
    const targetCreature: Player | Enemy = isPlayer(spellContext.casterCreature) ? spellContext.gameState.enemy : spellContext.gameState.player;
    const message = `ignites ${targetCreature.name}`;
    return {
        caster: caster,
        casterName: casterName,
        diceValue: diceValue,
        applyToOpponent: [burnInstance],
        logMessage: {method: 'message', message: constructSpellLogMessage(diceValue, casterName, message)}
    }
}