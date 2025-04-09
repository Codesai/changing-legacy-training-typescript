export class Money {
    private readonly amount: number;

    constructor(amount: number) {
        this.amount = amount;
    }

    add(other: Money): Money {
        return new Money(this.amount + other.amount);
    }

    percentage(percentage: number): Money {
        return new Money(this.amount * percentage / 100);
    }

    format(): string {
        return `${this.amount.toFixed(2)}`;
    }

    getAmount(): number {
        return this.amount;
    }

    toString(): string {
        return `Money { ${this.amount} }`;
    }
}
