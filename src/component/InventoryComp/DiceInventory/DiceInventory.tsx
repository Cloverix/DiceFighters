import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { DICE_SLOTS_COUNT } from "../../../assets/constants/numericConstants"
import type { Dice } from "../../../type/dice/Dice"
import type { Spell } from "../../../type/spell/Spell"
import { FixedMap } from "../../../util/class/FixedMap"
import { DiceSlot } from "../DiceSlot/DiceSlot"
import "./DiceInventory.css"
import { spellList } from "../../../type/spell/spellList"
import { spellName } from "../../../assets/string/spell/spellName"

type DiceInventoryProps = {
    dice: Dice,
    diceIndex: number,
    onMount: (refs: Map<number, HTMLDivElement>, diceIndex: number) => void,
    onRender: (contents: Map<number, Spell>, diceIndex: number) => void,
    onMouseDown?: (e: React.MouseEvent) => void
}

export function DiceInventory({dice, diceIndex, onMount, onRender, onMouseDown}: DiceInventoryProps) {
    const equippedSpells: FixedMap<Spell> = dice.equippedSpells;

    const diceInventoryRef = useRef<Map<number, HTMLDivElement>>(new Map());
    const [refSize, setRefSize] = useState(0);
    
    const ref1 = useCallback((el: HTMLDivElement | null) => {
        if (el) {
            diceInventoryRef.current.set(1, el);
        }
        else {
            diceInventoryRef.current.delete(1);
        }
        setRefSize(diceInventoryRef.current.size)
    }, [])

    const ref2 = useCallback((el: HTMLDivElement | null) => {
        if (el) {
            diceInventoryRef.current.set(2, el);
        }
        else {
            diceInventoryRef.current.delete(2);
        }
        setRefSize(diceInventoryRef.current.size)
    }, [])

    const ref3 = useCallback((el: HTMLDivElement | null) => {
        if (el) {
            diceInventoryRef.current.set(3, el);
        }
        else {
            diceInventoryRef.current.delete(3);
        }
        setRefSize(diceInventoryRef.current.size)
    }, [])

    const ref4 = useCallback((el: HTMLDivElement | null) => {
        if (el) {
            diceInventoryRef.current.set(4, el);
        }
        else {
            diceInventoryRef.current.delete(4);
        }
        setRefSize(diceInventoryRef.current.size)
    }, [])

    const ref5 = useCallback((el: HTMLDivElement | null) => {
        if (el) {
            diceInventoryRef.current.set(5, el);
        }
        else {
            diceInventoryRef.current.delete(5);
        }
        setRefSize(diceInventoryRef.current.size)
    }, [])

    const ref6 = useCallback((el: HTMLDivElement | null) => {
        if (el) {
            diceInventoryRef.current.set(6, el);
        }
        else {
            diceInventoryRef.current.delete(6);
        }
        setRefSize(diceInventoryRef.current.size)
    }, [])

    useEffect(() => {
        if (refSize === DICE_SLOTS_COUNT) {
            onMount(diceInventoryRef.current, diceIndex);
        }
    }, [refSize, onMount, diceIndex])

    useEffect(() => {
        const contents: Map<number, Spell> = new Map();
        for (const [index, spell] of equippedSpells.items) {
            contents.set(index + 1, spell ?? spellList[spellName.strike]);
        }

        onRender(contents, diceIndex);
    }, [equippedSpells, onRender, diceIndex])
    
    return (
        <div className='dice-inventory-container'>
            <DiceSlot slot={1} innerRef={ref1} onMouseDown={onMouseDown} spell={equippedSpells.get(0)} className="slot-1"/>
            <DiceSlot slot={2} innerRef={ref2} onMouseDown={onMouseDown} spell={equippedSpells.get(1)} className="slot-2"/>
            <DiceSlot slot={3} innerRef={ref3} onMouseDown={onMouseDown} spell={equippedSpells.get(2)} className="slot-3"/>
            <DiceSlot slot={4} innerRef={ref4} onMouseDown={onMouseDown} spell={equippedSpells.get(3)} className="slot-4"/>
            <DiceSlot slot={5} innerRef={ref5} onMouseDown={onMouseDown} spell={equippedSpells.get(4)} className="slot-5"/>
            <DiceSlot slot={6} innerRef={ref6} onMouseDown={onMouseDown} spell={equippedSpells.get(5)} className="slot-6"/>
        </div>
    )
}