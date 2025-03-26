import {aGameStateDto, GameStateDtoBuilder, initialGameStateDto} from "../helpers/GameStateDtoBuilder";
import {Field} from "../../src/Field";
import {GameStateDto} from "../../src/GameStateDto";
import {Game} from "../../src/Game";
import {PlayerInteraction} from "../../src/PlayerInteraction";

describe("Tic Tac Toe", () => {
    let playerXInteraction: jest.Mocked<PlayerInteraction>;
    let playerOInteraction: jest.Mocked<PlayerInteraction>;
    let game: Game;
    let gameDto: GameStateDtoBuilder;

    beforeEach(() => {
        playerXInteraction = {
            display: jest.fn(),
            yourTurn: jest.fn(),
        };
        playerOInteraction = {
            display: jest.fn(),
            yourTurn: jest.fn(),
        };
        gameDto = aGameStateDto();
        game = new Game(playerXInteraction, playerOInteraction);
    });

    it("player X wins after her third turn", () => {
        playerXInteraction.yourTurn
            .mockReturnValueOnce(Field.One)
            .mockReturnValueOnce(Field.Two)
            .mockReturnValueOnce(Field.Three);
        playerOInteraction.yourTurn
            .mockReturnValueOnce(Field.Four)
            .mockReturnValueOnce(Field.Five);

        game.start();

        expectInitialDisplay();
        expectPlayerTurn(1, gameDto.addingFieldToX(Field.One).build());
        expectPlayerTurn(2, gameDto.addingFieldToO(Field.Four).build());
        expectPlayerTurn(3, gameDto.addingFieldToX(Field.Two).build());
        expectPlayerTurn(4, gameDto.addingFieldToO(Field.Five).build());
        expectPlayerTurn(5, gameDto.addingFieldToX(Field.Three).winningPlayerX().build());
    });

    it("player O wins after her third turn", () => {
        playerXInteraction.yourTurn
            .mockReturnValueOnce(Field.Four)
            .mockReturnValueOnce(Field.Five)
            .mockReturnValueOnce(Field.Seven);
        playerOInteraction.yourTurn
            .mockReturnValueOnce(Field.One)
            .mockReturnValueOnce(Field.Two)
            .mockReturnValueOnce(Field.Three);

        game.start();

        expectInitialDisplay();
        expectPlayerTurn(1, gameDto.addingFieldToX(Field.Four).build());
        expectPlayerTurn(2, gameDto.addingFieldToO(Field.One).build());
        expectPlayerTurn(3, gameDto.addingFieldToX(Field.Five).build());
        expectPlayerTurn(4, gameDto.addingFieldToO(Field.Two).build());
        expectPlayerTurn(5, gameDto.addingFieldToX(Field.Seven).build());
        expectPlayerTurn(6, gameDto.addingFieldToO(Field.Three).winningPlayerO().build());
    });

    it("there is a draw when X1 → O5 → X9 → O2 → X8 → O7 → X3 → O6 → X4", () => {
        playerXInteraction.yourTurn
            .mockReturnValueOnce(Field.One)
            .mockReturnValueOnce(Field.Nine)
            .mockReturnValueOnce(Field.Eight)
            .mockReturnValueOnce(Field.Three)
            .mockReturnValueOnce(Field.Four);
        playerOInteraction.yourTurn
            .mockReturnValueOnce(Field.Five)
            .mockReturnValueOnce(Field.Two)
            .mockReturnValueOnce(Field.Seven)
            .mockReturnValueOnce(Field.Six);

        game.start();

        expectInitialDisplay();
        expectPlayerTurn(1, gameDto.addingFieldToX(Field.One).build());
        expectPlayerTurn(2, gameDto.addingFieldToO(Field.Five).build());
        expectPlayerTurn(3, gameDto.addingFieldToX(Field.Nine).build());
        expectPlayerTurn(4, gameDto.addingFieldToO(Field.Two).build());
        expectPlayerTurn(5, gameDto.addingFieldToX(Field.Eight).build());
        expectPlayerTurn(6, gameDto.addingFieldToO(Field.Seven).build());
        expectPlayerTurn(7, gameDto.addingFieldToX(Field.Three).build());
        expectPlayerTurn(8, gameDto.addingFieldToO(Field.Six).build());
        expectPlayerTurn(9, gameDto.addingFieldToX(Field.Four).withNoOneWinning().build());
    })

    function expectPlayerTurn(turnNumber: number, gameStateDto: GameStateDto): void {
        expect(playerXInteraction.display.mock.calls[turnNumber][0]).toEqual(gameStateDto);
        expect(playerOInteraction.display.mock.calls[turnNumber - 1][0]).toEqual(gameStateDto);
    }

    function expectInitialDisplay(): void {
        expect(playerXInteraction.display.mock.calls[0][0]).toEqual(initialGameStateDto());
    }
});
