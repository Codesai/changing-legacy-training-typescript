import {GameStateDto} from "./GameStateDto";
import {Field} from "./Field";
import {PlayerInteraction} from "./PlayerInteraction";

export class Player {
    private readonly winningCombinations: Field[][] = [
        [Field.One, Field.Two, Field.Three],
        [Field.Four, Field.Five, Field.Six],
        [Field.Seven, Field.Eight, Field.Nine],
        [Field.One, Field.Four, Field.Seven],
        [Field.Two, Field.Five, Field.Eight],
        [Field.Three, Field.Six, Field.Nine],
        [Field.One, Field.Five, Field.Nine],
        [Field.Three, Field.Five, Field.Seven]
    ];

    private readonly fields: Field[];
    private readonly playerInteraction: PlayerInteraction;

    constructor(fields: Field[], playerInteraction: PlayerInteraction) {
        this.fields = fields;
        this.playerInteraction = playerInteraction;
    }

    hasWon(): boolean {
        return this.winningCombinations.some(combination =>
            combination.every(field => this.owns(field))
        );
    }

    playTurn(): void {
        this.addField(this.playerInteraction.yourTurn());
    }

    toDto(): Field[] {
        return [...this.fields];
    }

    numberOfFields(): number {
        return this.fields.length;
    }

    see(gameStateDto: GameStateDto): void {
        this.playerInteraction.display(gameStateDto);
    }

    private addField(field: Field): void {
        this.fields.push(field);
    }

    private owns(field: Field): boolean {
        return this.fields.includes(field);
    }
}
