import type {SpellAction, SpellContext} from "../Spell.ts";
import {countEquippedSpells} from "../../../util/function/countEquippedSpells.ts";
import type {Target} from "../../gameState/GameState.ts";
import {isPlayer} from "../../../util/function/isPlayer.ts";
import {spellLogGenerator} from "../../../assets/string/spell/spellLogGenerator.ts";

export const eviscerateAction: SpellAction = (spellContext: SpellContext) => {
    const casterCreature = spellContext.casterCreature;
    const casterName = casterCreature.name;
    const diceValue = spellContext.diceValue;

    const spellsCount = countEquippedSpells(casterCreature);

    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';

    return {
        caster: caster,
        casterName: casterName,
        diceValue: diceValue,
        damage: 2,
        hitTimes: spellsCount,
        logMessage: {method: 'generator', generator: spellLogGenerator.eviscerate}
    }
}