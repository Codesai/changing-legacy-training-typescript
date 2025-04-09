import {Alarm} from "../src/Alarm";


describe("Alarm", () => {
    const lowestSafePressure: number = 17;
    const highestSafePressure: number = 21;
    const tooLowPressure: number = lowestSafePressure - 1;
    const tooHighPressure: number = highestSafePressure + 1;
    let alarm: AlarmForTesting;

    it("activates when sampled pressure is too low", () => {
        alarm = anAlarmThatSamples(tooLowPressure);

        alarm.check();

        expectThatDisplayedMessagesWere("Alarm activated!");
    });

    it.each([
        [lowestSafePressure],
        [highestSafePressure]
    ])("does not activate when sampled pressure is safe (sampledPressure: %s)", (sampledPressure: number) => {
        alarm = anAlarmThatSamples(sampledPressure);

        alarm.check();

        expectThatThereWereNoDisplayedMessages();
    });

    it("activates when sampled pressure is too high", () => {
        alarm = anAlarmThatSamples(tooHighPressure);

        alarm.check();

        expectThatDisplayedMessagesWere("Alarm activated!");
    });

    it("deactivates after being activated when sampled pressure is safe", () => {
        alarm = anAlarmThatSamples(tooHighPressure, lowestSafePressure);
        alarm.check();

        alarm.check();

        expectThatDisplayedMessagesWere("Alarm activated!", "Alarm deactivated!");
    });

    function anAlarmThatSamples(...pressureValues: number[]): AlarmForTesting {
        return new AlarmForTesting(...pressureValues);
    }

    function expectThatDisplayedMessagesWere(...messages: string[]): void {
        expect(alarm.displayedMessages.length).toBe(messages.length);
        for (let i = 0; i < messages.length; i++) {
            expect(alarm.displayedMessages[i]).toBe(messages[i]);
        }
    }

    function expectThatThereWereNoDisplayedMessages(): void {
        expectThatDisplayedMessagesWere();
    }
});

class AlarmForTesting extends Alarm {
    public readonly displayedMessages: string[];
    private readonly sampledValues: number[];

    constructor(...pressureValues: number[]) {
        super();
        this.sampledValues = [...pressureValues];
        this.displayedMessages = [];
    }

    protected override sampleValue(): number {
        const value = this.sampledValues.shift();
        if (!value) {
            throw new Error("Not enough sampled values for this test!");
        }
        return value;
    }

    protected override display(message: string): void {
        this.displayedMessages.push(message);
    }
}
