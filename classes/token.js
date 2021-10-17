"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenStringOutput = exports.nft = exports.token = void 0;
class token {
    constructor(_quantity, _name) {
        this.quantity = _quantity;
        this.name = _name;
    }
    returnString() { return `${this.quantity} ${this.name}`; }
}
exports.token = token;
class nft extends token {
    constructor(_quantity, _name, _metadata) {
        super(_quantity, _name);
        this.metadata = _metadata;
    }
}
exports.nft = nft;
function tokenStringOutput(tokens = []) {
    var tokensString = '';
    for (var x in tokens) {
        var curToken = tokens[x];
        if (Number(curToken.quantity) > 0)
            tokensString = tokensString + curToken.returnTokenString() + " + ";
    }
    tokensString = tokensString.substring(0, tokensString.length - 3);
    return tokensString;
}
exports.tokenStringOutput = tokenStringOutput;
