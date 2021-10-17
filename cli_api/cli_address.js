"use strict";
/*
    address interaction functions (create | stake | return address(es))
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAddress = exports.paymentKeyGen = exports.queryAddress = void 0;
/* generic address vs shelley address

????????
1. One function or two?
2. Is it just one line change or what is it?

create address
    name addr and add to addresses folder
    make addr keys
    make stake keys
    link addr to keys

*/
const cli_base_1 = require("./cli_base");
const address_1 = require("../classes/address");
const utxo_1 = require("../classes/utxo");
const token_1 = require("../classes/token");
//  cardano-cli query utxo        
//  --address
//  --network
function queryAddress(addr, network) {
    var rawUtxoTable = (0, cli_base_1.runCmd)([
        'cardano-cli query utxo',
        `--address ${addr}`,
        `--${network}`
    ].join(" "));
    var utxoTableRows = rawUtxoTable.data.trim().split('\n');
    if (utxoTableRows.length < 3)
        return 'NO MONEY HERE SIR!!';
    var addressIN = new address_1.addressInput(addr);
    for (let x = 2; x < utxoTableRows.length; x++) {
        const utxoValues = utxoTableRows[x].split(" ").filter(function (i) { return i; });
        var newUtxo = new utxo_1.utxo(utxoValues[0], utxoValues[1], utxoValues[2]);
        if (utxoValues.length > 8) {
            for (let index = 5; index < utxoValues.length - 2; index = index + 3) {
                var newToken = new token_1.token(utxoValues[index], utxoValues[index + 1]);
                newUtxo.addToken(newToken);
            }
        }
        addressIN.addUTXO(newUtxo);
    }
    return addressIN;
}
exports.queryAddress = queryAddress;
//generate payment keys [address | token | policy]
//allows spending and access
//cardano-cli address key-gen
function paymentKeyGen(workDir, keyType) {
    var keyGen = [
        'cardano-cli address key-gen',
        `--verification-key-file ${workDir}${keyType}.vkey`,
        `--signing-key-file ${workDir}${keyType}.skey`,
    ].join(" ");
    (0, cli_base_1.runCmd)(keyGen);
}
exports.paymentKeyGen = paymentKeyGen;
//generate staking keys [stake address]
//staking to a pool...
//cardano-cli stake-address key-gen
function stakeKeyGen(workDir) {
    var keyGen = [
        'cardano-cli stake-address key-gen',
        `--verification-key-file ${workDir}stake.vkey`,
        `--signing-key-file ${workDir}stake.skey`,
    ].join(" ");
    (0, cli_base_1.runCmd)(keyGen);
}
//create address with or without a stake key [bool]
//cardano-cli address build
function createAddress(addrName, network, dir, stakeAddrBool) {
    var workDir = dir + addrName;
    (0, cli_base_1.checkCreateDir)(workDir);
    if (stakeAddrBool)
        stakeKeyGen(workDir);
    paymentKeyGen(workDir, 'payment');
    var addressBuildGenList = [
        'cardano-cli address build',
        `--payment-verification-key-file ${workDir}payment.vkey`
    ];
    if (stakeAddrBool)
        addressBuildGenList.push(`--stake-verification-key-file ${workDir}stake.vkey`);
    addressBuildGenList.push(`--out-file ${workDir}payment.addr --${network}`);
    var addressBuildGen = addressBuildGenList.join(" ");
    (0, cli_base_1.runCmd)(addressBuildGen);
    var addr = (0, cli_base_1.returnAddr)(`${dir}payment.addr`);
    return addr;
}
exports.createAddress = createAddress;
