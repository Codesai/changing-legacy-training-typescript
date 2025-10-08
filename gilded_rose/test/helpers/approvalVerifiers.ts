import {WebStormReporter} from "./webStormReporter";
import {configure} from "approvals/lib/Approvals";
import {
    verifyAllCombinations as approvalsVerifyAllCombinations, Printer, VariationsForEachParameter
} from "approvals/lib/Providers/Jest/CombinationApprovals";
import {defaultConfig} from "approvals/lib/config";

let reporterConfigured = false;

export function verifyAllCombinations<T extends any[]>(
    func: Printer<T>,
    ...variations: VariationsForEachParameter<T>) {
    if (!reporterConfigured) {
        configureWebStormReporter();
    }
    approvalsVerifyAllCombinations(func, ...variations)
}

function configureWebStormReporter() {
    const currentConfig = JSON.parse(JSON.stringify(defaultConfig));
    currentConfig.reporters = [
        new WebStormReporter(),
    ];
    configure(currentConfig);
}