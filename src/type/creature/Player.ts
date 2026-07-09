import type {Inventory} from "../inventory/Inventory.ts";
import {type Creature, CreatureBuilder} from "./Creature.ts";
import type {Spell} from "../spell/Spell.ts";

export interface Player extends Creature {
    inventory: Inventory;
}

export class PlayerBuilder extends CreatureBuilder {
    private inventory: Inventory = {storedSpells: []};

    constructor(name?: string) {
        super(0);
        this.setName(name ?? 'player');
    }

    setInventory(inventory: Inventory): this {
        this.inventory = inventory;
        return this;
    }

    addToInventory(spell: Spell): this {
        const newInventory: Inventory = {...this.inventory};
        const newStoredSpells: Spell[] = [...newInventory.storedSpells];
        newStoredSpells.push(spell);
        newInventory.storedSpells = newStoredSpells;
        this.inventory = newInventory;
        return this;
    }

    removeFromInventory(index: number): this {
        const newInventory: Inventory = {...this.inventory};
        let newStoredSpells: Spell[] = [...newInventory.storedSpells];
        newStoredSpells = newStoredSpells.filter((_, spellIndex) => spellIndex !== index);
        newInventory.storedSpells = newStoredSpells;
        this.inventory = newInventory;
        return this;
    }

    override build(): Player {
        const creature = super.build();
        return {
            id: creature.id,
            name: creature.name,
            maxHp: creature.maxHp,
            hp: creature.hp,
            effects: creature.effects,
            dices: creature.dices,
            sprite: creature.sprite,
            inventory: {
                storedSpells: [...this.inventory.storedSpells]
            }
        };
    }
}