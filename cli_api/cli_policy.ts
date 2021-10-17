/*
    policy interaction functions (create | ttl | grab policy)
*/
const fs = require('fs')

import { runCmd, checkCreateDir } from "./cli_base"
import { paymentKeyGen } from "./cli_address"
import { utxo } from "../classes/utxo"
import { token } from "../classes/token"

function generatePolicyId(workDir:string, ttl:number) {
    paymentKeyGen(workDir, 'policy')
    
    var policyGenerateHash = runCmd(`cardano-cli address key-hash --payment-verification-key-file ${workDir}policy.vkey`)
    var policyHash = policyGenerateHash.data
    policyHash = policyHash.substring(0, policyHash.length - 1);

    var protocolData = [
        '{\n',
        `  \"keyHash\": \"${policyHash}\",\n`,
        '  \"type\": \"sig\"\n',
        '}',
    ].join("")

    fs.writeFile(`${workDir}policy.script`, protocolData, function (err) {
        if (err) return console.log(err);
        console.log('policy.script created successfully!');
    });
}