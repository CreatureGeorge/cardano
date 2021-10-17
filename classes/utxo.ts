import { token } from "./token"

export class utxo {
    txhash: string
    txix: number
    amountADA: number
    containedTokens: token[] = []

    constructor(_txhash:string, _txix: number, _amountADA: number)
    {
        this.txhash = _txhash
        this.txix = _txix
        this.amountADA = _amountADA
    }

    addToken(_token: token) { this.containedTokens.push(_token) }
}