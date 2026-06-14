import type {Inventory} from "../inventory/Inventory.ts";
import type {Creature} from "./Creature.ts";

export interface Player extends Creature {
    inventory: Inventory;
}