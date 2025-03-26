import input from "readline-sync";

enum Turn {
    X,
    O
}

export enum Field {
    One,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine
}

export class Game {

    private readonly playerXFields: Field[];
    private readonly playerOFields: Field[];
    private turn: Turn;

    private static readonly fieldsByRepresentation: { [key: string]: Field } = {
        "1": Field.One,
        "2": Field.Two,
        "3": Field.Three,
        "4": Field.Four,
        "5": Field.Five,
        "6": Field.Six,
        "7": Field.Seven,
        "8": Field.Eight,
        "9": Field.Nine
    };

    private static readonly winningCombinations: Field[][] = [
        [Field.One, Field.Two, Field.Three],
        [Field.Four, Field.Five, Field.Six],
        [Field.Seven, Field.Eight, Field.Nine],
        [Field.One, Field.Four, Field.Seven],
        [Field.Two, Field.Five, Field.Eight],
        [Field.Three, Field.Six, Field.Nine],
        [Field.One, Field.Five, Field.Nine],
        [Field.Three, Field.Five, Field.Seven]
    ];

    constructor() {
        this.turn = Turn.X;
        this.playerXFields = [];
        this.playerOFields = [];
    }

    public start(): void {
        this.showToPlayerX("X:\n" + this.printBoard());
        while (
            !Game.hasWon(this.playerXFields) && (this.playerXFields.length + this.playerOFields.length) !== 9 && !Game.hasWon(this.playerOFields)
            ) {
            if (this.turn === Turn.X) {
                this.showToPlayerX("X:\n" + "your turn...");
                let field: Field;
                while (true) {
                    const value = this.readInputOfPlayerX();
                    if (Game.fieldsByRepresentation.hasOwnProperty(value)) {
                        field = Game.fieldsByRepresentation[value];
                        break;
                    }
                    this.showToPlayerX("X:\n" + "invalid input, please try again");
                }
                this.playerXFields.push(field);
                this.showToPlayerX("X:\n" + this.printBoard());
                this.showToPlayerO("O:\n" + this.printBoard());
                this.turn = Turn.O;
            } else {
                this.showToPlayerO("O:\n" + "your turn...");
                let field: Field;
                while (true) {
                    const value = this.readInputOfPlayerO();
                    if (Game.fieldsByRepresentation.hasOwnProperty(value)) {
                        field = Game.fieldsByRepresentation[value];
                        break;
                    }
                    this.showToPlayerO("O:\n" + "invalid input, please try again");
                }
                this.playerOFields.push(field);
                this.showToPlayerX("X:\n" + this.printBoard());
                this.showToPlayerO("O:\n" + this.printBoard());
                this.turn = Turn.X;
            }
        }
    }

    protected readInputOfPlayerO(): string {
        return input.question();
    }

    protected readInputOfPlayerX(): string {
        return input.question();
    }

    protected showToPlayerX(text: string): void {
        console.log(text);
    }

    protected showToPlayerO(text: string): void {
        console.log(text);
    }

    private printBoard(): string {
        const board = [
            ["1", "2", "3"],
            ["4", "5", "6"],
            ["7", "8", "9"]
        ];

        let res = board
            .map(row =>
                row
                    .map(s => {
                        const field = Game.fieldsByRepresentation[s];

                        if (this.playerXFields.includes(field)) {
                            return "X";
                        }

                        if (this.playerOFields.includes(field)) {
                            return "O";
                        }

                        return s;
                    })
                    .join(" | ")
            )
            .join("\n---------\n") + "\n";

        if (
            !Game.hasWon(this.playerXFields) &&
            (this.playerXFields.length + this.playerOFields.length) !== 9 &&
            !Game.hasWon(this.playerOFields)
        ) {
            res += "";
        } else if (Game.hasWon(this.playerOFields)) {
            res += "O wins!\n";
        } else if (Game.hasWon(this.playerXFields)) {
            res += "X wins!\n";
        } else {
            res += "Draw!\n";
        }

        return res;
    }

    public static hasWon(fields: Field[]): boolean {
        return Game.winningCombinations.some(combination =>
            combination.every(field => fields.includes(field))
        );
    }
}
