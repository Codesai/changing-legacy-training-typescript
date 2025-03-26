import {Field} from "./Field";
import {Status} from "./Status";

export class GameStateDto {
    public readonly playerXFields: Field[];
    public readonly playerOFields: Field[];
    public readonly status: Status;

    constructor(playerX: Field[], playerO: Field[], status: Status) {
        this.playerXFields = playerX;
        this.playerOFields = playerO;
        this.status = status;
    }
}
