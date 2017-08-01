'use strict'
// @flow

/***
 *     Smith + Crown currency conversion demo
 *     Vincent Khougaz <vincent@khougaz.com>
 *     describe functional components and map to state transforms
 ***/

import { combineReducers } from 'redux'


// STATE TYPES - Application state is nested into a single State object
type UiState = {
    fromCurrency: ?string,
    toCurrency: ?string,
    amount: number,
    resultShown: boolean
}

export type State = {
    ui: UiState
}


// ACTIONS - constructors that describe objects used to make state transforms
export const selectFrom = (from: string) => ({
    type: 'SELECT_FROM',
    from     // (new syntax for from: from)
})
export const selectTo = (to: string) => ({
    type: 'SELECT_TO',
    to
})
export const changeAmount = (amount: number) => ({
    type: 'CHANGE_AMOUNT',
    amount
})
export const showResult = (visible: boolean) => ({
    type: 'SHOW_RESULT',
    visible
})

// There is a way to type each action individually but the syntax is verbose
// Here I am using optional keys to represent all actions
export type Action = {
    type: string,
    from: ?string,
    to: ?string,
    amount: ?number,
    visible: ?boolean
}

// DEFAULTS - default state
const defaultUiState: UiState = {
    fromCurrency: null,
    toCurrency: null,
    resultShown: false,
    amount: 0
}


// REDUCERS - take (sub)state and an action and produce a new state
// State Machines are easy to reason about and test
// Dependency injection could happen here in a constructor

const ui = (uiState: UiState = defaultUiState, action: Action) => {
    switch (action.type) {
        case 'SELECT_FROM':
            return {
                ...uiState,    // Object spread, represents all existing keys
                fromCurrency: action.from
            }
        case 'SELECT_TO':
            return {
                ...uiState,
                toCurrency: action.to
            }
        case 'CHANGE_AMOUNT':
            return {
                ...uiState,
                amount: action.amount
            }
        case 'SHOW_RESULT':
            return {
                ...uiState,
                resultShown: action.visible
            }
    }
    return uiState
}


// COMBINE - map an individual reducer to the sub-key of state
export const converterApp = combineReducers({
    ui
})
