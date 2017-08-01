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

const SelectField =  ({ id, placeholder, value, values, setValue }) => (
    <select
        id={id}
        className="input-reset db shadow-1 pa4 bg-white w-100 br2 f3 fw3 gray bg-right"
        style={{backgroundImage: 'url(chevron.png)'}}
        value={value}
        onChange={(e: SyntheticInputEvent) => setValue(e.target.value)}>
        <option value="" disabled>{placeholder}</option>
        {values.map((v: string) => (
            <option key={v} value={v}>{v}</option>
        ))}
    </select>
)

const TextField = ({ id, placeholder, value, setValue }) => (
    <input
        id={id}
        placeholder={placeholder}
        type="text"
        className="input-reset db shadow-1 pa4 bg-white w-100 br2 f3 fw3 gray"
        onChange={ (e: SyntheticInputEvent) => { setValue(e.target.value) } }
        value={ value } />
)

const Button = ({ onClick, disabled, children }) => (
    <div
        className={"bg-gray pa2 br-pill tc pa4 white tracked f3 fw3" + (disabled ? '' : ' dim pointer')}
        style={{backgroundColor: disabled ? '#BBB' : '#7D89C6'}}
        onClick={onClick}>
        {children}
    </div>
)

const labelClass = "db ttu tracked mv3 gray f3 fw4"

const CurrencyConverterComponent = ({currency, amount, visible, loading, conversions, setFrom, setTo, setAmount, show }) => (
    <section className="pa4" style={{ opacity: loading ? .1 : 1 }}>
        <div className="fl w-50 pa4">
            <label htmlFor="from-field" className={labelClass}>From</label>
            <SelectField
                id="from-field"
                placeholder="Select"
                value={currency.from}
                values={Object.keys(conversions)}
                setValue={setFrom}/>
        </div>
        <div className="fl w-50 pa4">
            <label htmlFor="to-field" className={labelClass}>To</label>
            <SelectField
                id="to-field"
                placeholder="Select"
                value={currency.to}
                values={currency.from === '' ? [] :
                    Object.keys(conversions[currency.from].quotes).map((k: string) => k.slice(currency.from.length))
                }
                setValue={setTo}/>
        </div>
        <div className="pa4">
            <label htmlFor="amount-field" className={labelClass}>Amount</label>
            <TextField
                id="amount-field"
                placeholder="Enter amount"
                value={amount}
                setValue={setAmount}/>
        </div>
        <div className="ph4 pt4 pb2">
            <Button
                disabled={currency.from === '' || currency.to === '' || amount === '' || isNaN(amount)}
                onClick={show}>
                CONVERT
            </Button>
        </div>
        <div className="fl h5" />
        { visible &&
        <div className="ph4 pb4">
            <div className="center" style={{width: '40px'}}>
                { /* forgive me for I have constant */ }
                <svg width="40" height="24" style={{marginBottom: '-6px'}}>
                    <polygon points="20,0 0,24 40,24"
                             style={{fill:'#BBB'}} />
                </svg>
            </div>
            <div className="bg-gray w-100 pv4 br4 tc black-60 f3 tracked" style={{backgroundColor: '#BBB'}}>
                {amount} {currency.from} = {parseFloat(amount) * conversions[currency.from].quotes[currency.from + currency.to]} {currency.to}
            </div>
        </div>
        }
        <div className="cf" />
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
        visible: state.ui.resultShown,
        loading: state.api.loading,
        conversions: state.api.conversions
    }
}

// Take a dispatch
const mapDispatchToCurrencyConverterProps = (dispatch: (action: Action) => void) => {
    return {
        setFrom: (f: string) => dispatch(selectFrom(f)),
        setTo: (t: string) => dispatch(selectTo(t)),
        setAmount: (a: number) => dispatch(changeAmount(a)),
        show: () => dispatch(showResult(true))
    }
}

export const CurrencyConverter = connect(
    mapStateToCurrencyConverterProps,
    mapDispatchToCurrencyConverterProps
)(CurrencyConverterComponent)
