import type {SpellAction, SpellContext} from "../Spell.ts";
import type {Target} from "../../gameState/GameState.ts";
import {spellLogGenerator} from "../../../assets/string/spell/spellLogGenerator.ts";
import {isPlayer} from "../../../util/function/isPlayer.ts";

export const scrapeAction: SpellAction = (spellContext: SpellContext) => {
    const diceValue = spellContext.diceValue;
    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';

    const damageDealt = Math.ceil(diceValue / 2);

    return {
        caster: caster,
        casterName: spellContext.casterCreature.name,
        diceValue: diceValue,
        damage: damageDealt,
        logMessage: {method: 'generator', generator: spellLogGenerator.scrape}
    }
}