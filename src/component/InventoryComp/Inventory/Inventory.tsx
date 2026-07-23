import { useCallback, useState } from "react"
import type { Player } from "../../../type/creature/Player"
import { DiceInventory } from "../DiceInventory/DiceInventory"
import { InventoryStorage } from "../InventoryStorage/InventoryStorage"
import "./Inventory.css"

type InventoryProps = {
    player: Player
}

export function Inventory({player}: InventoryProps) {
    const [dicesSlots, setDicesSlots] = useState<Map<number, Map<number, HTMLDivElement>>>(new Map());
    const [inventorySlots, setInventorySlots] = useState<Map<number, HTMLDivElement>>(new Map());

    const onDiceInventoryMount = useCallback((diceIndex: number) => {
            return (refs: Map<number, HTMLDivElement>) => {
                const newDicesSlots = new Map(dicesSlots);
                newDicesSlots.set(diceIndex, refs);
                setDicesSlots(newDicesSlots);
        }
    }, [dicesSlots]);

    const onInventoryStorageRender = useCallback((refs: Map<number, HTMLDivElement>) => {
        setInventorySlots(refs);
    }, []);

    return (
        <div className='inventory-root'>
            <div className='dice-inventory-column'>
                {player.dices.map((dice, index) => <DiceInventory
                    dice={dice}
                    key={index}
                    onMount={onDiceInventoryMount(index)}
                />
                )}
            </div>
            <InventoryStorage
                inventory={player.inventory}
                onRender={onInventoryStorageRender}
                className='inventory-storage'
            />
        </div>
    )
}