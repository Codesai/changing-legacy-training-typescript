import {GameStateDto} from "./GameStateDto";
import {Player} from "./Player";
import {PlayerInteraction} from "./PlayerInteraction";

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
        return new TurnForX(xPlayer, oPlayer);
    }

    public play(): Turn {
        this._currentPlayer.playTurn();
        this.displayStateAfterTurn();
        return this.next();
    }

    public abstract showInitialMessage(): void;

    public canBePlayed(): boolean {
        return !this._currentPlayer.hasWon() && !this.isBoardFull() && !this._otherPlayer.hasWon();
    }

    protected abstract next(): Turn;

    protected abstract createWinningDto(): GameStateDto;

    protected abstract noWinnerDto(): GameStateDto ;

    protected abstract onGoingDto(): GameStateDto;

    protected currentPlayer(): Player {
        return this._currentPlayer;
    }

    protected otherPlayer(): Player {
        return this._otherPlayer;
    }

    protected toDto(): GameStateDto {
        if (this._currentPlayer.hasWon()) {
            return this.createWinningDto();
        }
        if (this.canBePlayed()) {
            return this.onGoingDto();
        }
        return this.noWinnerDto();
    }

    private displayStateAfterTurn(): void {
        const dto = this.toDto();
        this._currentPlayer.see(dto);
        this._otherPlayer.see(dto);
    }

    private isBoardFull(): boolean {
        return (this._currentPlayer.numberOfFields() + this._otherPlayer.numberOfFields()) === 9;
    }
}

class TurnForO extends Turn {
    public constructor(currentPlayer: Player, otherPlayer: Player) {
        super(currentPlayer, otherPlayer);
    }

    public showInitialMessage(): void {

    }

    protected override next(): Turn {
        return new TurnForX(this.otherPlayer(), this.currentPlayer());
    }

    protected override createWinningDto(): GameStateDto {
        return GameStateDto.winningO(this.otherPlayer().toDto(), this.currentPlayer().toDto());
    }

    protected noWinnerDto(): GameStateDto {
        return GameStateDto.noWinner(this.otherPlayer().toDto(), this.currentPlayer().toDto());
    }

    protected onGoingDto(): GameStateDto {
        return GameStateDto.onGoingGame(this.otherPlayer().toDto(), this.currentPlayer().toDto());
    }
}

class TurnForX extends Turn {
    public constructor(currentPlayer: Player, otherPlayer: Player) {
        super(currentPlayer, otherPlayer);
    }

    public showInitialMessage(): void {
        this.currentPlayer().see(this.toDto());
    }

    protected override next(): Turn {
        return new TurnForO(this.otherPlayer(), this.currentPlayer());
    }

    protected override createWinningDto(): GameStateDto {
        return GameStateDto.winningX(this.currentPlayer().toDto(), this.otherPlayer().toDto());
    }

    protected noWinnerDto(): GameStateDto {
        return GameStateDto.noWinner(this.currentPlayer().toDto(), this.otherPlayer().toDto());
    }

    protected onGoingDto(): GameStateDto {
        return GameStateDto.onGoingGame(this.currentPlayer().toDto(), this.otherPlayer().toDto());
    }
}