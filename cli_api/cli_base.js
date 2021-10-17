"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSlotFromTTL = exports.queryLatestProtocol = exports.returnAddr = exports.checkCreateDir = exports.runCmd = void 0;
const cmd = require('node-cmd');
const fs = require('fs');
//run cmd line and return outputs (errors)
function runCmd(cmdArg) {
    var output = cmd.runSync(cmdArg);
    return output;
}
exports.runCmd = runCmd;
//check directory and if doesn't exist, create
function checkCreateDir(dir) {
    if (!fs.existsSync(dir))
        fs.mkdirSync(dir, { recursive: true });
}
exports.checkCreateDir = checkCreateDir;
//read address file and return the addr
function returnAddr(addrPath) {
    var addr = fs.readFileSync(addrPath).toString();
    return addr;
}
exports.returnAddr = returnAddr;
//grab latest protocol-parameters
function queryLatestProtocol(network, dir) {
    var queryProtocol = [
        'cardano-cli query protocol-parameters',
        `--${network}`,
        `--out-file ${dir}protocol.json`
    ].join(" ");
    runCmd(queryProtocol);
}
exports.queryLatestProtocol = queryLatestProtocol;
//give slot based on TTL (seconds to slot)
function generateSlotFromTTL(network, dir) {
    var queryTip = [
        'cardano-cli query tip',
        `--${network}`,
        `--out-file ${dir}protocol.json`
    ].join(" ");
    runCmd(queryTip);
}
exports.generateSlotFromTTL = generateSlotFromTTL;
