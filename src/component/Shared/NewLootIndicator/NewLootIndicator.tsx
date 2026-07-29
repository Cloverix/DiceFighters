import "./NewLootIndicator.css"

type NewLootIndicatorProps = {
    size: number,
    style?: React.CSSProperties
}

export function NewLootIndicator({size, style}: NewLootIndicatorProps) {
    return (
        <div className='indicator' style={{
            ...style,
            width: size,
            height: size
        }}/>
    )
}