import {GameStateDto} from "./GameStateDto";
import {Player} from "./Player";
import {PlayerInteraction} from "./PlayerInteraction";
import {Status} from "./Status";

export abstract class Turn {
    private readonly _currentPlayer: Player;
    private readonly _otherPlayer: Player;

    protected constructor(currentPlayer: Player, otherPlayer: Player) {
        this._currentPlayer = currentPlayer;
        this._otherPlayer = otherPlayer;
    }

    public static initial(xPlayerInteraction: PlayerInteraction, oPlayerInteraction: PlayerInteraction): Turn {
        const xPlayer = new Player([], xPlayerInteraction);
        const oPlayer = new Player([], oPlayerInteraction);
        const turnForX = new TurnForX(xPlayer, oPlayer);
        xPlayer.see(turnForX.toDto());
        return turnForX;
    }

    public play(): Turn {
        this._currentPlayer.playTurn();
        this.displayStateAfterTurn();
        return this.next();
    }

    public canBePlayed(): boolean {
        return this.thereIsNoWinnerYet() && this.boardIsNotFull();
    }

    protected abstract next(): Turn;

    protected currentPlayer(): Player {
        return this._currentPlayer;
    }

    protected otherPlayer(): Player {
        return this._otherPlayer;
    }

    protected abstract getWinnerStatus(): Status;

    protected abstract getPlayerX(): Player;

    protected abstract getPlayerO(): Player;

    private thereIsNoWinnerYet(): boolean {
        return !this._currentPlayer.hasWon() && !this._otherPlayer.hasWon();
    }

    private boardIsNotFull(): boolean {
        return !((this._currentPlayer.numberOfFields() + this._otherPlayer.numberOfFields()) === 9);
    }

    private displayStateAfterTurn(): void {
        const dto = this.toDto();
        this._currentPlayer.see(dto);
        this._otherPlayer.see(dto);
    }

    private toDto(): GameStateDto {
        if (this._currentPlayer.hasWon()) {
            return this.createWinningDto();
        }
        if (this.canBePlayed()) {
            return this.onGoingDto();
        }
        return this.noWinnerDto();
    }

    private createWinningDto(): GameStateDto {
        return GameStateDto.winning(this.getPlayerX().toDto(), this.getPlayerO().toDto(), this.getWinnerStatus());
    }

    private noWinnerDto(): GameStateDto {
        return GameStateDto.noWinner(this.getPlayerX().toDto(), this.getPlayerO().toDto());
    }

    private onGoingDto(): GameStateDto {
        return GameStateDto.onGoingGame(this.getPlayerX().toDto(), this.getPlayerO().toDto());
    }
}

class TurnForO extends Turn {
    public constructor(currentPlayer: Player, otherPlayer: Player) {
        super(currentPlayer, otherPlayer);
    }

    protected override next(): Turn {
        return new TurnForX(this.otherPlayer(), this.currentPlayer());
    }

    protected override getPlayerX(): Player {
        return this.otherPlayer();
    }

    protected override getPlayerO(): Player {
        return this.currentPlayer();
    }

    protected override getWinnerStatus(): Status {
        return Status.O_Wins;
    }
}

class TurnForX extends Turn {
    public constructor(currentPlayer: Player, otherPlayer: Player) {
        super(currentPlayer, otherPlayer);
    }

    protected override next(): Turn {
        return new TurnForO(this.otherPlayer(), this.currentPlayer());
    }

    protected override getPlayerX(): Player {
        return this.currentPlayer();
    }

    protected override getPlayerO(): Player {
        return this.otherPlayer();
    }

    protected override getWinnerStatus(): Status {
        return Status.X_Wins;
    }
}