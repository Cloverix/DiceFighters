import {type Dice, DiceBuilder} from "../dice/Dice.ts";
import type {Effect} from "../effect/Effect.ts";
import defaultSprite from "../../assets/sprite/creature/player.png"

export interface Creature {
    id: number;
    name: string;
    maxHp: number;
    hp: number;
    effects: Effect[];
    dices: Dice[];
    sprite: string;
}

/**
 * Note: this class is not used for managing effects. Instead, use GameStateBuilder.
 */
export class CreatureBuilder {
    protected creature: Creature;

    constructor(id: number) {
        const starterDice = new DiceBuilder(6).build();

        this.creature = {
            id: id,
            name: `creature-${id}`,
            maxHp: 100,
            hp: 100,
            effects: [],
            dices: [starterDice],
            sprite: defaultSprite
        }
    }

    setName(name: string): this {
        this.creature.name = name;
        return this;
    }

    setMaxHp(maxHp: number): this {
        maxHp = Math.max(0, maxHp);
        this.creature.maxHp = maxHp;
        this.creature.hp = Math.min(this.creature.hp, maxHp);
        return this;
    }

    setHp(hp: number): this {
        hp = Math.max(0, hp);
        this.creature.hp = Math.min(hp, this.creature.maxHp);
        return this;
    }

    setDices(dices: Dice[]): this {
        this.creature.dices = dices;
        return this;
    }

    addDice(dice: Dice): this {
        const newDices: Dice[] = [...this.creature.dices];
        newDices.push(dice);
        this.creature.dices = newDices;
        return this;
    }

    removeDice(index: number): this {
        let newDices: Dice[] = [...this.creature.dices];
        newDices = newDices.filter((_, diceIndex) => diceIndex !== index);
        this.creature.dices = newDices;
        return this;
    }

    setSprite(sprite: string): this {
        this.creature.sprite = sprite;
        return this;
    }

    build(): Creature {
        return {
            ...this.creature,
            effects: [...this.creature.effects],
            dices: [...this.creature.dices]
        };
    }
}