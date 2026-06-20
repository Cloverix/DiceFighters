import type {GameState} from "../type/gameState/GameState.ts";

//Changes currentTurn inside passed gameState
export function changeTurn(gameState: GameState): GameState {
    return {...gameState, currentTurn: gameState.currentTurn === 'player' ? 'enemy' : 'player'};
}