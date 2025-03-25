export class Person {
    private readonly name: string;
    private readonly surname: string;

    constructor(name: string, surname: string) {
        this.name = name;
        this.surname = surname;
    }

    public toString(): string {
        return `name: ${this.name}, surname: ${this.surname}`;
    }
}
