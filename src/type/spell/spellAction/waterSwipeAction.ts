import type {SpellAction, SpellContext, SpellResult} from "../Spell.ts";
import type {Target} from "../../gameState/GameState.ts";
import {isPlayer} from "../../../util/function/isPlayer.ts";
import {hasEffect} from "../../../util/function/hasEffect.ts";
import {effectList} from "../../effect/effectList.ts";
import {effectName} from "../../../assets/string/effect/effectName.ts";
import {spellLogGenerator} from "../../../assets/string/spell/spellLogGenerator.ts";

export const waterSwipeAction: SpellAction = (spellContext: SpellContext): SpellResult => {
    const diceValue = spellContext.diceValue;
    const casterName= spellContext.casterCreature.name;
    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';
    const casterCreature = spellContext.gameState[caster];

    const hasWetEffect = hasEffect(casterCreature, effectList[effectName.wet]);
    const hitTimes = hasWetEffect ? 2 : 1;

    return {
        caster: caster,
        casterName: casterName,
        diceValue: diceValue,
        damage: diceValue,
        hitTimes: hitTimes,
        logMessage: {method: 'generator', generator: spellLogGenerator.waterSwipe}
    }
}