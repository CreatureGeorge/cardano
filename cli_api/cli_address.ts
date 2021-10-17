/*
    address interaction functions (create | stake | return address(es))
*/

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
import { runCmd, checkCreateDir, returnAddr } from "./cli_base"
import { address, addressInput } from "../classes/address"
import { utxo } from "../classes/utxo"
import { token } from "../classes/token"

//  cardano-cli query utxo        
//  --address
//  --network
export function queryAddress(addr, network) {
    var rawUtxoTable = runCmd([
        'cardano-cli query utxo',
        `--address ${addr}`,
        `--${network}`
    ].join(" "))

    var utxoTableRows = rawUtxoTable.data.trim().split('\n')

    if (utxoTableRows.length < 3)
        return 'NO MONEY HERE SIR!!'

    var addressIN = new addressInput(addr)

    for (let x = 2; x < utxoTableRows.length; x++) {
        const utxoValues = utxoTableRows[x].split(" ").filter(function (i) { return i })

        var newUtxo = new utxo(utxoValues[0], utxoValues[1], utxoValues[2])

        if (utxoValues.length > 8) {
            for (let index = 5; index < utxoValues.length - 2; index = index + 3) {
                var newToken = new token(utxoValues[index], utxoValues[index + 1])
                newUtxo.addToken(newToken)
            }
        }

        addressIN.addUTXO(newUtxo)
    }

    return addressIN
}
//generate payment keys [address | token | policy]
//allows spending and access
//cardano-cli address key-gen
export function paymentKeyGen(workDir: string, keyType: string) {
    var keyGen: string = [
        'cardano-cli address key-gen',
        `--verification-key-file ${workDir}${keyType}.vkey`,
        `--signing-key-file ${workDir}${keyType}.skey`,
    ].join(" ")

    runCmd(keyGen)
}
//generate staking keys [stake address]
//staking to a pool...
//cardano-cli stake-address key-gen
function stakeKeyGen(workDir: string) {
    var keyGen: string = [
        'cardano-cli stake-address key-gen',
        `--verification-key-file ${workDir}stake.vkey`,
        `--signing-key-file ${workDir}stake.skey`,
    ].join(" ")

    runCmd(keyGen)
}
//create address with or without a stake key [bool]
//cardano-cli address build
export function createAddress(addrName: string, network: string, addrDir: string, stakeAddrBool: boolean) {

    var workDir: string = `${addrDir}${addrName}/`
    checkCreateDir(workDir)

    if (stakeAddrBool) stakeKeyGen(workDir)
    paymentKeyGen(workDir, 'payment')

    var addressBuildGenList = [
        'cardano-cli address build',
        `--payment-verification-key-file ${workDir}payment.vkey`]
    if (stakeAddrBool) addressBuildGenList.push(`--stake-verification-key-file ${workDir}stake.vkey`)

    addressBuildGenList.push(`--out-file ${workDir}payment.addr --${network}`)

    var addressBuildGen: string = addressBuildGenList.join(" ")

    runCmd(addressBuildGen)

    var addr: string = returnAddr(`${workDir}payment.addr`)
    return addr
}