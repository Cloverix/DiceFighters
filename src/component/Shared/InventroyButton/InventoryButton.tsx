import inventoryButtonImg from "../../../assets/sprite/icons/Backpack.png"
import { NewLootIndicator } from "../NewLootIndicator/NewLootIndicator"
import "./InventoryButton.css"

type InventoryButtonProps = {
    isOpened: boolean,
    newIndicator: boolean,
    onClick: () => void,
    innerRef?: React.Ref<HTMLDivElement>,
    style?: React.CSSProperties
}

export function InventoryButton({isOpened, newIndicator, onClick, innerRef, style}: InventoryButtonProps) {
    return (
        <div className="inventory-button-container"
            onClick={onClick}
            ref={innerRef}
            style={style}
        >
            <img
                className={`inventory-button-img ${isOpened ? 'opened' : ''}`}
                src={inventoryButtonImg}
                alt="inventory-button-img"
                style={{
                    width: `${16 * 6}px`,
                    height: `${16 * 6}px`
                }}
            />
            {newIndicator && <NewLootIndicator size={20} style={{
                display: 'flex',
                position: 'absolute',
                left: '80%',
                top: '5%'
            }}/>}
        </div>
    )
}