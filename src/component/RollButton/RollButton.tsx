import "./RollButton.css"
import type {ComponentPropsWithoutRef} from "react";

export type RollButtonProps = {
    handleRoll: () => void,
    width?: number,
    height?: number
} & ComponentPropsWithoutRef<'div'>

export function RollButton({handleRoll, width = 192, height = 64, ...props}: RollButtonProps) {
    return (
        <button className={`roll-button-container ${props.className || ''}`} onClick={handleRoll} style={{
            width: `${width}px`,
            height: `${height}px`
        }}>
            <span className='roll-button-text'>
                Roll
            </span>
        </button>
    )
}