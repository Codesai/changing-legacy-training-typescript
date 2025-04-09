export class Product {
    private readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    toString(): string {
        return this.getName();
    }

    getName(): string {
        return this.name;
    }
}