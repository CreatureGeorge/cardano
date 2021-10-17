"use strict";
/*
    big brain ideas only here!!

    testing functions/good functions below

    1. send to address (grab all addresses and send to address | combining address && transaction)
    2. send to addresses...
    3. mint token and burn
    4. generate policy and mint the CIP0027 token...
*/
Object.defineProperty(exports, "__esModule", { value: true });
//TESTING
//GUUUUDDD
const address_1 = require("./classes/address");
const token_1 = require("./classes/token");
const cli_base_1 = require("./cli_api/cli_base");
function createTokenOut(quantity, name, metadata = '') {
    if (metadata == '')
        var tokenOut = new token_1.token(quantity, name);
    else
        tokenOut = new token_1.nft(quantity, name, metadata);
    return tokenOut;
}
function createAddressOut(addr, adaOut = 1700000, tokens = null) {
    var addressOut = new address_1.address(addr);
    addressOut.setOutputADA(adaOut);
    for (let curToken of tokens)
        addressOut.addToken(curToken);
    return addressOut;
}
(0, cli_base_1.generateSlotFromTTL)('testnet-magic 1097911063', '');
