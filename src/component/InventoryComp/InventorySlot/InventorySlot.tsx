import React, { useState } from "react"
import type { Spell } from "../../../type/spell/Spell"
import "./InventorySlot.css"

type InventorySlotProps = {
    spell: Spell,
    className?: string,
    innerRef?: React.Ref<HTMLDivElement>,
    width?: number,
    height?: number
}

export function InventorySlot({spell, className, innerRef, width = 64, height = 64}: InventorySlotProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);

    const onMouseEnter = (e: React.MouseEvent) => {
        setIsHovered(true);
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
    
    return (
        <div className={`slot-container ${className ?? ''}`}
        ref={innerRef}
        style={{
            width: `${width}px`,
            height: `${height}px`
        }}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}>
            <img className='item-sprite' alt={`${spell.sprite}`} src={spell.sprite}/>
            {isHovered && (
                <div className={'tooltip'} style={{
                    left: `${mouseX + 10}px`,
                    top: `${mouseY + 10}px`
                }}>
                   <b>{spell.name}</b>
                   <p>{spell.desc}</p> 
                </div>)}
        </div>
    )
}