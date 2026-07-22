import "./RollButton.css"
import type {ComponentPropsWithoutRef} from "react";

export type RollButtonProps = {
    onClick: () => void,
    disabled: boolean,
    width?: number,
    height?: number
} & ComponentPropsWithoutRef<'div'>

export function RollButton({onClick, disabled, width = 192, height = 64, ...props}: RollButtonProps) {
    return (
        <button
            className={`roll-button-container ${props.className || ''} ${disabled ? 'disabled' : ''}`}
            onClick={onClick}
            disabled={disabled}
            style={{
                width: `${width}px`,
                height: `${height}px`
            }}
        >
            <span className='roll-button-text'>
                Roll
            </span>
        </button>
    )
}