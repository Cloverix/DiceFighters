import type {Player} from "../creature/Player.ts";
import type {Enemy} from "../creature/Enemy.ts";
import type {EffectReference, EffectTemplate} from "../effect/Effect.ts";
import {findEffect} from "../../util/function/findEffect.ts";
import {effectList} from "../effect/effectList.ts";
import type {CustomSpellAction, Spell, SpellContext} from "../spell/Spell.ts";
import {castSpell} from "../../logic/castSpell.ts";
import {spellList} from "../spell/spellList.ts";
import {getEquippedSpell} from "../../util/function/getEquippedSpell.ts";
import {isSlotEmpty} from "../dice/isSlotEmpty.ts";
import {equipSpell} from "../dice/equipSpell.ts";
import type {Creature} from "../creature/Creature.ts";
import type {Dice} from "../dice/Dice.ts";
import {triggerEffects} from "../../logic/triggerEffects.ts";

export interface GameState {
    player: Player,
    enemy: Enemy,
    currentTurn: Target,
    logs: string[]
}

export type Target = 'player' | 'enemy'

export class GameStateBuilder {
    private readonly state: GameState

    constructor(state: GameState) {
        this.state = state;
    }

    applyDamage(damage: number, target: Target): GameStateBuilder {
        const oldState = this.state;
        const creature: Player | Enemy = oldState[target];
        const newHp = Math.max(0, creature.hp - damage);
        const newState = {
            ...oldState,
            [target]: {...creature, hp: newHp}
        }
        return new GameStateBuilder(newState);
    }

    applyHealing(healing: number, target: Target): GameStateBuilder {
        const oldState = this.state;
        const creature = oldState[target];
        const newHp = Math.min(creature.maxHp, creature.hp + healing);
        const newState =  {
            ...oldState,
            [target]: {...creature, hp: newHp}
        }
        return new GameStateBuilder(newState);
    }

    applyEffects(effects: EffectReference[], target: Target): GameStateBuilder {
        const oldState = this.state;
        const targetCreature = oldState[target];
        const updatedEffects = [...targetCreature.effects];

        effects.forEach(effectRef => {
            const effectName = effectRef.effectName;
            const addStacks = effectRef.stackCount ?? 1;
            const effectIndex = findEffect(effectName, updatedEffects);

            if (effectIndex === -1) {
                const effectTemplate: EffectTemplate = effectList[effectName];
                updatedEffects.push({effectTemplate: effectTemplate, stackCount: addStacks});
            } else {
                const isSingle: boolean = effectList[effectName].single;
                if (!isSingle) {
                    const oldEffect = updatedEffects[effectIndex];
                    updatedEffects[effectIndex] = {...oldEffect, stackCount: oldEffect.stackCount + addStacks}
                }
            }
        })

        let newState = {
            ...oldState,
            [target]: {...targetCreature, effects: updatedEffects}
        }

        newState = triggerEffects(target, ['OnApply'], newState);

        return new GameStateBuilder(newState);
    }

    removeEffects(effects: EffectReference[], target: Target): GameStateBuilder {
        const oldState = this.state;
        const targetCreature: Player | Enemy = oldState[target];
        let newEffects = [...targetCreature.effects];

        effects.forEach(effectRef => {
            const effectName = effectRef.effectName;
            const removeStacks: number = effectRef.stackCount ?? Infinity;
            const effectIndex = findEffect(effectName, newEffects);

            if (effectIndex !== -1) {
                const currentStacks = newEffects[effectIndex].stackCount;
                //If currentStacks <= removeStacks, remove an effect
                if (currentStacks <= removeStacks) {
                    newEffects = newEffects.filter((_, index) => index !== effectIndex);
                }
                else {
                    const updatedEffect = newEffects[effectIndex];
                    newEffects[effectIndex] = {...updatedEffect, stackCount: updatedEffect.stackCount - removeStacks};
                }
            }
        })

        const newState = {
            ...oldState,
            [target]: {...targetCreature, effects: newEffects}
        }

        return new GameStateBuilder(newState);
    }

    applyCustomSpellAction(action: CustomSpellAction): GameStateBuilder {
        switch (action.type) {
            case 'castSpell': {
                const spell: Spell = spellList[action.spellName];
                const casterCreature = action.caster === 'player' ? this.state.player : this.state.enemy;
                const spellContext: SpellContext = {
                    casterCreature: casterCreature,
                    dice: action.dice,
                    diceValue: action.diceValue,
                    gameState: this.state
                }
                const newState = castSpell(spell, spellContext);
                return new GameStateBuilder(newState);
            }

            case 'changeEquippedSlot': {
                const { changeSubject, currentDiceIndex, currentSlot, targetDiceIndex, targetSlot } = action;
                const creature: Player | Enemy = changeSubject === 'player' ? this.state.player : this.state.enemy;
                const currentDice = creature.dices[currentDiceIndex];
                const targetDice = creature.dices[targetDiceIndex];

                const spellToMove = getEquippedSpell(currentDice, currentSlot);
                const successLog = `${spellToMove.name} moved to slot ${targetSlot}!`;
                const failureLog = `${spellToMove.name} wasn't able to move!`;

                const isTargetSlotEmpty = isSlotEmpty(targetDice, targetSlot);
                if (!isTargetSlotEmpty) {
                    return this.addLog(failureLog);
                }

                const tempDice: Dice | null = equipSpell(null, creature, currentDice, currentSlot);
                if (tempDice === null) {
                    return this.addLog(failureLog);
                }
                const tempDices: Dice[] = [...creature.dices];
                tempDices[currentDiceIndex] = tempDice;
                const tempCreature: Creature = {...creature, dices: tempDices};

                const newDice: Dice | null = equipSpell(spellToMove, tempCreature, targetDice, targetSlot);
                if (newDice === null) {
                    return this.addLog(failureLog);
                }
                const newDices: Dice[] = [...tempDices];
                newDices[targetDiceIndex] = newDice;
                const newCreature: Creature = {...tempCreature, dices: newDices};

                const newState: GameState = {
                    ...this.state,
                    [changeSubject]: newCreature
                }
                return new GameStateBuilder(newState).addLog(successLog);
            }
        }
    }

    addLog(message: string): GameStateBuilder {
        return new GameStateBuilder({...this.state, logs: [...this.state.logs, message]});
    }

    build(): GameState {
        return this.state;
    }
}