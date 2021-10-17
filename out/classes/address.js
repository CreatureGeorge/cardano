"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressInput = exports.address = void 0;
class address {
    constructor(_addr) {
        this.outputTokens = [];
        this.addr = _addr;
    }
    setOutputADA(_outputADA) { this.outputADA = _outputADA; }
    addToken(_token) { this.outputTokens.push(_token); }
}
exports.address = address;
class addressInput extends address {
    addUTXO(_utxo) { this.utxos.push(_utxo); }
    getTotalADA() {
        var totalADA;
        for (let curUtxo of this.utxos)
            totalADA += curUtxo.amountADA;
        return totalADA;
    }
}
exports.addressInput = addressInput;
//# sourceMappingURL=address.js.map