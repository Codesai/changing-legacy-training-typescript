import {Sensor} from "./Sensor";

export class Alarm {
    private static readonly lowPressureThreshold: number = 17;
    private static readonly highPressureThreshold: number = 21;

    private readonly sensor: Sensor = new Sensor();
    private alarmOn: boolean = false;

    public check(): void {
        const psiPressureValue: number = this.sampleValue();

        if (psiPressureValue < Alarm.lowPressureThreshold || Alarm.highPressureThreshold < psiPressureValue) {
            if (!this.isAlarmOn()) {
                this.alarmOn = true;
                this.display("Alarm activated!");
            }
        } else {
            if (this.isAlarmOn()) {
                this.alarmOn = false;
                this.display("Alarm deactivated!");
            }
        }
    }

    protected sampleValue(): number {
        return this.sensor.popNextPressurePsiValue();
    }

    protected display(message: string): void {
        console.log(message);
    }

    private isAlarmOn(): boolean {
        return this.alarmOn;
    }
}