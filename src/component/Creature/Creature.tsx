import './Creature.css'

type CreatureProps = {
    name: string,
    sprite: string,
    size?: number,
    style?: React.CSSProperties
}

export function Creature({name, sprite, size = 256, style = {}}: CreatureProps) {
    return (
        <div className='creature-container'>
            <img className='creature-sprite' src={sprite} alt={name} style={{
                width: size,
                height: size,
                ...style
            }}/>
        </div>
    )
}