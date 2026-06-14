import type {Sprite} from "../../util/type/Sprite.ts";

export interface Effect {
    id: number;
    name: string;
    desc: string;
    icon: Sprite;
}