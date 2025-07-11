import {WebStormReporter} from "./webStormReporter";
import {verifyAsJson as verifyAsJsonWithJest} from "approvals/lib/Providers/Jest/JestApprovals";
import {Options} from "approvals/lib/Core/Options";

export function verifyAsJson(data: any[]) {
    verifyAsJsonWithJest(data, new Options().withReporter(new WebStormReporter()));
}