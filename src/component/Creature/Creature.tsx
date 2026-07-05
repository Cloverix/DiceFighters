import './Creature.css'

type CreatureProps = {
    name: string,
    sprite: string,
    size?: number
}

export function Creature(props: CreatureProps) {
    const name: string = props.name;
    const sprite: string = props.sprite;
    const size: number = props.size ? props.size : 256;

    return (
        <div className='creature-container'>
            <img className='creature-sprite' src={sprite} alt={name} style={{
                width: size,
                height: size
            }}/>
        </div>
    )
}