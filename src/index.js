'use strict'
// @flow

/***
 *     Smith + Crown currency conversion demo
 *     Vincent Khougaz <vincent@khougaz.com>
 *     This file binds the app together, triggers initial state and mounts to the DOM
 ***/

import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

import { converterApp, fetchConversions } from './converter/state'
import { CurrencyConverter } from './converter/components'

if (!('config' in window)) {
    console.error("Expect window.config { mountId apiBase }")
}
else {
    // Create a store from a reducer
    const store = createStore(converterApp, applyMiddleware(thunkMiddleware))

    // Perform setup
    store.dispatch(fetchConversions())

    render(
        <Provider store={store}>
            <CurrencyConverter />
        </Provider>, document.getElementById(window.config.mountId))
}
