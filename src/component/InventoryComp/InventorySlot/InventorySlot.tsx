import React, { useCallback, useState } from "react"
import type { Spell } from "../../../type/spell/Spell"
import "./InventorySlot.css"

type InventorySlotProps = {
    spell: Spell,
    className?: string,
    innerRef?: React.Ref<HTMLDivElement>,
    onMouseDown?: (e: React.MouseEvent) => void,
    style?: React.CSSProperties,
    isGhost?: boolean
}

export function InventorySlot({spell, className, innerRef, onMouseDown, style, isGhost}: InventorySlotProps) {
    const width = style?.width ?? 64;
    const height = style?.height ?? 64;
    
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

    const handleMouseDown = isGhost ? undefined : onMouseDown;
    /*
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (isGhost && onMouseDown) {
            onMouseDown(e);
            console.log(`onMouseDown call from ${className}`);
        }
    }, [className, isGhost, onMouseDown])
    */

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
        onMouseDown={handleMouseDown}>
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