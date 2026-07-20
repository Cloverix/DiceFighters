import type {Inventory} from "../../type/inventory/Inventory.ts";
import {InventorySlot} from "../InventorySlot/InventorySlot.tsx";

type InventoryProps = {
    inventory: Inventory
}

export function Inventory({inventory}: InventoryProps) {
    return (
        <div className='inventory-container'>
            {inventory.storedSpells.map(spell => {
                return <InventorySlot sprite={spell.sprite}/>
            })}
        </div>
    )
}