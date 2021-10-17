"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utxo = void 0;
class utxo {
    constructor(_txhash, _txix, _amountADA) {
        this.containedTokens = [];
        this.txhash = _txhash;
        this.txix = _txix;
        this.amountADA = _amountADA;
    }
    addToken(_token) { this.containedTokens.push(_token); }
}
exports.utxo = utxo;
//# sourceMappingURL=utxo.js.map