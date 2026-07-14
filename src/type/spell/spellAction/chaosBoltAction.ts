import type {SpellAction, SpellContext, SpellLogGenerator, SpellLogMethod} from "../Spell.ts";
import type {Target} from "../../gameState/GameState.ts";
import type {EffectReference} from "../../effect/Effect.ts";
import {effectName} from "../../../assets/string/effect/effectName.ts";
import {spellLogGenerator} from "../../../assets/string/spell/spellLogGenerator.ts";
import {filterEffectsByType} from "../../../util/function/filterEffectsByType.ts";
import {getRandomInt} from "../../../util/function/getRandomInt.ts";
import type {Dice} from "../../dice/Dice.ts";
import {getEmptySlots} from "../../../util/function/getEmptySlots.ts";
import {isPlayer} from "../../../util/function/isPlayer.ts";
import {effectList} from "../../effect/effectList.ts";

export const chaosBoltAction: SpellAction = (spellContext: SpellContext) => {
    const diceValue = spellContext.diceValue;
    const casterName= spellContext.casterCreature.name;
    const caster: Target = isPlayer(spellContext.casterCreature) ? 'player' : 'enemy';
    const targetName: string = caster === 'player' ? spellContext.gameState.enemy.name : casterName;

    let damageDealt: number = 0;
    let healing: number = 0;
    const applyToOpponent: EffectReference[] = [];
    const removeFromCaster: EffectReference[] = [];
    let logGenerator: SpellLogGenerator | undefined;
    let messageText: string | undefined;
    const actionOption = diceValue <= 18 ? diceValue % 6 : diceValue;

    switch (actionOption) {
        //1, 7, 13: apply Wet on the enemy
        case 1: {
            applyToOpponent.push({effectName: effectName.wet});
            messageText = `cast Drizzle and made ${targetName} wet`;
            break;
        }
        //2, 8, 14: deal X damage
        case 2: {
            damageDealt = diceValue;
            logGenerator = spellLogGenerator.chaosBolt.magicArrow;
            break;
        }
        //3, 9, 15: deal 1 damage, apply Burn 2, 4, 6 respectively
        case 3: {
            damageDealt = 1;
            const stackCount = Math.ceil(diceValue / 6) * 2;
            applyToOpponent.push({effectName: effectName.burn, stackCount: stackCount});
            messageText = stackCount === 1
                ? `cast Sparkle and applied Burn 1`
                : `cast empowered Sparkle and applied Burn ${stackCount}!`;
            break;
        }
        //4, 10, 16: deal X damage, heal X health
        case 4: {
            damageDealt = diceValue;
            healing = diceValue;
            logGenerator = spellLogGenerator.chaosBolt.heartbreak;
            break;
        }
        //5, 11, 17: cleanse 2, 4, 6 stacks of random debuffs
        case 5: {
            const creatureTemplates = spellContext.casterCreature.effects
                .map(effect => effect.effectTemplate);
            const allDebuffs = filterEffectsByType(creatureTemplates, ['debuff']);
            if (allDebuffs.length === 0) {
                messageText = `cast Cure!`;
                break;
            }

            const removeDebuffs: Map<string, number> = new Map<string, number>;        //effect name to stack count
            const totalStacks = Math.ceil(diceValue / 6) * 2;

            for (let i = 0; i < totalStacks; i++) {
                const index = getRandomInt(0, allDebuffs.length - 1);
                const debuffName = allDebuffs[index].name;
                if (removeDebuffs.has(debuffName)) {
                    const currentRemoveStack: number | undefined = removeDebuffs.get(debuffName);
                    if (currentRemoveStack) {
                        removeDebuffs.set(debuffName, currentRemoveStack + 1);
                    }
                } else {
                    removeDebuffs.set(debuffName, 1);
                }
            }

            messageText = `cast Cure and removed ${totalStacks} debuff stacks!`;

            for (const [effectName, stackCount] of removeDebuffs.entries()) {
                removeFromCaster.push({effectName: effectName, stackCount: stackCount});
            }
            break;
        }
        //6, 12, 18: deal X * 2 damage, apply 1, 2, 3 stacks of random debuffs respectively
        case 6: {
            damageDealt = diceValue * 2;
            const randomDebuffs = filterEffectsByType(Object.values(effectList), ['debuff']);
            if (randomDebuffs.length === 0) {
                logGenerator = spellLogGenerator.chaosBolt.corruptionNoDebuffs;
                break;
            }

            const debuffStackCount = diceValue / 6;
            const debuffsToApply: Map<string, number> = new Map<string, number>();      //effectName to stackCount
            for (let i = 0; i < debuffStackCount; i++) {
                const index: number = getRandomInt(0, randomDebuffs.length - 1);
                const debuffName: string = randomDebuffs[index].name;
                if (debuffsToApply.has(debuffName)) {
                    const currentStacks: number | undefined = debuffsToApply.get(debuffName);
                    if (currentStacks) {
                        debuffsToApply.set(debuffName, currentStacks + 1);
                    }
                }
                else {
                    debuffsToApply.set(debuffName, 1);
                }
            }

            for (const [debuffName, stackCount] of debuffsToApply.entries()) {
                applyToOpponent.push({effectName: debuffName, stackCount: stackCount});
            }
            logGenerator = spellLogGenerator.chaosBolt.corruption;
            break;
        }
        //19: heal for 1/4 of your max health and cleanse 10 stacks of random debuffs
        case 19: {
            healing = Math.ceil(spellContext.casterCreature.maxHp / 4);

            const creatureTemplates = spellContext.casterCreature.effects
                .map(effect => effect.effectTemplate);
            const allDebuffs = filterEffectsByType(creatureTemplates, ['debuff']);
            const removeDebuffs: Map<string, number> = new Map<string, number>;        //effect name to stack count

            if (allDebuffs.length > 0) {
                for (let i = 0; i < 10; i++) {
                    const index = getRandomInt(0, allDebuffs.length - 1);
                    const debuffName = allDebuffs[index].name;
                    if (removeDebuffs.has(debuffName)) {
                        const currentRemoveStack: number | undefined = removeDebuffs.get(debuffName);
                        if (currentRemoveStack) {
                            removeDebuffs.set(debuffName, currentRemoveStack + 1);
                        }
                    } else {
                        removeDebuffs.set(debuffName, 1);
                    }
                }
            }

            for (const [effectName, stackCount] of removeDebuffs.entries()) {
                removeFromCaster.push({effectName: effectName, stackCount: stackCount});
            }
            logGenerator = spellLogGenerator.chaosBolt.panacea;
            break;
        }
        //20: deal 40 damage, apply Burn 10
        case 20: {
            damageDealt = 40;
            applyToOpponent.push({effectName: effectName.burn, stackCount: 10});
            logGenerator = spellLogGenerator.chaosBolt.meteor;
            break;
        }
    }

    const dicesList: Dice[] = spellContext.casterCreature.dices;
    const currentDiceIndex: number = dicesList.findIndex(dice => dice === spellContext.dice)!;
    console.log(`Current dice index: ${currentDiceIndex}`);

    const availableSlots: number[] = getEmptySlots(spellContext.dice);
    console.log(`Available slots: ${availableSlots}`);
    const targetSlot = availableSlots.length > 0
        ? availableSlots[getRandomInt(0, availableSlots.length - 1)]
        : 1;            //If there are no available slot, pass any occupied slot

    console.log(`Target slot: ${targetSlot}`);

    let message: SpellLogMethod | undefined = undefined;
    if (messageText) {
        message = {method: 'message', message: messageText};
    }
    else if (logGenerator) {
        message = {method: 'generator', generator: logGenerator};
    }

    return {
        caster: caster,
        casterName: casterName,
        diceValue: diceValue,
        damage: damageDealt,
        healing: healing,
        applyToOpponent: applyToOpponent,
        removeFromCaster: removeFromCaster,
        customSpellActions: [{
            type: 'changeEquippedSlot',
            changeSubject: caster,
            currentDiceIndex: currentDiceIndex,
            currentSlot: diceValue,
            targetDiceIndex: currentDiceIndex,
            targetSlot: targetSlot
        }],
        logMessage: message
    }
}