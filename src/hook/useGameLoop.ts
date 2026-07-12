import {type GameState, GameStateBuilder, type Target} from "../type/gameState/GameState.ts";
import {useCallback, useEffect, useReducer} from "react";
import {takeTurn} from "../logic/takeTurn.ts";
import {checkWinCondition} from "../logic/checkWinCondition.ts";

type GameLoopAction =
    | {kind: 'UpdateRollResults', rollResults: number[], target: Target}
    | {kind: 'TakeTurn'}
    | {kind: 'EndBattle'}

function gameLoopReducer(prevState: GameState, action: GameLoopAction): GameState {
    switch (action.kind) {
        case 'UpdateRollResults': {
            return new GameStateBuilder(prevState)
                .setRollResults(action.rollResults, action.target)
                .build();
        }
        case 'TakeTurn': {
            return takeTurn(prevState);
        }
        case 'EndBattle': {
            return prevState;//TODO: add a function that handles after-battle actions (upgrades, etc.)
        }
    }
}

export function useGameLoop(initialState: GameState) {
    const [state, dispatch] = useReducer(gameLoopReducer, initialState);

    const updateRollResults = useCallback((results: number[], target: Target) => {
        dispatch({kind: 'UpdateRollResults', rollResults: results, target: target});
    }, [])

    const handleTakeTurn = useCallback(() => {
        dispatch({kind: 'TakeTurn'});
    }, []);

    const handleEndBattle = useCallback(() => {
        dispatch({kind: 'EndBattle'});
    }, []);

    //Takes a turn automatically when it is enemy's turn
    useEffect(() => {
        if (state.currentTurn === 'enemy' && !checkWinCondition(state)) {
            const timerId = setTimeout(() => handleTakeTurn(), 1000);
            return () => clearTimeout(timerId);
        }
    }, [state.currentTurn, handleTakeTurn])

    return {state, updateRollResults, handleTakeTurn, handleEndBattle};
}