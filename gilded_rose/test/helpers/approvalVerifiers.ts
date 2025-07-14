import {WebStormReporter} from "./webStormReporter";
import {configure} from "approvals/lib/Approvals";
import {
    verifyAllCombinations3 as approvalsVerifyAllCombinations3
} from "approvals/lib/Providers/Jest/CombinationApprovals";
import {defaultConfig} from "approvals/lib/config";

let reporterConfigured = false;

export function verifyAllCombinations3(f: any, t1: any, t2: any, t3: any) {
    if(!reporterConfigured) {
        configureWebStormReporter();
    }
    approvalsVerifyAllCombinations3(f, t1, t2, t3)
}

function configureWebStormReporter() {
    const currentConfig = JSON.parse(JSON.stringify(defaultConfig));
    currentConfig.reporters = [
        new WebStormReporter(),
    ];
    configure(currentConfig);
}