import type {SpellAction, SpellContext, SpellResult} from "../Spell.ts";
import type {Target} from "../../gameState/GameState.ts";
import {isPlayer} from "../../../util/function/isPlayer.ts";
import type {EffectReference} from "../../effect/Effect.ts";
import {effectName} from "../../../assets/string/effect/effectName.ts";
import {spellLogGenerator} from "../../../assets/string/spell/spellLogGenerator.ts";

export const crashAction: SpellAction = (spellContext: SpellContext): SpellResult => {
    const diceValue = spellContext.diceValue;
    const casterName= spellContext.casterCreature.name;
    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';

    const brokenArmorInstance: EffectReference = {effectName: effectName.brokenArmor, stackCount: 2};

    return {
        caster: caster,
        casterName: casterName,
        diceValue: diceValue,
        damage: diceValue,
        applyToOpponent: [brokenArmorInstance],
        logMessage: {method: 'generator', generator: spellLogGenerator.crash}
    }
}