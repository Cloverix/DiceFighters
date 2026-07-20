import type {Spell} from "../spell/Spell.ts";
import {FixedMap} from "../../util/class/FixedMap.ts";
import {spellList} from "../spell/spellList.ts";
import defaultDiceSprite from "../../assets/sprite/dice/dice-6-side-empty.png"
import {MAX_DICE_FACES} from "../../assets/constants/numericConstants.ts";

export interface Dice {
    id: number,                             //Must be unique among all used dices
    faceCount: DiceEdgeCount;
    equippedSpells: FixedMap<Spell>;        //Null slots are considered Strikes
    sprite: string;                         //Determines an empty-face look of the dice, effectively acting as dice background
}

export type DiceEdgeCount = 4 | 6 | 12 | 20

//Utility class that automatically assigns unique id to every created dice
export class DiceBuilder {
    private static nextId: number = 1;

    private constructor() {}

    static instance(faceCount: DiceEdgeCount): DiceFactory {
        const instance = new DiceFactory(this.nextId, faceCount);
        this.nextId++;
        return instance;
    }
}

/*
export const DiceBuilder: {
    id: number,
    instance: (faceCount: DiceEdgeCount) => DiceFactory
} = {
    id: 1,

    instance(faceCount: DiceEdgeCount): DiceFactory {
        if (this.id !== 1) {
            this.id++;
        }
        return new DiceFactory(this.id, faceCount);
    }
}
*/

class DiceFactory {
    private readonly id: number;
    private faceCount: DiceEdgeCount;
    //Null indicates no spell equipped. Key is spell's slot (1-indexed)
    private spellNames: Map<number, string | null>;
    private sprite: string;

    constructor(id: number, faceCount: DiceEdgeCount) {
        this.id = id;
        this.faceCount = faceCount;
        this.sprite = defaultDiceSprite;
        this.spellNames = new Map<number, string | null>();
        for (let i = 1; i <= MAX_DICE_FACES; i++) {
            this.spellNames.set(i, null);
        }
    }

    setFaceCount(faceCount: DiceEdgeCount): DiceFactory {
        this.faceCount = faceCount;
        return this;
    }

    setSpellNames(spellNames: Map<number, string | null>): DiceFactory {
        this.spellNames = new Map(spellNames);
        return this;
    }

    setSprite(sprite: string): DiceFactory {
        this.sprite = sprite;
        return this;
    }

    addSpell(slot: number, spellName: string): DiceFactory {
        if (slot < 1 || slot > MAX_DICE_FACES) {
            return this;
        }
        const newSpellNames = new Map(this.spellNames);
        newSpellNames.set(slot, spellName);
        this.spellNames = newSpellNames;
        return this;
    }

    removeSpell(slot: number): DiceFactory {
        if (slot < 1 || slot > MAX_DICE_FACES) {
            return this;
        }
        const newSpellNames = new Map(this.spellNames);
        newSpellNames.set(slot, null);
        return this;
    }

    build(): Dice {
        const equippedSpells: FixedMap<Spell> = new FixedMap(this.faceCount);
        for (let i = 1; i <= this.faceCount; i++) {
            /*
            const name = this.spellNames.get(i) ?? spellName.strike;
            equippedSpells.set(spellList[name] ?? spellList[spellName.strike], i - 1);
            */
           const name: string | null = this.spellNames.get(i) ?? null;
           equippedSpells.set(name ? spellList[name] : null, i - 1);
        }
        return {
            id: this.id,
            faceCount: this.faceCount,
            equippedSpells: equippedSpells,
            sprite: this.sprite
        }
    }
}