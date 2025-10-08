import {WebStormReporter} from "./webStormReporter";
import {configure} from "approvals/lib/Approvals";
import {
    Printer,
    VariationsForEachParameter,
    verifyAllCombinations as approvalsVerifyAllCombinations
} from "approvals/lib/Providers/Jest/CombinationApprovals";
import {currentConfig} from "approvals/lib/config";

export function verifyAllCombinations<T extends any[]>(
    func: Printer<T>,
    ...variations: VariationsForEachParameter<T>) {
    configureWebStormReporter();
    approvalsVerifyAllCombinations(func, ...variations);
    resetConfiguration()
}

function configureWebStormReporter() {
    const currentConfig = getCurrentConfig();
    currentConfig.reporters = [
        new WebStormReporter(),
        ...currentConfig.reporters,
    ];
    configure(currentConfig);
}

function resetConfiguration() {
    const currentConfig = getCurrentConfig();
    currentConfig.reporters = currentConfig.reporters.slice(1);
    configure(currentConfig);
}

function getCurrentConfig(){
    return JSON.parse(JSON.stringify(currentConfig()));
}
