'use strict'
// @flow

/***
 *     Smith + Crown currency conversion demo
 *     Vincent Khougaz <vincent@khougaz.com>
 *     describe functional components and map to state transforms
 ***/

import fetch from 'isomorphic-fetch'
import { combineReducers } from 'redux'


// STATE TYPES - Application state is nested into a single State object
type UiState = {
    fromCurrency: string,
    toCurrency: string,
    amount: string,
    resultShown: boolean
}

type Conversions = {
    [string]: {
        quotes: {
            [string]: number
        }
    },
    source: string
}

type APIState = {
    loading: boolean,
    conversions: Conversions
}

export type State = {
    ui: UiState,
    api: APIState
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

export const requestConversions = () => ({
    type: 'REQUEST_CONVERSIONS'
})
export const receiveConversions = (conversions: Conversions) => ({
    type: 'RECEIVE_CONVERSIONS',
    conversions
})

export const fetchConversions = () => {
    return (dispatch) => {
        dispatch(requestConversions())
        return fetch(window.config.apiBase + 'converter')
            .then(
                response => response.json(),
                error => console.log(error)
            )
            .then(json => dispatch(receiveConversions(json)))
    }
}


// There is a way to type each action individually but the syntax is verbose
// Here I am using optional keys to represent all actions
export type UIAction = {
    type: string,
    from?: string,
    to?: string,
    amount?: string,
    visible?: boolean
}

export type APIAction = {
    type: string,
    conversions?: Conversions
}

// DEFAULTS - default state
const defaultUiState: UiState = {
    fromCurrency: "",
    toCurrency: "",
    resultShown: false,
    amount: ""
}

const defaultAPIState: APIState = {
    loading: false,
    conversions: {}
}

// REDUCERS - take (sub)state and an action and produce a new state
// State Machines are easy to reason about and test
// Dependency injection could happen here in a constructor

const ui = (uiState: UiState = defaultUiState, action: UIAction) => {
    switch (action.type) {
        case 'SELECT_FROM':
            return {
                ...uiState,    // Object spread, represents all existing keys
                fromCurrency: action.from,
                resultShown: false
            }
        case 'SELECT_TO':
            return {
                ...uiState,
                toCurrency: action.to,
                resultShown: false
            }
        case 'CHANGE_AMOUNT':
            return {
                ...uiState,
                amount: action.amount,
                resultShown: false
            }
        case 'SHOW_RESULT':
            return {
                ...uiState,
                resultShown: uiState.fromCurrency !== "" && uiState.toCurrency !== "" &&
                             uiState.amount !== "" && !isNaN(uiState.amount) && action.visible
            }
    }
    return uiState
}

const api = (apiState: APIState = defaultAPIState, action: APIAction) => {
    switch (action.type) {
        case 'REQUEST_CONVERSIONS':
            return {
                ...apiState,
                loading: true
            }
        case 'RECEIVE_CONVERSIONS':
            return {
                ...apiState,
                loading: false,
                conversions: action.conversions
            }
    }
    return apiState
}


// COMBINE - map an individual reducer to the sub-key of state
export const converterApp = combineReducers({
    ui,
    api
})
