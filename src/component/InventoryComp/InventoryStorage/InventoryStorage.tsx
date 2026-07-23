import { useCallback, useEffect, useRef } from "react";
import type {Inventory} from "../../../type/inventory/Inventory.ts";
import {InventorySlot} from "../InventorySlot/InventorySlot.tsx";
import "./InventoryStorage.css"

type InventoryProps = {
    inventory: Inventory,
    onRender: (refs: Map<number, HTMLDivElement>) => void
    className?: string,
}

export function InventoryStorage({inventory, onRender, className}: InventoryProps) {
    const inventorySlotsRef = useRef<Map<number, HTMLDivElement>>(new Map());

    const slotRef = useCallback((index: number) => {
        return (el: HTMLDivElement | null) => {
            if (el) {
                inventorySlotsRef.current.set(index, el);
            }
            else {
                inventorySlotsRef.current.delete(index);
            }
        }
    }, [])

    useEffect(() => {
        onRender(inventorySlotsRef.current);
    }, [inventory.storedSpells, onRender])

    return (
        <div className={`inventory-storage ${className ?? ''}`}>
            {inventory.storedSpells.map((spell, index) => {
                return <InventorySlot innerRef={slotRef(index)}
                key={index}
                spell={spell}/>
            })}
        </div>
    )
}