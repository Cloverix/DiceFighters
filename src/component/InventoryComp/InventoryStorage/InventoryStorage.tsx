import { useCallback, useEffect, useMemo, useRef } from "react";
import type {Inventory} from "../../../type/inventory/Inventory.ts";
import {InventorySlot} from "../InventorySlot/InventorySlot.tsx";
import "./InventoryStorage.css"
import type { Spell } from "../../../type/spell/Spell.ts";

type InventoryProps = {
    inventory: Inventory,
    onRender: (refs: Map<number, HTMLDivElement>, contents: Map<number, Spell>) => void
    className?: string,
    innerRef?: React.Ref<HTMLDivElement>,
    onMouseDown?: (e: React.MouseEvent) => void
}

export function InventoryStorage({inventory, onRender, className, innerRef, onMouseDown}: InventoryProps) {
    const inventorySlotsRef = useRef<Map<number, HTMLDivElement>>(new Map());
    const inventoryContents = useMemo<Map<number, Spell>>(() => {
        return new Map(inventory.storedSpells.map((spell, index) => [index, spell]));
    }, [inventory.storedSpells]);

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
        onRender(inventorySlotsRef.current, inventoryContents);
    }, [inventory.storedSpells, onRender])

    return (
        <div className={`inventory-storage ${className ?? ''}`} ref={innerRef}>
            {inventory.storedSpells.map((spell, index) => {
                return <InventorySlot
                    innerRef={slotRef(index)}
                    onMouseDown={onMouseDown}
                    key={index}
                    spell={spell}/>
                })}
        </div>
    )
}