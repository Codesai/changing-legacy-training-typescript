import {Input} from "./Input";
import {Output} from "./Output";

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

    private readonly inputX: Input;
    private readonly outputX: Output;
    private readonly inputO: Input;
    private readonly outputO: Output;
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

    constructor(inputX: Input, outputX: Output, inputO: Input, outputO: Output) {
        this.inputX = inputX;
        this.outputX = outputX;
        this.inputO = inputO;
        this.outputO = outputO;
        this.turn = Turn.X;
        this.playerXFields = [];
        this.playerOFields = [];
    }

    public start(): void {
        this.outputX.display(this.representGameState());
        while (
            !Game.hasWon(this.playerXFields) &&
            (this.playerXFields.length + this.playerOFields.length) !== 9 &&
            !Game.hasWon(this.playerOFields)
            ) {
            if (this.turn === Turn.X) {
                this.playerXFields.push(this.yourTurn(this.inputX, this.outputX));
                this.outputX.display(this.representGameState());
                this.outputO.display(this.representGameState());
                this.turn = Turn.O;
            } else {
                this.playerOFields.push(this.yourTurn(this.inputO, this.outputO));
                this.outputX.display(this.representGameState());
                this.outputO.display(this.representGameState());
                this.turn = Turn.X;
            }
        }
    }

    private representGameState(): string {
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

    private yourTurn(input: Input, output: Output): Field {
        output.display("your turn...");
        while (true) {
            const value = input.read();
            if (Game.fieldsByRepresentation.hasOwnProperty(value)) {
                return Game.fieldsByRepresentation[value];
            }

            output.display("invalid input, please try again");
        }
    }
}
