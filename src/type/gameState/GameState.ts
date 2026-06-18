import type {Player} from "../creature/Player.ts";
import type {Enemy} from "../creature/Enemy.ts";
import type {EffectReference} from "../effect/Effect.ts";
import {findEffect} from "../../util/function/findEffect.ts";
import {effectList} from "../effect/effectList.ts";
import type {CustomSpellAction, Spell, SpellContext} from "../spell/Spell.ts";
import {castSpell} from "../../logic/castSpell.ts";
import {spellList} from "../spell/spellList.ts";
import {getEquippedSpell} from "../../util/function/getEquippedSpell.ts";
import {isSlotEmpty} from "../dice/isSlotEmpty.ts";
import {equipSpell} from "../dice/equipSpell.ts";
import {cloneDice} from "../dice/cloneDice.ts";
import type {Creature} from "../creature/Creature.ts";

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
            const addStacks = effectRef.stackCount;
            const effectIndex = findEffect(effectName, updatedEffects);
            if (effectIndex === -1) {
                updatedEffects.push({effectTemplate: effectList[effectName], stackCount: addStacks});
            } else {
                const oldEffect = updatedEffects[effectIndex];
                updatedEffects[effectIndex] = {...oldEffect, stackCount: oldEffect.stackCount + addStacks}
            }
        })

        const newState = {
            ...oldState,
            [target]: {...targetCreature, effects: updatedEffects}
        }

        return new GameStateBuilder(newState);
    }

    removeEffects(effects: EffectReference[], target: Target): GameStateBuilder {
        const oldState = this.state;
        const targetCreature = oldState[target];
        let newEffects = [...targetCreature.effects];

        effects.forEach(effectRef => {
            const effectName = effectRef.effectName;
            const removeStacks: number = effectRef.stackCount;
            const effectIndex = findEffect(effectName, newEffects);
            if (effectIndex !== -1) {
                const currentStacks = newEffects[effectIndex].stackCount;
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
                const currentDice = cloneDice(creature.dices[currentDiceIndex]);
                const targetDice = cloneDice(creature.dices[targetDiceIndex]);

                const spellToMove = getEquippedSpell(currentDice, currentSlot);
                const successLog = `${spellToMove.name} moved to slot ${targetSlot}!`;
                const failureLog = `${spellToMove.name} wasn't able to move!`;

                const isTargetSlotEmpty = isSlotEmpty(targetDice, targetSlot);
                if (!isTargetSlotEmpty) {
                    return this.addLog(failureLog);
                }
                equipSpell(null, currentDice, currentSlot);
                equipSpell(spellToMove, targetDice, targetSlot);

                const newDices = [...creature.dices];
                newDices[currentDiceIndex] = currentDice;
                newDices[targetDiceIndex] = targetDice;

                const newCreature: Creature = {
                    ...creature,
                    dices: newDices
                }
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