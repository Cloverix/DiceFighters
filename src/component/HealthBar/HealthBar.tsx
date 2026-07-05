import './HealthBar.css'

type HealthBarProps = {
    hp: number,
    maxHp: number
}

export function HealthBar(props: HealthBarProps) {
    const hp = props.hp;
    const maxHp = props.maxHp;
    const hpPercent = Math.ceil(maxHp > 0 ? (hp / maxHp * 100) : 0);

    return (
        <div className='health-bar-base'>
            <div className='health-bar'>
                <div className='health-bar-bg'>
                    <div className='health-bar-fill' style={{
                        width: `${hpPercent}%`,
                        backgroundColor: hpPercent <= 30 ? 'red' : 'green'
                    }}/>
                </div>
            </div>
            <span className='health-bar-text'>
                {hp} / {maxHp}
            </span>
        </div>
    )
}