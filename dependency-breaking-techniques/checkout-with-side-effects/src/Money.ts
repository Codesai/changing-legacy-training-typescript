export class Money {
    private readonly _value: number;

    constructor(value: number) {
        this._value = value;
    }

    add(other: Money): Money {
        return new Money(this._value + other._value);
    }

    percentage(p: number): Money {
        return new Money(this._value * p / 100);
    }

    format(): string {
        return `${this._value.toFixed(2)}`;
    }

    value(): number {
        return this._value;
    }

    toString(): string {
        return `Money { ${this._value} }`;
    }
}
