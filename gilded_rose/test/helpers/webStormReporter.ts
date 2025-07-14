import {GenericDiffReporterBase} from "approvals/lib/Reporting/GenericDiffReporterBase";
import {searchForExecutable} from "approvals/lib/AUtils";
import {Config} from "approvals/lib/config";

export class WebStormReporter extends GenericDiffReporterBase {

    constructor() {
        super("webstorm-reporter");
        this.exePath = searchForExecutable("webstorm");
    }

    isReporterAvailable(): boolean {
        if (process.env.MUTATION_TESTING && process.env.MUTATION_TESTING === "true") {
            return false;
        }
        return super.isReporterAvailable();
    }

    public report(
        approved: string,
        received: string,
        options: Partial<Config> = {},
    ): void {
        options.cmdArgs = ["diff", received, approved];
        return super.report(approved, received, options);
    }
}