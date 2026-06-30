import type {SpellAction, SpellContext} from "../Spell.ts";
import type {EffectReference} from "../../effect/Effect.ts";
import {isPlayer} from "../../../util/function/isPlayer.ts";
import {findEffect} from "../../../util/function/findEffect.ts";
import type {Target} from "../../gameState/GameState.ts";
import {spellLogGenerator} from "../../../assets/string/spell/spellLogGenerator.ts";
import {effectName} from "../../../assets/string/effect/effectName.ts";

export const lightningBoltAction: SpellAction = (spellContext: SpellContext) => {
    const diceValue = spellContext.diceValue;
    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';
    const casterName = spellContext.casterCreature.name;

    const stunInstance: EffectReference = {effectName: effectName.stun}

    const target = isPlayer(spellContext.casterCreature) ? spellContext.gameState.enemy : spellContext.gameState.player;
    const hasWetEffect = findEffect(effectName.wet, target.effects) !== -1;

    const damageDealt = hasWetEffect ? Math.ceil(diceValue * 1.5) : diceValue;

    return {
        caster: caster,
        casterName: casterName,
        diceValue: diceValue,
        damage: damageDealt,
        applyToOpponent: [stunInstance],
        logMessage: {method: 'generator', generator: spellLogGenerator.lightningBolt}
    }
}