import type {CustomSpellAction, Spell, SpellAction, SpellContext} from "../Spell.ts";
import type {Target} from "../../gameState/GameState.ts";
import {spellName} from "../../../assets/string/spell/spellName.ts";
import {constructSpellLogMessage} from "../../../util/function/constructSpellLogMessage.ts";
import {isPlayer} from "../../../util/function/isPlayer.ts";

export const dualCastAction: SpellAction = (spellContext: SpellContext) => {
    const dice = spellContext.dice;
    const diceValue = spellContext.diceValue;
    const casterCreature = spellContext.casterCreature;
    const casterName = casterCreature.name;
    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';

    const lowerSpell: Spell | null = spellContext.dice.equippedSpells.get(diceValue - 1);

    const higherSpell: Spell | null = spellContext.dice.equippedSpells.get(diceValue + 1);
    const customSpellActions: CustomSpellAction[] = [];
    const spellNames: string[] = [];
    if (lowerSpell !== null && lowerSpell.name !== spellName.dualWield) {
        customSpellActions.push({
            type: 'castSpell',
            caster: caster,
            spellName: lowerSpell.name,
            dice: dice,
            diceValue: diceValue
        });
        spellNames.push(lowerSpell.name);
    }
    if (higherSpell !== null && higherSpell.name !== spellName.dualWield) {
        customSpellActions.push({
            type: 'castSpell',
            caster: caster,
            spellName: higherSpell.name,
            dice: dice,
            diceValue: diceValue
        });
        spellNames.push(higherSpell.name);

    }

    const messageNames = spellNames.join(' and ');
    const message = messageNames.length > 0 ? `casts ${messageNames}!` : 'does nothing';
    return {
        caster: caster,
        casterName: casterName,
        diceValue: diceValue,
        customSpellActions: customSpellActions,
        logMessage: {method: 'message', message: constructSpellLogMessage(diceValue, casterName, message)}
    }
}