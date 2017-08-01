'use strict'
// @flow

/***
 *     Smith + Crown currency conversion demo
 *     Vincent Khougaz <vincent@khougaz.com>
 *     This file binds the app together, triggers initial state and mounts to the DOM
 ***/

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import { converterApp } from './converter/state'
import { ConversionService } from './converter/services'
import { CurrencyConverter } from './converter/components'

if (!('config' in window)) {
    console.error("Expect window.config { mountId apiBase }")
}
else {
    // Create a store from a reducer
    const store = createStore(converterApp)

    // Instantiate and configure services
    const converter = new ConversionService(window.config.apiBase)
    // Perform setup
    converter.load()

    render(
        <Provider store={store}>
            <CurrencyConverter converter={converter} />
        </Provider>, document.getElementById(window.config.mountId))
}
