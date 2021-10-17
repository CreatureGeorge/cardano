"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    policy interaction functions (create | ttl | grab policy)
*/
const fs = require('fs');
const cli_base_1 = require("./cli_base");
const cli_address_1 = require("./cli_address");
function generatePolicyId(workDir, ttl) {
    (0, cli_address_1.paymentKeyGen)(workDir, 'policy');
    var policyGenerateHash = (0, cli_base_1.runCmd)(`cardano-cli address key-hash --payment-verification-key-file ${workDir}policy.vkey`);
    var policyHash = policyGenerateHash.data;
    policyHash = policyHash.substring(0, policyHash.length - 1);
    var protocolData = [
        '{\n',
        `  \"keyHash\": \"${policyHash}\",\n`,
        '  \"type\": \"sig\"\n',
        '}',
    ].join("");
    fs.writeFile(`${workDir}policy.script`, protocolData, function (err) {
        if (err)
            return console.log(err);
        console.log('policy.script created successfully!');
    });
}
//# sourceMappingURL=cli_policy.js.map