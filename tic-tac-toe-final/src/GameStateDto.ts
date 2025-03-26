import {Field} from "./Field";

enum Result {
    X_Wins,
    O_Wins,
    Draw,
}

export class Over {
    public readonly result: Result;

    private constructor(result: Result) {
        this.result = result;
    }

    static X_Wins(): Over {
        return new Over(Result.X_Wins);
    }

    static O_Wins(): Over {
        return new Over(Result.O_Wins);
    }

    static Draw(): Over {
        return new Over(Result.Draw);
    }

    winsPlayerO(): boolean {
        return this.result === Result.O_Wins;
    }

    winsPlayerX(): boolean {
        return this.result === Result.X_Wins;
    }
}

export class OnGoing {
}

export class GameStateDto {
    public readonly playerXFields: Field[];
    public readonly playerOFields: Field[];
    public readonly status: Over | OnGoing;

    constructor(playerX: Field[], playerO: Field[], status: Over | OnGoing = new OnGoing()) {
        this.playerXFields = playerX;
        this.playerOFields = playerO;
        this.status = status;
    }

    static winningX(playerX: Field[], playerO: Field[]): GameStateDto {
        return new GameStateDto(playerX, playerO, Over.X_Wins())
    }

    static winningO(playerX: Field[], playerO: Field[]): GameStateDto {
        return new GameStateDto(playerX, playerO, Over.O_Wins())
    }

    static noWinner(playerX: Field[], playerO: Field[]): GameStateDto {
        return new GameStateDto(playerX, playerO, Over.Draw())
    }

    static onGoingGame(playerX: Field[], playerO: Field[]): GameStateDto {
        return new GameStateDto(playerX, playerO, new OnGoing())
    }
}