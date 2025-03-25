export class Money {
    private readonly _value: number;

    constructor(value: number) {
        this._value = value;
    }

    public add(other: Money): Money {
        return new Money(this._value + other._value);
    }

    public percentage(p: number): Money {
        return new Money(this._value * p / 100);
    }

    public format(): string {
        return `${this._value.toFixed(2)}`;
    }

    value(): number {
        return this._value;
    }

    public toString(): string {
        return `Money { ${this._value} }`;
    }
}
