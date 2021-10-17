import { token } from "./token"
import { utxo } from "./utxo"

export class address {
    addr: string
    outputADA: number
    outputTokens: token[] = []

    constructor(_addr:string) { this.addr = _addr}

    setOutputADA(_outputADA:number) { this.outputADA = _outputADA }
    addToken(_token:token) { this.outputTokens.push(_token) }
}

export class addressInput extends address{
    utxos: utxo[]

    addUTXO(_utxo: utxo) { this.utxos.push(_utxo)}

    getTotalADA() { 
        var totalADA:number
        for(let curUtxo of this.utxos) totalADA+=curUtxo.amountADA
        return totalADA
    }
}