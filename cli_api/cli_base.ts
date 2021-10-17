const cmd = require('node-cmd')
const fs = require('fs')
//run cmd line and return outputs (errors)
export function runCmd(cmdArg: string) {
    var output = cmd.runSync(cmdArg)
    return output
}
//check directory and if doesn't exist, create
export function checkCreateDir(dir: string) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}
//read address file and return the addr
export function returnAddr(addrPath: string) {
    var addr: string = fs.readFileSync(addrPath).toString()
    return addr
}
//grab current slot
export function returnCurrentSlot(dir: string) {
    let rawtipdata = fs.readFileSync(`${dir}tip.json`)
    return JSON.parse(rawtipdata).slot
}
//grab current block to check against new one...
//ensure synced as well...
export function returnCurrentBlock(dir: string) {
    let rawtipdata = fs.readFileSync(`${dir}tip.json`)
    return JSON.parse(rawtipdata).block
}
//grab latest protocol-parameters
export function queryLatestProtocol(network: string, dir: string) {
    var queryProtocol = [
        'cardano-cli query protocol-parameters',
        `--${network}`,
        `--out-file ${dir}protocol.json`
    ].join(" ")

    runCmd(queryProtocol)
}
//give slot based on TTL (seconds to slot)
export function queryLatestTip(network: string, dir: string) {
    var queryTip = [
        'cardano-cli query tip',
        `--${network}`,
        `--out-file ${dir}tip.json`
    ].join(" ")

    runCmd(queryTip)
}