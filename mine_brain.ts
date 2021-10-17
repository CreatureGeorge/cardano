/*
    big brain ideas only here!!

    testing functions/good functions below

    1. send to address (grab all addresses and send to address | combining address && transaction)
    2. send to addresses...
    3. mint token and burn
    4. generate policy and mint the CIP0027 token...
*/

//TESTING

//GUUUUDDD

import { address } from "./classes/address"
import { token, nft } from "./classes/token"
import { queryLatestProtocol, queryLatestTip, returnCurrentSlot } from "./cli_api/cli_base"
import { createAddress } from "./cli_api/cli_address"

function createTokenOut(quantity:number, name:string, metadata:string = '') {
    if (metadata=='') var tokenOut = new token(quantity, name)
    else tokenOut = new nft(quantity,name,metadata)

    return tokenOut
}

function createAddressOut(addr:string, adaOut:number = 1700000, tokens:[token]=null) {
    var addressOut = new address(addr)
    addressOut.setOutputADA(adaOut)
    for (let curToken of tokens) addressOut.addToken(curToken)

    return addressOut
}

function createPolicy(policyName:string) {

}

var curNetwork:string = 'testnet-magic 1097911063'
var mainDir:string = '/home/mine/cardano/'

queryLatestProtocol(curNetwork, mainDir)
queryLatestTip(curNetwork, mainDir)
var curSlot = returnCurrentSlot(mainDir)

for (var x  = 0; x < 10; x++) { 
    createAddress(`addr_${x}`, curNetwork, `${mainDir}addresses/`, true)
}