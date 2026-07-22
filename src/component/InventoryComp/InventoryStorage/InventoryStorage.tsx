import type {Inventory} from "../../../type/inventory/Inventory.ts";
import {InventorySlot} from "../InventorySlot/InventorySlot.tsx";
import "./InventoryStorage.css"

type InventoryProps = {
    inventory: Inventory,
    className?: string
}

export function InventoryStorage({inventory, className}: InventoryProps) {
    return (
        <div className={`inventory-storage ${className ?? ''}`}>
            {inventory.storedSpells.map((spell, index) => {
                return <InventorySlot key={index}
                spell={spell}/>
            })}
        </div>
    )
}