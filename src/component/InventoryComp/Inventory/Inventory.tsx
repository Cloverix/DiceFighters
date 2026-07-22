import type { Player } from "../../../type/creature/Player"
import { DiceInventory } from "../DiceInventory/DiceInventory"
import { InventoryStorage } from "../InventoryStorage/InventoryStorage"
import "./Inventory.css"

type InventoryProps = {
    player: Player
}

export function Inventory({player}: InventoryProps) {
    return (
        <div className='inventory-root'>
            <div className='dice-inventory-column'>
                {player.dices.map(dice => <DiceInventory dice={dice}/>)}
            </div>
            <InventoryStorage inventory={player.inventory} className='inventory-storage'/>
        </div>
    )
}