import type {SpellAction, SpellContext, SpellResult} from "../Spell.ts";
import type {Target} from "../../gameState/GameState.ts";
import {isPlayer} from "../../../util/function/isPlayer.ts";
import type {EffectReference} from "../../effect/Effect.ts";
import {effectName} from "../../../assets/string/effect/effectName.ts";

export const curseAction: SpellAction = (spellContext: SpellContext): SpellResult => {
    const diceValue = spellContext.diceValue;
    const casterName= spellContext.casterCreature.name;
    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';
    const targetName: string = caster === 'player' ? spellContext.gameState.enemy.name : casterName;

    const stackCount = diceValue === 13 ? 4 : 2;

    const weaknessInstance: EffectReference = {effectName: effectName.weakness, stackCount: stackCount};
    const brokenArmorInstance: EffectReference = {effectName: effectName.brokenArmor, stackCount: stackCount};

    const message = `curses ${targetName}`;
    return {
        caster: caster,
        casterName: casterName,
        diceValue: diceValue,
        applyToOpponent: [weaknessInstance, brokenArmorInstance],
        logMessage: {method: 'message', message: message}
    }
}