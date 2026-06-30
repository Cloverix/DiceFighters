import type {SpellAction, SpellContext} from "../Spell.ts";
import type {Target} from "../../gameState/GameState.ts";
import {isPlayer} from "../../../util/function/isPlayer.ts";
import {spellLogGenerator} from "../../../assets/string/spell/spellLogGenerator.ts";

export const healingSalveAction: SpellAction = (spellContext: SpellContext) => {
    const diceValue = spellContext.diceValue;
    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';
    const casterName = spellContext.casterCreature.name;

    return {
        caster: caster,
        casterName: casterName,
        diceValue: diceValue,
        healing: diceValue,
        logMessage: {method: 'generator', generator: spellLogGenerator.healingSalve}
    }
}