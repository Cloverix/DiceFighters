import React, { useState } from "react"
import type { Spell } from "../../../type/spell/Spell"
import "./InventorySlot.css"
import { NewLootIndicator } from "../../Shared/NewLootIndicator/NewLootIndicator"

type InventorySlotProps = {
    spell: Spell,
    slotIndex?: number,
    className?: string,
    innerRef?: React.Ref<HTMLDivElement>,
    newIndicator?: boolean,
    onMouseDown?: (e: React.MouseEvent) => void,
    onHover?: (slotIndex: number) => void,
    style?: React.CSSProperties,
    isGhost?: boolean
}

export function InventorySlot({spell, slotIndex, className, innerRef, newIndicator, onMouseDown, onHover, style, isGhost}: InventorySlotProps) {
    const width = style?.width ?? 64;
    const height = style?.height ?? 64;
    
    const [isHovered, setIsHovered] = useState(false);
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);

    const onMouseEnter = (e: React.MouseEvent) => {
        setIsHovered(true);

        if (onHover) {
            if (slotIndex) {
                onHover(slotIndex);
            }
        }

        setMouseX(e.clientX);
        setMouseY(e.clientY);
    }

    const onMouseMove = (e: React.MouseEvent) => {
        setMouseX(e.clientX);
        setMouseY(e.clientY);
    }

    const onMouseLeave = (e: React.MouseEvent) => {
        setIsHovered(false);
    }

    const handleMouseDown = isGhost ? undefined : onMouseDown;

    return (
        <div className={`slot-container ${className ?? ''}`}
            ref={innerRef}
            style={{
                ...style,
                width: width,
                height: height
            }}
            onMouseEnter={onMouseEnter}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onMouseDown={handleMouseDown}
        >
            <img className='item-sprite' alt={`${spell.sprite}`} src={spell.sprite}/>
            {isHovered && (
                <div className={'tooltip'} style={{
                    left: `${mouseX + 10}px`,
                    top: `${mouseY + 10}px`
                }}>
                   <b>{spell.name}</b>
                   <p>{spell.desc}</p> 
                </div>)}
            {newIndicator && <NewLootIndicator size={20} style={{
                position: 'absolute',
                top: '10%',
                left: '90%'
            }}
            />}
        </div>
    )
}