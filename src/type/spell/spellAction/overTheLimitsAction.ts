import type {SpellAction, SpellContext} from "../Spell.ts";
import type {EffectReference} from "../../effect/Effect.ts";
import type {Target} from "../../gameState/GameState.ts";
import {spellLogGenerator} from "../../../assets/string/spell/spellLogGenerator.ts";
import {effectName} from "../../../assets/string/effect/effectName.ts";
import {isPlayer} from "../../../util/function/isPlayer.ts";

export const overTheLimitsAction: SpellAction = (spellContext: SpellContext) => {
    const diceValue = spellContext.diceValue;
    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';
    const casterName = spellContext.casterCreature.name;

    const damage = Math.ceil(diceValue * 3.5);
    const stunInstance: EffectReference = {effectName: effectName.stun};

    return {
        caster: caster,
        casterName: casterName,
        diceValue: diceValue,
        damage: damage,
        applyToCaster: [stunInstance],
        logMessage: {method: 'generator', generator: spellLogGenerator.overTheLimits}
    }
}