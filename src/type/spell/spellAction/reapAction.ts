import type {SpellAction, SpellContext} from "../Spell.ts";
import type {Target} from "../../gameState/GameState.ts";
import {isPlayer} from "../../../util/function/isPlayer.ts";
import {spellLogGenerator} from "../../../assets/string/spell/spellLogGenerator.ts";

export const reapAction: SpellAction = (spellContext: SpellContext) => {
    const diceValue = spellContext.diceValue;
    const casterName = spellContext.casterCreature.name;

    const damageAndHealing: number = Math.ceil(diceValue / 2);
    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';

    return {
        caster: caster,
        casterName: casterName,
        diceValue: diceValue,
        damage: damageAndHealing,
        healing: damageAndHealing,
        logMessage: {method: 'generator', generator: spellLogGenerator.reap}
    }
}