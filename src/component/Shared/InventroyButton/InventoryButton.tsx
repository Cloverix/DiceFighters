import "./InventoryButton.css"
import inventoryButtonImg from "../../../assets/sprite/icons/Backpack.png"

type InventoryButtonProps = {
    isOpened: boolean,
    onClick: () => void,
    innerRef?: React.Ref<HTMLDivElement>,
    style?: React.CSSProperties
}

export function InventoryButton({isOpened, onClick, innerRef, style}: InventoryButtonProps) {
    return (
        <div className="inventory-button-container"
            onClick={onClick}
            ref={innerRef}
            style={style}
        >
            <img
                className={`inventory-button-img ${isOpened ? 'opened' : ''}`}
                src={inventoryButtonImg}
                alt="inventory-button-img"/>
        </div>
    )
}