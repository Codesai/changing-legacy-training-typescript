import {PlayerInteraction} from "./PlayerInteraction";
import {Turn} from "./Turn";

export class Game {
    private turn: Turn;

    public constructor(playerXInteraction: PlayerInteraction, playerOInteraction: PlayerInteraction) {
        this.turn = Turn.initial(playerXInteraction, playerOInteraction);
    }

    public start(): void {
        this.turn.showInitialMessage();
        this.startTurns();
    }

    private startTurns(): void {
        while (this.turn.canBePlayed()) {
            this.turn = this.turn.play();
        }
    }
}