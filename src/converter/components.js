'use strict'
// @flow

/***
 *     Smith + Crown currency conversion demo
 *     Vincent Khougaz <vincent@khougaz.com>
 *     describe functional components and map to state transforms
 ***/

import React from 'react'
import { connect } from 'react-redux'

import type { Action, State } from './state'
import { selectFrom, selectTo, changeAmount, showResult } from './state'

type TextFieldProps = {
    value: string,
    valid: boolean,
    setValue: (v: string) => void,
}
const TextField = ({ value, valid, setValue }: TextFieldProps) => (
    <input
        type="text"
        className={classNames('input-reset ba b--black-20 pa2 mb2 db w-100 br2 bw1', {'b--red': !valid})}
        onChange={ (e: SyntheticInputEvent) => { setValue(e.target.value) } }
        value={ value } />
)

const CurrencyConverterComponent = ({conerter, currency, amount, visible, setFrom, setTo, setAmount, show }) => (
    <section>
        Hello World
    </section>
)


// Take the application state object and map it to the components props
// (arguments in the case of functional components
const mapStateToCurrencyConverterProps = (state: State) => {
    return {
        currency: {
            from: state.ui.fromCurrency,
            to: state.ui.toCurrency
        },
        amount: state.ui.amount,
        visible: state.ui.resultShown
    }
}

// Take a dispatch
const mapDispatchToCurrencyConverterProps = (dispatch: (action: Action) => void) => {
    return {
        from: (f: string) => dispatch(selectFrom(f)),
        to: (t: string) => dispatch(selectTo(t)),
        setAmount: (a: number) => dispatch(changeAmount(a)),
        show: () => dispatch(showResult(true))
    }
}

export const CurrencyConverter = connect(
    mapStateToCurrencyConverterProps,
    mapDispatchToCurrencyConverterProps
)(CurrencyConverterComponent)


function classNames(def: string, addnl: { [string]: boolean }) {
    let classes: Array<string> = [def]

    for (let [key, value] of Object.entries(addnl)) {
        if (value) {
            classes.push(key)
        }
    }

    return classes.join(' ')
}