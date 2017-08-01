'use strict'
// @flow

/***
 *     Smith + Crown currency conversion demo
 *     Vincent Khougaz <vincent@khougaz.com>
 *     describe functional components and map to state transforms
 ***/

export class ConversionService {
    apiBase: string
    currencies: Array<string>
    conversions: {[string]: number }

    constructor(apiBase: string) {
        this.apiBase = apiBase
        this.currencies = ['USD', 'EUD', 'BTC', 'ETC', 'LTC']
        this.conversions = {}
    }

    load() {

    }

    convert = (from: string, to: string, amount: number) => {
        return 1
    }
}
