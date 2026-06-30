import type {SpellAction, SpellContext} from "../Spell.ts";
import type {EffectReference} from "../../effect/Effect.ts";
import {effectName} from "../../../assets/string/effect/effectName.ts";
import type {Target} from "../../gameState/GameState.ts";
import {isPlayer} from "../../../util/function/isPlayer.ts";
import type {Player} from "../../creature/Player.ts";
import type {Enemy} from "../../creature/Enemy.ts";
import {constructSpellLogMessage} from "../../../util/function/constructSpellLogMessage.ts";

export const preciseCutAction: SpellAction = (spellContext: SpellContext) => {
    const diceValue = spellContext.diceValue;
    const casterName= spellContext.casterCreature.name;

    const deepWoundsInstance: EffectReference = {effectName: effectName.deepWounds, stackCount: 2};

    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';
    const targetCreature: Player | Enemy = caster === 'player' ? spellContext.gameState.enemy : spellContext.gameState.player;
    const message = `precisely cuts ${targetCreature.name}`;
    return {
        caster: caster,
        casterName: casterName,
        diceValue: diceValue,
        damage: 3,
        applyToOpponent: [deepWoundsInstance],
        logMessage: {method: 'message', message: constructSpellLogMessage(diceValue, casterName, message)}
    }
}