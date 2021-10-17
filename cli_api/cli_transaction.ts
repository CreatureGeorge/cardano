/*
    transaction functions (sending | minting | fees | policy.json | stake pool | burning)
    ***FUTURE
        offline transaction
*/


/* sending ADA || Tokens || NFTs || Metadata...

????????
1. can you send nft metadata, and generic metadata??
2. do I just need one function or multiples??
    a. 1 to 1, 1 to many, many to 1, many to many (otherwise just do for loop and have one...)
3. Is shelley transactions different??

utxo draft (sending address, receiving addresses, metadata = null)
-cycle through each outAddress

make utxo draft (check fee)
    sign utxo draft
    calc utxo draft
    sign utxo draft
    submit utxo signd

make utxo draft (assume fee)
    sign utxo draft
    submit utxo signd (return transaction hash???)
*/

/* check fee || include fee how that works...

????????
1. what is the benefit to calculating fee vs having it taken automatically (this is the new update of 1.29.0)
2. Is it merely to ensure the funds are there? If so then just assume a minimum of 10ADA for fees...
*/
import { runCmd, checkCreateDir } from "./cli_base"
import { address, addressInput } from "../classes/address"
import { utxo } from "../classes/utxo"
import { token, tokenStringOutput } from "../classes/token"
//for now assume output tokens all need to be minted...
//assume adaAttached * addressesOut + 50ADA minimum to cover all fees...
//assume 
function txBuild(network:string, addressIn:addressInput, addressesOut:address[] = null, txDir:string, metadataFile:string, policyDir:string='', adaAttached:number=1800000, ) {
    var txRawList=[
        'cardano-cli transaction build-raw',
        '--alonzo-era',
        `--${network} `
    ]
    var tokensOut:[token]
    var tokensReturn:[token]

    for (let curAddr of addressesOut) { var curAddrTokens:token[]=curAddr.outputTokens
        for (let curToken of curAddrTokens) tokensOut.push(curToken)}
    
    var requiredADA:number=adaAttached*addressesOut.length + 50000000
    var missingADA:number=adaAttached*addressesOut.length + 50000000
    //just calculate required ada and put txIn to string
    for (let curUtxo of addressIn.utxos) {
        missingADA -= curUtxo.amountADA
        txRawList.push(`--tx-in ${curUtxo.txhash}#${curUtxo.txix}`)
        tokensOut.push.apply(curUtxo.containedTokens)
        if (missingADA <= 0) break
    }

    if (missingADA > 0) return `not enough ADA in txin, please add more ADA to address:${addressIn.addr}`

    if (tokensReturn.length > 0){
        var addrReturnTokensString:string = tokenStringOutput(tokensReturn)
        txRawList.push(`--tx-out ${addressIn.addr}+${adaAttached}+"${addrReturnTokensString}"`) }

    if (tokensOut.length > 0){
        var tokensOutString:string = tokenStringOutput(tokensOut)

        for (let addressOut of addressesOut) {
            var addrOutTokensString = tokenStringOutput(addressOut.outputTokens)
            txRawList.push(`--tx-out ${addressOut.addr}+${addressOut.outputADA}+"${addrOutTokensString}"`)
        }

        txRawList.push(`--mint="${tokensOutString}"`)
        txRawList.push(`--minting-script-file ${policyDir}policy.script`)
        txRawList.push(`--metadata-json-file ${metadataFile}`)
    
    } else {
        for (let addressOut of addressesOut)
            txRawList.push(`--tx-out ${addressOut.addr}+${addressOut.outputADA}`)
    }
    txRawList.push(`--change-address ${addressIn.addr}`) 
    txRawList.push(`--out-file ${txDir}matx.raw`) 

    var txRaw = txRawList.join(" ")

    var errCase =  runCmd(txRaw)
    return errCase.err
}
//cardano-cli transaction sign
function txSign(network:string, walletDir:string, txDir:string, policyDir:string='') {
    var signTXCMD = ([
        'cardano-cli transaction sign',
        `--signing-key-file ${walletDir}payment.skey`,
        `--signing-key-file ${policyDir}policy.skey`,
        `--${network} `, 
        `--tx-body-file ${txDir}matx.raw`,
        `--out-file ${txDir}matx.signed`
    ]).join(" ")

    var signTX = runCmd(signTXCMD)
    return signTX.err
}
//cardano-cli transaction submit
function txSubmit(network:string, txDir:string) {
    var submitTXCMD = ([
        'cardano-cli transaction submit',
        `--tx-file ${txDir}matx.signed`,
        `--${network}`        
    ]).join(" ")

    var submitTX = runCmd(submitTXCMD)
    return submitTX.err
}
//generate a transaction...
export function txGenerate(addressIn:addressInput, addressesOut:address[]=null, network:string, walletDir:string, txDir:string, policyDir:string = '') 
{ 
    txBuild(network, addressIn, addressesOut, txDir, '')
    txSign(network, walletDir,txDir, policyDir)
    txSubmit(network,txDir)
}