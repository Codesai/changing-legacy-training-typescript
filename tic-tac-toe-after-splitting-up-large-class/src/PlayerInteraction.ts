import {Field} from "./Field";
import {GameStateDto} from "./GameStateDto";

export interface PlayerInteraction {
    yourTurn(): Field;

    display(gameStateDto: GameStateDto): void;
}