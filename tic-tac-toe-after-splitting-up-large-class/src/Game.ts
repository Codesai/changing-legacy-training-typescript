import {PlayerInteraction} from "./PlayerInteraction";
import {Player} from "./Player";
import {GameStateDto} from "./GameStateDto";

enum Turn {
    X,
    O
}

export class Game {
    private turn: Turn;
    private readonly playerX: Player;
    private readonly playerO: Player;

    constructor(playerXInteraction: PlayerInteraction, playerOInteraction: PlayerInteraction) {
        this.turn = Turn.X;
        this.playerX = new Player([], playerXInteraction);
        this.playerO = new Player([], playerOInteraction);
    }

    start(): void {
        this.playerX.see(this.toDto());
        this.startTurns();
    }

    private startTurns(): void {
        while (this.isOnGoing())
            if (this.turn === Turn.X) {
                this.playTurn(this.playerX);
                this.turn = Turn.O;
            } else {
                this.playTurn(this.playerO);
                this.turn = Turn.X;
            }
    }

    private playTurn(player: Player): void {
        player.playTurn();
        this.displayStateAfterTurn();
    }

    private isOnGoing(): boolean {
        return !this.playerX.hasWon() &&
            !this.isBoardFull() &&
            !this.playerO.hasWon();
    }

    private displayStateAfterTurn(): void {
        this.playerX.see(this.toDto());
        this.playerO.see(this.toDto());
    }

    private toDto(): GameStateDto {
        const playerXFields = this.playerX.toDto();
        const playerOFields = this.playerO.toDto();

        if (this.playerX.hasWon()) {
            return GameStateDto.winningX(playerXFields, playerOFields);
        }
        if (this.isBoardFull()) {
            return GameStateDto.noWinner(playerXFields, playerOFields);
        }
        if (this.playerO.hasWon()) {
            return GameStateDto.winningO(playerXFields, playerOFields);
        }
        return GameStateDto.onGoingGame(playerXFields, playerOFields);
    }

    private isBoardFull(): boolean {
        return this.playerX.numberOfFields() + this.playerO.numberOfFields() === 9;
    }
}
