import type {SpellAction, SpellContext} from "../Spell.ts";
import type {Target} from "../../gameState/GameState.ts";
import {spellLogGenerator} from "../../../assets/string/spell/spellLogGenerator.ts";
import {isPlayer} from "../../../util/function/isPlayer.ts";

export const heavyBlowAction: SpellAction = (spellContext: SpellContext) => {
    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';
    const casterName = spellContext.casterCreature.name;

    return {
        caster: caster,
        casterName: casterName,
        diceValue: spellContext.diceValue,
        damage: 15,
        logMessage: {method: 'generator', generator: spellLogGenerator.heavyBlow}
    }
}