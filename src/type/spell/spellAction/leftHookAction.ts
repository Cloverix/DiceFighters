import type {SpellAction, SpellContext} from "../Spell.ts";
import type {Creature} from "../../creature/Creature.ts";
import {isPlayer} from "../../../util/function/isPlayer.ts";
import {hasSpell} from "../../../util/function/hasSpell.ts";
import {spellName} from "../../../assets/string/spell/spellName.ts";
import type {Target} from "../../gameState/GameState.ts";
import {constructSpellLogMessage} from "../../../util/function/constructSpellLogMessage.ts";

export const leftHookAction: SpellAction = (spellContext: SpellContext) => {
    const diceValue = spellContext.diceValue;
    const casterCreature: Creature = spellContext.casterCreature;
    const casterName = casterCreature.name;
    const targetName = isPlayer(casterCreature)
        ? spellContext.gameState.enemy.name
        : spellContext.gameState.player.name;

    const casterHasSynergy = hasSpell(casterCreature, spellName.rightHook);
    const baseDamage = diceValue + 3;
    const hitTimes = casterHasSynergy ? 2 : 1;

    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';
    const message = casterHasSynergy ? `punches ${targetName} twice!` : 'performs left hook';
    return {
        caster: caster,
        casterName: casterName,
        diceValue: diceValue,
        damage: baseDamage,
        hitTimes: hitTimes,
        logMessage: {method: 'message', message: constructSpellLogMessage(diceValue, casterName, message)}
    }
}