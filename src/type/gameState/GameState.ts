import { applyEffectResult } from "../../logic/applyEffectResult.ts";
import { castSpell } from "../../logic/castSpell.ts";
import { findEffect } from "../../util/function/findEffect.ts";
import { getEquippedSpell } from "../../util/function/getEquippedSpell.ts";
import type { Creature } from "../creature/Creature.ts";
import type { Enemy } from "../creature/Enemy.ts";
import type { Player } from "../creature/Player.ts";
import type { Dice } from "../dice/Dice.ts";
import { equipOnDice } from "../dice/equipOnDice.ts";
import { isSlotEmpty } from "../dice/isSlotEmpty.ts";
import type { Effect, EffectAction, EffectContext, EffectReference } from "../effect/Effect.ts";
import { effectList } from "../effect/effectList.ts";
import type { Inventory } from "../inventory/Inventory.ts";
import type { CustomSpellAction, Spell, SpellContext } from "../spell/Spell.ts";
import { spellList } from "../spell/spellList.ts";

export interface GameState {
    player: Player,
    enemy: Enemy,
    currentTurn: Target,
    //key = dice id, value = roll result
    currentRollResults: {
        player: Map<number, number>,
        enemy: Map<number, number>
    }
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
        let currentState = this.state;

        effects.forEach(effectRef => {
            const effectName = effectRef.effectName;
            const effectTemplate = effectList[effectName];

            if (effectTemplate.effectActions.OnApply) {
                const effectContext: EffectContext = {
                    targetCreature: currentState[target],
                    stackCount: effectRef.stackCount ?? 1,
                    gameState: currentState
                };
                const onApplyAction: EffectAction = effectTemplate.effectActions.OnApply;
                currentState = applyEffectResult(onApplyAction(effectContext), target, currentState);
            }

            const targetCreature = currentState[target];
            const updatedEffects = [...targetCreature.effects];
            const addStacks = effectRef.stackCount ?? 1;
            const effectIndex = findEffect(effectName, updatedEffects);

            if (effectIndex === -1) {
                updatedEffects.push({effectTemplate: effectTemplate, stackCount: addStacks});
            } else {
                const isSingle: boolean = effectList[effectName].single;
                if (!isSingle) {
                    const oldEffect = updatedEffects[effectIndex];
                    updatedEffects[effectIndex] = {...oldEffect, stackCount: oldEffect.stackCount + addStacks}
                }
            }

            currentState = {
                ...currentState,
                [target]: {...targetCreature, effects: updatedEffects}
            }
        })

        return new GameStateBuilder(currentState);
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

    tickEffect(effectName: string, target: Target, newStackCount: number): GameStateBuilder {
        const oldTargetCreature: Creature = this.state[target];
        const oldEffects: Effect[] = oldTargetCreature.effects;
        const effectIndex = oldEffects.findIndex(effect => effect.effectTemplate.name === effectName);

        let updatedEffects = [...oldEffects];
        if (effectIndex !== -1) {
            if (newStackCount === 0) {
                updatedEffects = updatedEffects.filter((_, index) => index !== effectIndex);
            }
            else {
                const oldEffect: Effect = oldEffects[effectIndex];
                updatedEffects[effectIndex] = {...oldEffect, stackCount: newStackCount};
            }
        }

        const newTargetCreature: Creature = {
            ...oldTargetCreature,
            effects: updatedEffects
        };
        const newState: GameState = {
            ...this.state,
            [target]: newTargetCreature
        };

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
                let targetDice = creature.dices[targetDiceIndex];

                const spellToMove = getEquippedSpell(currentDice, currentSlot);
                const successLog = `${spellToMove.name} moved to slot ${targetSlot}!`;
                const failureLog = `${spellToMove.name} wasn't able to move!`;

                const isTargetSlotEmpty = isSlotEmpty(targetDice, targetSlot);
                if (!isTargetSlotEmpty) {
                    return this.addLog(failureLog);
                }

                const tempDice: Dice | null = equipOnDice(null, creature, currentDice, currentSlot);
                if (tempDice === null) {
                    return this.addLog(failureLog);
                }
                const tempDices: Dice[] = [...creature.dices];
                tempDices[currentDiceIndex] = tempDice;
                const tempCreature: Creature = {...creature, dices: tempDices};

                //If spell is moved on the same dice, targetDice and tempDice are the same.
                if (currentDiceIndex === targetDiceIndex) {
                    targetDice = tempDice;
                } 
                const newDice: Dice | null = equipOnDice(spellToMove, tempCreature, targetDice, targetSlot);
                if (newDice === null) {
                    return this.addLog(failureLog);
                }
                console.log(`changeEquippedSlot: new dice spells: ${[...newDice.equippedSpells.items.values()].map(value => value?.name ?? 'null')}`);
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

    setMaxHp(target: Target, newMaxHp: number): GameStateBuilder {
        const oldCreature: Creature = this.state[target];
        const newCreature: Creature = {
            ...oldCreature,
            maxHp: newMaxHp
        };
        const newState: GameState = {
            ...this.state,
            [target]: newCreature
        };
        return new GameStateBuilder(newState);
    }

    addSpellToInventory(spell: Spell): GameStateBuilder {
        const oldPlayer: Player = this.state.player;
        const oldInventory: Inventory = oldPlayer.inventory;
        const newStoredSpells: Spell[] = [...oldInventory.storedSpells, spell];
        const newInventory: Inventory = {
            ...oldInventory,
            storedSpells: newStoredSpells
        };
        const newPlayer: Player = {
            ...oldPlayer,
            inventory: newInventory
        };
        const newState: GameState = {
            ...this.state,
            player: newPlayer
        };
        return new GameStateBuilder(newState);
    }

    setRollResults(rollResults: Map<number, number>, target: Target): GameStateBuilder {
        const newState: GameState = {...this.state};
        newState.currentRollResults = {
            ...newState.currentRollResults,
            [target]: rollResults
        };
        return new GameStateBuilder(newState);
    }

    addLog(message: string): GameStateBuilder {
        console.log(message);
        return new GameStateBuilder({...this.state, logs: [...this.state.logs, message]});
    }

    build(): GameState {
        return this.state;
    }
}