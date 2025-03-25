export class Money {
    public static readonly oneThousand = new Money(1000);
    public static readonly oneHundred = new Money(100);

    private readonly value: number;

    constructor(value: number) {
        this.value = value;
    }

    public reduceBy(percentage: number): Money {
        return new Money(this.value * (100 - percentage) / 100);
    }

    public moreThan(other: Money): boolean {
        return this.value > other.value;
    }
}
