import {WavExtractor32V} from "./WavExtractor32V";

export class WavExtractorFactory {
    static get(): WavExtractor32V {
        return new WavExtractor32V();
    }
}