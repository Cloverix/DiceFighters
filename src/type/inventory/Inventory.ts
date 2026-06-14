import type {Spell} from "../spell/Spell.ts";

export interface Inventory {
    storedSpells: Spell[];
}