import type {SpellResult} from "../../../type/spell/Spell.ts";
import type {GameState, Target} from "../../../type/gameState/GameState.ts";
import {constructSpellLogMessage} from "../../../util/function/constructSpellLogMessage.ts";

export const spellLogGenerator = {
    strike: (spellResult: SpellResult): string => {
        return constructSpellLogMessage(spellResult.diceValue, spellResult.casterName, `dealt ${spellResult.damage} damage`);
    },
    heavyBlow: (spellResult: SpellResult): string => {
        return constructSpellLogMessage(spellResult.diceValue, spellResult.casterName, `cast heavy blow, dealing ${spellResult.damage} damage`);
    },
    healingSalve: (spellResult: SpellResult): string => {
        return constructSpellLogMessage(spellResult.diceValue, spellResult.casterName,`healed for ${spellResult.healing}`);
    },

    reap: (spellResult: SpellResult, gameState: GameState): string => {
        const target: Target = spellResult.caster === 'player' ? 'enemy' : 'player';
        const targetName = gameState[target].name;
        return constructSpellLogMessage(spellResult.diceValue, spellResult.casterName,`cast reap, stealing ${spellResult.damage} hp from ${targetName}`);
    },

    eviscerate: (spellResult: SpellResult): string => {
        return constructSpellLogMessage(spellResult.diceValue, spellResult.casterName,`eviscerates the enemy, dealing ${spellResult.damage} damage!`);
    },
    lightningBolt: (spellResult: SpellResult): string => {
        return constructSpellLogMessage(spellResult.diceValue, spellResult.casterName,`cast lightning bolt, dealing ${spellResult.damage} damage and stunning the enemy`);
    },
    overTheLimits: (spellResult: SpellResult): string => {
        return constructSpellLogMessage(spellResult.diceValue, spellResult.casterName,`hits too hard, dealing ${spellResult.damage} damage!`);
    },

    scrape: (spellResult: SpellResult, gameState: GameState): string => {
        const target: Target = spellResult.caster === 'player' ? 'enemy' : 'player';
        const targetName = gameState[target].name;
        return constructSpellLogMessage(spellResult.diceValue, spellResult.casterName,`scrapes ${targetName}'s skin, dealing ${spellResult.damage} damage`);
    },

    chaosBolt: {
        magicArrow: (spellResult: SpellResult): string => {
            return constructSpellLogMessage(spellResult.diceValue, spellResult.casterName,`cast Magic arrow and dealt ${spellResult.damage} damage`);
        },
        heartbreak: (spellResult: SpellResult): string => {
            return constructSpellLogMessage(spellResult.diceValue, spellResult.casterName,`cast Heartbreak beam and stole ${spellResult.damage} health!`);
        },
        corruptionNoDebuffs: (spellResult: SpellResult): string => {
            return constructSpellLogMessage(spellResult.diceValue, spellResult.casterName,`cast Corruption, dealing ${spellResult.damage} damage`);
        },
        corruption: (spellResult: SpellResult): string => {
            return constructSpellLogMessage(spellResult.diceValue, spellResult.casterName,`cast Corruption, dealing ${spellResult.damage} damage and applying 3 stacks of debuffs`);
        },
        panacea: (spellResult: SpellResult): string => {
            return constructSpellLogMessage(spellResult.diceValue, spellResult.casterName,`cast Panacea, healing ${spellResult.healing} hp and cleansing debuffs!`);
        },
        meteor: (spellResult: SpellResult): string => {
            return constructSpellLogMessage(spellResult.diceValue, spellResult.casterName,`cast Meteor, dealing ${spellResult.damage} damage and applying Burn 10!`);
        }
    }
}