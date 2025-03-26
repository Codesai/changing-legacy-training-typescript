import {Game} from "../src/Game";

describe("a Tic Tac Toe game on the console", () => {
    let showXCalls: number;
    let showOCalls: number;
    let game2: ForTestingGame;

    beforeEach(() => {
        showXCalls = 0;
        showOCalls = 0;
    });

    it("player X wins after her third turn", () => {
        game2 = new ForTestingGame(["1", "2", "3"], ["4", "5"]);

        game2.start();

        expectInitialDisplay();
        expectTurnForPlayerX(
            "X | 2 | 3\n" +
            "---------\n" +
            "4 | 5 | 6\n" +
            "---------\n" +
            "7 | 8 | 9\n"
        );
        expectTurnForPlayerO(
            "X | 2 | 3\n" +
            "---------\n" +
            "O | 5 | 6\n" +
            "---------\n" +
            "7 | 8 | 9\n",
        );
        expectTurnForPlayerX(
            "X | X | 3\n" +
            "---------\n" +
            "O | 5 | 6\n" +
            "---------\n" +
            "7 | 8 | 9\n",
        );
        expectTurnForPlayerO(
            "X | X | 3\n" +
            "---------\n" +
            "O | O | 6\n" +
            "---------\n" +
            "7 | 8 | 9\n",
        );
        expectTurnForPlayerX(
            "X | X | X\n" +
            "---------\n" +
            "O | O | 6\n" +
            "---------\n" +
            "7 | 8 | 9\n" +
            "X wins!\n",
        );
    });

    xit("player O wins after her third turn", () => {
        game2 = new ForTestingGame(["4", "5", "7"], ["1", "2", "3"]);

        game2.start();

        expectInitialDisplay();
        expectTurnForPlayerX(
            "1 | 2 | 3\n" +
            "---------\n" +
            "X | 5 | 6\n" +
            "---------\n" +
            "7 | 8 | 9\n",
        );
        expectTurnForPlayerO(
            "O | 2 | 3\n" +
            "---------\n" +
            "X | 5 | 6\n" +
            "---------\n" +
            "7 | 8 | 9\n",
        );
        expectTurnForPlayerX(
            "O | 2 | 3\n" +
            "---------\n" +
            "X | X | 6\n" +
            "---------\n" +
            "7 | 8 | 9\n",
        );
        expectTurnForPlayerO(
            "O | O | 3\n" +
            "---------\n" +
            "X | X | 6\n" +
            "---------\n" +
            "7 | 8 | 9\n",
        );
        expectTurnForPlayerX(
            "O | O | 3\n" +
            "---------\n" +
            "X | X | 6\n" +
            "---------\n" +
            "X | 8 | 9\n",
        );
        expectTurnForPlayerO(
            "O | O | O\n" +
            "---------\n" +
            "X | X | 6\n" +
            "---------\n" +
            "X | 8 | 9\n" +
            "O wins!\n",
        );
    });

    xit("there is a draw when X1 → O5 → X9 → O2 → X8 → O7 → X3 → O6 → X4", () => {
        game2 = new ForTestingGame(["1", "9", "8", "3", "4"], ["5", "2", "7", "6"]);

        game2.start();

        expectInitialDisplay();
        expectTurnForPlayerX(
            "X | 2 | 3\n" +
            "---------\n" +
            "4 | 5 | 6\n" +
            "---------\n" +
            "7 | 8 | 9\n"
        );
        expectTurnForPlayerO(
            "X | 2 | 3\n" +
            "---------\n" +
            "4 | O | 6\n" +
            "---------\n" +
            "7 | 8 | 9\n",
        );
        expectTurnForPlayerX(
            "X | 2 | 3\n" +
            "---------\n" +
            "4 | O | 6\n" +
            "---------\n" +
            "7 | 8 | X\n",
        );
        expectTurnForPlayerO(
            "X | O | 3\n" +
            "---------\n" +
            "4 | O | 6\n" +
            "---------\n" +
            "7 | 8 | X\n",
        );
        expectTurnForPlayerX(
            "X | O | 3\n" +
            "---------\n" +
            "4 | O | 6\n" +
            "---------\n" +
            "7 | X | X\n",
        );
        expectTurnForPlayerO(
            "X | O | 3\n" +
            "---------\n" +
            "4 | O | 6\n" +
            "---------\n" +
            "O | X | X\n",
        );
        expectTurnForPlayerX(
            "X | O | X\n" +
            "---------\n" +
            "4 | O | 6\n" +
            "---------\n" +
            "O | X | X\n",
        );
        expectTurnForPlayerO(
            "X | O | X\n" +
            "---------\n" +
            "4 | O | O\n" +
            "---------\n" +
            "O | X | X\n",
        );
        expectTurnForPlayerX(
            "X | O | X\n" +
            "---------\n" +
            "X | O | O\n" +
            "---------\n" +
            "O | X | X\n" +
            "Draw!\n",
        );
    })

    function expectInitialDisplay(): void {
        expect(game2.outputsX[showXCalls]).toEqual(
            "X:\n" +
            "1 | 2 | 3\n" +
            "---------\n" +
            "4 | 5 | 6\n" +
            "---------\n" +
            "7 | 8 | 9\n",
        );
        showXCalls++;
    }

    function expectTurnForPlayerX(boardRepresentation: string): void {
        expect(game2.outputsX[showXCalls]).toEqual(
            "X:\nyour turn..."
        )
        expect(game2.outputsX[showXCalls + 1]).toEqual("X:\n" + boardRepresentation)
        showXCalls += 2;
        expect(game2.outputsO[showOCalls]).toEqual("O:\n" + boardRepresentation)
        showOCalls++;
    }

    function expectTurnForPlayerO(boardRepresentation: string): void {
        expect(game2.outputsO[showOCalls]).toEqual("O:\nyour turn...")
        expect(game2.outputsO[showOCalls + 1]).toEqual("O:\n" + boardRepresentation)
        showOCalls += 2;
        expect(game2.outputsX[showXCalls]).toEqual("X:\n" + boardRepresentation)
        showXCalls++;
    }
});

class ForTestingGame extends Game {
    private inputsX: Array<string>;
    private inputsO: Array<string>;
    outputsX: Array<string>;
    outputsO: Array<string>;

    constructor(inputsX: Array<string>, inputsO: Array<string>) {
        super();
        this.inputsX = inputsX;
        this.inputsO = inputsO;
        this.outputsX = [];
        this.outputsO = [];
    }

    protected readInputOfPlayerO(): string {
        return this.inputsO.shift() || "";
    }

    protected readInputOfPlayerX(): string {
        return this.inputsX.shift() || "";
    }

    protected showToPlayerX(strBoard: string) {
        this.outputsX.push(strBoard);
    }

    protected showToPlayerO(strBoard: string) {
        this.outputsO.push(strBoard);
    }
}
