import {Input} from "./Input";
import {Output} from "./Output";
import {PlayerInteraction} from "./PlayerInteraction";
import {Field} from "./Field";
import {GameStateDto, OnGoing, Over} from "./GameStateDto";

export class TextBasedPlayerInteraction implements PlayerInteraction {
    private readonly input: Input;
    private readonly output: Output;
    private readonly prompt: string;

    constructor(input: Input, output: Output, prompt: string = "") {
        this.input = input;
        this.output = output;
        this.prompt = prompt;
    }

    static createForX(input: Input, output: Output): TextBasedPlayerInteraction {
        return new TextBasedPlayerInteraction(input, output, "X:\n");
    }

    static createForO(input: Input, output: Output): TextBasedPlayerInteraction {
        return new TextBasedPlayerInteraction(input, output, "O:\n");
    }

    yourTurn(): Field {
        this.output.display(this.prompt + "your turn...");
        while (true) {
            const input = this.input.read();
            if (FieldsRepresentations.exists(input)) {
                return FieldsRepresentations.get(input);
            }

            this.output.display(this.prompt + "invalid input, please try again");
        }
    }

    display(gameStateDto: GameStateDto): void {
        this.output.display(this.prompt + this.representGameState(gameStateDto));
    }

    representGameState(gameStateDto: GameStateDto): string {
        return new GameStateRepresentation(gameStateDto).create();
    }
}

class GameStateRepresentation {
    private readonly board: string[][];
    private readonly gameStateDto: GameStateDto;

    constructor(gameStateDto: GameStateDto) {
        this.board = [
            ["1", "2", "3"],
            ["4", "5", "6"],
            ["7", "8", "9"]
        ];
        this.gameStateDto = gameStateDto;
    }

    private static composeGameOverMessage(gameStatus: Over): string {
        if (gameStatus.winsPlayerO()) {
            return "O wins!\n";
        }
        if (gameStatus.winsPlayerX()) {
            return "X wins!\n";
        }
        return "Draw!\n";
    }

    create(): string {
        return this.representBoard() + this.composeFinalMessage();
    }

    private representBoard(): string {
        return this.fillBoard()
            .map(this.representRow)
            .join("---------\n");
    }

    private representRow(row: string[]): string {
        return row.join(" | ") + "\n";
    }

    private fillBoard(): string[][] {
        return this.board.map(row => row.map(field => this.representField(field)));
    }

    private representField(fieldString: string): string {
        const field = FieldsRepresentations.get(fieldString);

        if (this.gameStateDto.playerXFields.includes(field)) {
            return "X";
        }

        if (this.gameStateDto.playerOFields.includes(field)) {
            return "O";
        }

        return fieldString;
    }

    private composeFinalMessage(): string {
        const gameStatus: Over | OnGoing = this.gameStateDto.status;
        if (gameStatus instanceof OnGoing) {
            return "";
        }
        return GameStateRepresentation.composeGameOverMessage(gameStatus);
    }
}

class FieldsRepresentations {
    private static readonly fieldsByRepresentation: Record<string, Field> = {
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

    public static get(field: string): Field {
        return this.fieldsByRepresentation[field];
    }

    public static exists(field: string): boolean {
        return field in this.fieldsByRepresentation;
    }
}