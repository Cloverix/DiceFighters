import { useCallback, useRef, useState } from "react";
import type { Spell } from "../type/spell/Spell";

export type IndexaionData = {area: 'inventory', inventoryIndex: number}
| {area: 'dices', diceIndex: number, slot: number}

export type DomElementData = {
    el: HTMLDivElement,
    indices: IndexaionData,
    content: Spell | null
}

export type EquipMoveData = {
    from: 'inventory',
    inventoryIndex: number,
    diceIndex: number,
    slot: number
}
| {
    from: 'dice',
    originDiceIndex: number,
    originSlot: number,
    targetDiceIndex: number,
    targetSlot: number
}

/**
 * Provides functions for dragging and dropping inventory elements and
 * coordinates for ghost display of the dragged element
 * @param inventorySlots - key: inventory slot index, value: respective DOM element 
 * @param inventoryContents - key: inventory slot index, value: respective spell
 * @param dicesSlots - key: dice index, value: Map containing dice slots and their respective DOM elements
 * @param dicesContents - key: dice index, value: Map containing dice slots and spells equipped on them
 * @param inventoryContainer - DOM element that is the inventory container area
 * @param dicesContainer - DOM element that is the dices column area
 */
export function useInventoryDrag(
    inventorySlots: Map<number, HTMLDivElement>,
    inventoryContents: Map<number, Spell>, 
    dicesSlots: Map<number, Map<number, HTMLDivElement>>,
    dicesContents: Map<number, Map<number, Spell>>,
    inventoryContainer: HTMLDivElement | null,
    dicesContainer: HTMLDivElement | null,
    onEquip: (spell: Spell, moveData: EquipMoveData) => void,
    onUnequip: (spell: Spell, diceIndex: number, slot: number) => void
) {
    //Contains DOM for returning from the hook for UI purposes
    const [storedDom, setStoredDom] = useState<DomElementData | null>(null);
    //Contains DOM that is being dragged at the time
    const storedDomRef = useRef<DomElementData | null>(null);
    const [ghostX, setGhostX] = useState(0);
    const [ghostY, setGhostY] = useState(0);

    function isMouseInsideElement(el: HTMLDivElement, xPos: number, yPos: number): boolean {
        const rect = el.getBoundingClientRect();
        return xPos >= rect.left && xPos <= rect.right
            && yPos >= rect.top && yPos <= rect.bottom;
    }

    /**
     * @param xPos mouse x coordinate
     * @param yPos mouse y coordinate
     * @returns Data about inventory or dice slot, or null if a slot is not targeted
     */
    function determineDomElement(xPos: number, yPos: number): DomElementData | null {        
        if (inventoryContainer && isMouseInsideElement(inventoryContainer, xPos, yPos)) {
            for (const [index, el] of inventorySlots.entries()) {
                if (isMouseInsideElement(el, xPos, yPos)) {
                    return {
                        el: el,
                        indices: {area: 'inventory', inventoryIndex: index},
                        content: inventoryContents.get(index) ?? null
                    };
                }
            }
        }
        else if (dicesContainer && isMouseInsideElement(dicesContainer, xPos, yPos)) {
            for (const [diceIndex, diceElement] of dicesSlots.entries()) {
                for (const [slot, el] of diceElement.entries()) {
                    if (isMouseInsideElement(el, xPos, yPos)) {
                        return {
                            el: el,
                            indices: {area: 'dices', diceIndex: diceIndex, slot: slot},
                            content: dicesContents.get(diceIndex)?.get(slot) ?? null
                        };
                    }
                }
            }
        }
        return null;
    }

    const onMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();

        const xPos = e.clientX;
        const yPos = e.clientY;
        const domRef: DomElementData | null = determineDomElement(xPos, yPos);
        if (!domRef || !domRef.content) {
            //Remove listeners before exiting function
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            return;
        }

        setStoredDom(domRef);
        storedDomRef.current = domRef;
        
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        setGhostX(xPos + 10);
        setGhostY(yPos + 10);
    }

    const onMouseMove = (e: MouseEvent) => {
        setGhostX(e.clientX + 10);
        setGhostY(e.clientY + 10);
    }

    const onMouseUp = (e: MouseEvent) => {
        if (storedDomRef.current) {
            //Unequip
            if (inventoryContainer && isMouseInsideElement(inventoryContainer, e.clientX, e.clientY) &&
                storedDomRef.current.indices.area === 'dices'
            ) {
                const spell: Spell = storedDomRef.current.content!;
                const diceIndex = storedDomRef.current.indices.diceIndex;
                const slot = storedDomRef.current.indices.slot;
                onUnequip(spell, diceIndex, slot)
            }
            //Equip
            else if (dicesContainer && isMouseInsideElement(dicesContainer, e.clientX, e.clientY)) {
                const targetedDom = determineDomElement(e.clientX, e.clientY);
                //Checks if mouse is targeting one of actual dice slots
                if (targetedDom && targetedDom.indices.area === 'dices') {
                    let moveData: EquipMoveData;
                    if (storedDomRef.current.indices.area === 'inventory') {
                        moveData = {
                            from: 'inventory',
                            inventoryIndex: storedDomRef.current.indices.inventoryIndex,
                            diceIndex: targetedDom.indices.diceIndex,
                            slot: targetedDom.indices.slot
                        }
                    }
                    else {
                        moveData = {
                            from: 'dice',
                            originDiceIndex: storedDomRef.current.indices.diceIndex,
                            originSlot: storedDomRef.current.indices.slot,
                            targetDiceIndex: targetedDom.indices.diceIndex,
                            targetSlot: targetedDom.indices.slot
                        }
                    }
                    const spell = storedDomRef.current.content!;
                    onEquip(spell, moveData);
                }
            }
        }

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        setStoredDom(null);
        storedDomRef.current = null;
    }

    //Return dummy if some of the containers are not rendered yet
    if (!inventoryContainer || !dicesContainer) {
        return {
            ghostDom: null,
            ghostX: 0,
            ghostY: 0,
            isDragging: false,
            onMouseDown: () => {}
        }
    }

    return {
        ghostSpell: storedDom?.content ?? null,
        ghostX,
        ghostY,
        isDragging: storedDom !== null,
        onMouseDown
    };
}