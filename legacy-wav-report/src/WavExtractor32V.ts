import fs from 'fs';
import path from 'path';

export class WavExtractor32V {
    public execute(filenames: string[], optional: string[]): void {
        const data: string[] = [];
        data.push("== Wave Extractor Report");

        filenames.forEach((filename) => {
            // Read-File //
            const bytes = fs.readFileSync(filename);

            if (bytes.length < 44) {
                throw new Error("File is not supported");
            }

            // File-Format //
            const fileFormat = bytes.toString('utf8', 0, 4);
            if (fileFormat !== "RIFF") {
                throw new Error("File format is not in RIFF");
            }

            // File-Type //
            const fileType = bytes.toString('utf8', 8, 12);
            if (fileType !== "WAVE") {
                throw new Error("File type is not WAVE");
            }

            // Format-Chunk  //
            const fmtChunk = bytes.toString('utf8', 12, 16);
            if (fmtChunk !== "fmt ") {
                throw new Error("Format chunk missing");
            }

            // Format-Chunk-Length //
            const fmtLength = bytes.readInt32LE(16);
            if (fmtLength !== 16) {
                throw new Error("Format chunk length not PCM");
            }

            // Audio-Format //
            const audioFormat = bytes.readInt16LE(20);
            if (audioFormat !== 1) {
                throw new Error("Audio format not PCM");
            }

            const name = path.basename(filename);
            const channels = bytes.readInt16LE(22);
            const sampleRate = bytes.readInt32LE(24);
            const byteRate = bytes.readInt32LE(28);

            data.push(`Name:${name}, Channels:${channels}, SampleRate:${sampleRate}, ByteRate:${byteRate}`);
        });

        data.push(`== Total files: ${filenames.length}`);

        fs.writeFileSync("wav-extractor-data.txt", data.join("\n"));
    }
}
