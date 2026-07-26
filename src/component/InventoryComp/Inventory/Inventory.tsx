import { useCallback, useState } from "react"
import { useInventoryDrag, type EquipMoveData } from "../../../hook/useInventoryDrag"
import type { Player } from "../../../type/creature/Player"
import type { Spell } from "../../../type/spell/Spell"
import { DiceInventory } from "../DiceInventory/DiceInventory"
import { InventoryStorage } from "../InventoryStorage/InventoryStorage"
import "./Inventory.css"
import "../InventorySlot/InventorySlot.css"
import { InventorySlot } from "../InventorySlot/InventorySlot"

type InventoryProps = {
    player: Player,
    onEquip: (spell: Spell, moveData: EquipMoveData) => void,
    onUnequip: (spell: Spell, diceIndex: number, slot: number) => void
}

export function Inventory({player, onEquip, onUnequip}: InventoryProps) {
    const [inventorySlots, setInventorySlots] = useState<Map<number, HTMLDivElement>>(new Map());
    const [inventoryContents, setInventoryContents] = useState<Map<number, Spell>>(new Map());

    const [dicesSlots, setDicesSlots] = useState<Map<number, Map<number, HTMLDivElement>>>(new Map());
    const [dicesContents, setDicesContents] = useState<Map<number, Map<number, Spell>>>(new Map());
    
    const [inventoryContainerRef, setInventoryContainerRef] = useState<HTMLDivElement | null>(null);
    const [dicesContainerRef, setDicesContainerRef] = useState<HTMLDivElement | null>(null);

    const onDiceInventoryMount = useCallback((refs: Map<number, HTMLDivElement>, diceIndex: number) => {
        setDicesSlots(prev => {
            const newDicesSlots = new Map(prev);
            newDicesSlots.set(diceIndex, refs);
            return newDicesSlots;
        })
    }, []);

    const onDiceInventoryRender = useCallback((contents: Map<number, Spell>, diceIndex: number) => {
        setDicesContents(prev => {
            const newDicesContents = new Map(prev);
            newDicesContents.set(diceIndex, contents);
            return newDicesContents;
        })
    }, []);

    const onInventoryStorageRender = useCallback((refs: Map<number, HTMLDivElement>, contents: Map<number, Spell>) => {
        setInventorySlots(refs);
        setInventoryContents(contents);
    }, []);

    const dicesContRef = useCallback((el: HTMLDivElement | null) => {
        setDicesContainerRef(el);
    }, [])

    const inventoryContRef = useCallback((el: HTMLDivElement | null) => {
        setInventoryContainerRef(el);
    }, [])

    
    const {
        ghostSpell,
        ghostX,
        ghostY,
        isDragging,
        onMouseDown
    } = useInventoryDrag(
        inventorySlots,
        inventoryContents,
        dicesSlots,
        dicesContents,
        inventoryContainerRef,
        dicesContainerRef,
        onEquip,
        onUnequip
    )

    return (
        <div className='inventory-root'>
            <div className='dice-inventory-column' ref={dicesContRef}>
                {player.dices.map((dice, index) => <DiceInventory
                    dice={dice}
                    diceIndex={index}
                    key={index}
                    onMount={onDiceInventoryMount}
                    onRender={onDiceInventoryRender}
                    onMouseDown={onMouseDown}
                />
                )}
            </div>
            <InventoryStorage
                inventory={player.inventory}
                onRender={onInventoryStorageRender}
                className={`inventory-storage ${isDragging ? 'dragging' : ''}`}
                innerRef={inventoryContRef}
                onMouseDown={onMouseDown}
            />
            {isDragging && ghostSpell && (
                <InventorySlot spell={ghostSpell} className="ghost-dom" style={{
                    left: ghostX,
                    top: ghostY
                }}/>
            )}
        </div>
    )
}