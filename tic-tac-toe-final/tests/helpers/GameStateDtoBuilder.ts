import {GameStateDto} from "../../src/GameStateDto";
import {Field} from "../../src/Field";
import {Status} from "../../src/Status";

export function initialGameStateDto(): GameStateDto {
    return GameStateDtoBuilder.aGameStateDto().build()
}

export function aGameStateDto(): GameStateDtoBuilder {
    return GameStateDtoBuilder.aGameStateDto();
}

export class GameStateDtoBuilder {
    private _playerX: Field[] = [];
    private _playerO: Field[] = [];
    private _status: Status;

    private constructor() {
        this._playerX = [];
        this._playerO = [];
        this._status = Status.OnGoing
    }

    static aGameStateDto(): GameStateDtoBuilder {
        return new GameStateDtoBuilder();
    }

    addingFieldToX(field: Field): GameStateDtoBuilder {
        this._playerX.push(field);
        return this;
    }

    addingFieldToO(field: Field): GameStateDtoBuilder {
        this._playerO.push(field);
        return this;
    }

    withFieldsWithX(...playerX: Field[]): GameStateDtoBuilder {
        this._playerX = playerX;
        return this;
    }

    withFieldsWithO(...playerO: Field[]): GameStateDtoBuilder {
        this._playerO = playerO;
        return this;
    }

    winningPlayerX(): GameStateDtoBuilder {
        this._status = Status.X_Wins;
        return this;
    }

    winningPlayerO(): GameStateDtoBuilder {
        this._status = Status.O_Wins;
        return this;
    }

    withNoOneWinning(): GameStateDtoBuilder {
        this._status = Status.Draw;
        return this;
    }

    build(): GameStateDto {
        return new GameStateDto(this._playerX, this._playerO, this._status);
    }
}