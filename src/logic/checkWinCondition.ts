import type {GameState, Target} from "../type/gameState/GameState.ts";

//Checks if the encounter is over. Returns the winner or null if the battle is not over yet
export function checkWinCondition(gameState: GameState): Target | null {
    const player = gameState.player;
    const enemy = gameState.enemy;
    if (player.hp <= 0) {
        return 'enemy';
    }
    if (enemy.hp <= 0) {
        return 'player';
    }
    return null;
}