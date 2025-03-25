import {Money} from "./Money";

export class Receipt {
    public readonly amount: Money;
    public readonly tax: Money;
    public readonly total: Money;

    constructor(amount: Money, tax: Money, total: Money) {
        this.amount = amount;
        this.tax = tax;
        this.total = total;
    }

    public format(): string[] {
        return [
            //
            "Receipt", //
            "=======", //
            "Item 1 ... " + this.amount.format(), //
            "Tax    ... " + this.tax.format(), //
            "----------------", //
            "Total  ... " + this.total.format() //
        ];
    }
}
