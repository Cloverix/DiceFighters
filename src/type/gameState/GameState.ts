import type {Player} from "../creature/Player.ts";
import type {Enemy} from "../creature/Enemy.ts";

export interface GameState {
    player: Player,
    enemy: Enemy
}