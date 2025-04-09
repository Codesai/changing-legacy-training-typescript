import {Field} from "./Field";
import {Status} from "./Status";

export class GameStateDto {
    readonly playerXFields: Field[];
    readonly playerOFields: Field[];
    readonly status: Status;

    constructor(playerX: Field[], playerO: Field[], status: Status) {
        this.playerXFields = playerX;
        this.playerOFields = playerO;
        this.status = status;
    }
}
