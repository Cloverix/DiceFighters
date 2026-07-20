type InventorySlotProps = {
    sprite: string,
    width?: number,
    height?: number
}

export function InventorySlot({sprite, width = 64, height = 64}: InventorySlotProps) {
    return (
        <div className='slot-container' style={{
            width: `${width}px`,
            height: `${height}px`
        }}>
            <img className='item-sprite' alt={`${sprite}`} src={sprite}/>
        </div>
    )
}