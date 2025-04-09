export class Sensor {
    private static readonly offset: number = 16;

    private static samplePressure(): number {
        // placeholder implementation that simulates a real sensor in a real tire
        return 6 * Math.random() * Math.random();
    }

    public popNextPressurePsiValue(): number {
        const pressureTelemetryValue: number = Sensor.samplePressure();

        return Sensor.offset + pressureTelemetryValue;
    }
}