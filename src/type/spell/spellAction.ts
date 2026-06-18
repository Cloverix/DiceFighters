import type {CustomSpellAction, Spell, SpellAction, SpellContext} from "./Spell.ts";
import type {EffectReference} from "../effect/Effect.ts";
import {hasSpell} from "../../util/function/hasSpell.ts";
import type {Creature} from "../creature/Creature.ts";
import {countEquippedSpells} from "../../util/function/countEquippedSpells.ts";
import {findEffect} from "../../util/function/findEffect.ts";
import {EffectName} from "../../assets/string/effect/effectName.ts";
import {SpellName} from "../../assets/string/spell/spellName.ts";
import type {Target} from "../gameState/GameState.ts";
import {isPlayer} from "../../util/function/isPlayer.ts";
import type {Player} from "../creature/Player.ts";
import type {Enemy} from "../creature/Enemy.ts";

function constructSpellLogMessage(diceValue: number, casterName: string, message: string): string {
    return `[${diceValue}] ${casterName} ${message}`;
}

export const strikeAction: SpellAction = (spellContext: SpellContext) => {
    const diceValue = spellContext.diceValue;
    const casterName= spellContext.casterCreature.name;
    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';
    const message = `dealt ${diceValue} damage`;
    return {
        caster: caster,
        damage: diceValue,
        logMessage: constructSpellLogMessage(diceValue, casterName, message)
    }
}

export const heavyBlowAction: SpellAction = (spellContext: SpellContext) => {
    const diceValue = spellContext.diceValue;
    const casterName = spellContext.casterCreature.name;
    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';
    const message = 'cast heavy blow, dealing 15 damage';
    return {
        caster: caster,
        damage: 15,
        logMessage: constructSpellLogMessage(diceValue, casterName, message)
    }
}

export const sparkAction: SpellAction = (spellContext: SpellContext) => {
    const diceValue = spellContext.diceValue;
    const casterName = spellContext.casterCreature.name;
    const targetName = spellContext.gameState.enemy.name;
    const burnInstance: EffectReference = {effectName: EffectName.burn, stackCount: 1};
    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';
    const message = `cast spark and lit ${targetName} on fire`;
    return {
        caster: caster,
        damage: diceValue,
        applyToOpponent: [burnInstance],
        logMessage: constructSpellLogMessage(diceValue, casterName, message)
    }
}

export const healingSalveAction: SpellAction = (spellContext: SpellContext) => {
    const diceValue = spellContext.diceValue;
    const casterName = spellContext.casterCreature.name;
    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';
    const message = `healed for ${diceValue}`;
    return {
        caster: caster,
        healing: diceValue,
        logMessage: constructSpellLogMessage(diceValue, casterName, message)
    }
}

export const reapAction: SpellAction = (spellContext: SpellContext) => {
    const diceValue = spellContext.diceValue;
    const casterName = spellContext.casterCreature.name;

    const targetName = spellContext.gameState.enemy.name;
    const damageAndHealing: number = Math.ceil(diceValue / 2);
    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';
    const message = `cast reap, stealing ${damageAndHealing} hp from ${targetName}`;
    return {
        caster: caster,
        damage: damageAndHealing,
        healing: damageAndHealing,
        logMessage: constructSpellLogMessage(diceValue, casterName, message)
    }
}

export const leftHookAction: SpellAction = (spellContext: SpellContext) => {
    const diceValue = spellContext.diceValue;
    const casterCreature: Creature = spellContext.casterCreature;
    const casterName = casterCreature.name;
    const targetName = spellContext.gameState.enemy.name;

    const casterHasSynergy = hasSpell(casterCreature, SpellName.rightHook);
    const baseDamage = diceValue + 3;
    const hitTimes = casterHasSynergy ? 2 : 1;

    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';
    const message = casterHasSynergy ? `punches ${targetName} twice!` : 'performs left hook';
    return {
        caster: caster,
        damage: baseDamage,
        hitTimes: hitTimes,
        logMessage: constructSpellLogMessage(diceValue, casterName, message)
    }
}

export const rightHookAction: SpellAction = (spellContext: SpellContext) => {
    const diceValue = spellContext.diceValue;
    const casterCreature: Creature = spellContext.casterCreature;
    const casterName = casterCreature.name;
    const targetName = spellContext.gameState.enemy.name;

    const casterHasSynergy = hasSpell(casterCreature, SpellName.leftHook);
    const baseDamage = diceValue + 3;
    const hitTimes = casterHasSynergy ? 2 : 1;

    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';
    const message = casterHasSynergy ? `punches ${targetName} twice!` : 'performs right hook';
    return {
        caster: caster,
        damage: baseDamage,
        hitTimes: hitTimes,
        logMessage: constructSpellLogMessage(diceValue, casterName, message)
    }
}

export const eviscerateAction: SpellAction = (spellContext: SpellContext) => {
    const diceValue = spellContext.diceValue;
    const casterCreature = spellContext.casterCreature;
    const casterName = casterCreature.name;

    const spellsCount = countEquippedSpells(casterCreature);

    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';
    const message = `eviscerates the enemy`;
    return {
        caster: caster,
        damage: 2,
        hitTimes: spellsCount,
        logMessage: constructSpellLogMessage(diceValue, casterName, message)
    }
}

export const dualWieldAction: SpellAction = (spellContext: SpellContext) => {
    const dice = spellContext.dice;
    const diceValue = spellContext.diceValue;
    const casterCreature = spellContext.casterCreature;
    const casterName = casterCreature.name;
    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';

    const lowerSpell: Spell | null = spellContext.dice.equippedSpells.get(diceValue - 1);

    const higherSpell: Spell | null = spellContext.dice.equippedSpells.get(diceValue + 1);
    const customSpellActions: CustomSpellAction[] = [];
    const spellNames: string[] = [];
    if (lowerSpell !== null && lowerSpell.name !== SpellName.dualWield) {
        customSpellActions.push({
            type: 'castSpell',
            caster: caster,
            spellName: lowerSpell.name,
            dice: dice,
            diceValue: diceValue
        });
        spellNames.push(lowerSpell.name);
    }
    if (higherSpell !== null && higherSpell.name !== SpellName.dualWield) {
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
        customSpellActions: customSpellActions,
        logMessage: constructSpellLogMessage(diceValue, casterName, message)
    }
}

export const lightningBoltAction: SpellAction = (spellContext: SpellContext) => {
    const diceValue = spellContext.diceValue;
    const casterName= spellContext.casterCreature.name;

    const stunInstance: EffectReference = {effectName: EffectName.stun, stackCount: 1}

    const target = isPlayer(spellContext.casterCreature) ? spellContext.gameState.enemy : spellContext.gameState.player;
    const hasWetEffect = findEffect(EffectName.wet, target.effects) !== -1;
    const damageDealt = hasWetEffect ? Math.ceil(diceValue * 1.5) : diceValue;

    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';
    const message = 'cast lightning bolt'
    return {
        caster: caster,
        damage: damageDealt,
        applyToOpponent: [stunInstance],
        logMessage: constructSpellLogMessage(diceValue, casterName, message)
    }
}

export const igniteAction: SpellAction = (spellContext: SpellContext) => {
    const diceValue = spellContext.diceValue;
    const casterName= spellContext.casterCreature.name;

    const burnInstance: EffectReference = {effectName: EffectName.burn, stackCount: diceValue};

    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';
    const targetCreature: Player | Enemy = isPlayer(spellContext.casterCreature) ? spellContext.gameState.enemy : spellContext.gameState.player;
    const message = `ignites ${targetCreature.name}`;
    return {
        caster: caster,
        applyToOpponent: [burnInstance],
        logMessage: constructSpellLogMessage(diceValue, casterName, message)
    }
}

export const overTheLimitsAction: SpellAction = (spellContext: SpellContext) => {
    const diceValue = spellContext.diceValue;
    const casterName= spellContext.casterCreature.name;

    const damage = Math.ceil(diceValue * 2.5);
    const stunInstance: EffectReference = {effectName: EffectName.stun, stackCount: 1};

    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';
    const message = 'hits too hard!';
    return {
        caster: caster,
        damage: damage,
        applyToCaster: [stunInstance],
        logMessage: constructSpellLogMessage(diceValue, casterName, message)
    }
}

export const sprinkleAction: SpellAction = (spellContext: SpellContext) => {
    const diceValue = spellContext.diceValue;
    const casterName= spellContext.casterCreature.name;

    const wetInstance: EffectReference = {effectName: EffectName.wet, stackCount: 1};

    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';
    const message = 'sprinkles themselves with water';
    return {
        caster: caster,
        applyToCaster: [wetInstance],
        logMessage: constructSpellLogMessage(diceValue, casterName, message)
    }
}