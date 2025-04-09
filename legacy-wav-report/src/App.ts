import {WavExtractorFactory} from "./WavExtractorFactory";
import fs from "fs";
import path from "path";

export class App {
    static main(args: string[]): void {
        if (args.length === 0) {
            throw new Error("You must provide a directory");
        }

        console.log("Executing WavExtractor...");
        this.execute(args);
        console.log("Finish WavExtractor");
    }

    private static execute(args: string[]): void {
        const wavExtractor = WavExtractorFactory.get();
        const optional = args.slice(1);
        const files = fs.readdirSync(args[0]).map((file: any) => path.join(args[0], file));
        wavExtractor.execute(files, optional);
    }
}