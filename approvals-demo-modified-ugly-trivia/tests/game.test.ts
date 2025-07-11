import {Game} from "../src/game";

describe('Ugly trivia', () => {
    it('simulation with 5 players', () => {
        const rollNumbers = [
            3, 6, 1, 6, 4, 5, 3, 2,
            3, 4, 1, 5, 1, 5, 6, 3,
            3, 5, 5, 3, 5, 3, 4, 2,
            1, 4, 4, 5
        ];
        const isWrongAnswers = [
            true, false, false, false,
            false, false, false, false,
            false, true, false, false,
            false, false, false, false,
            true, false, false, false,
            false, false, false, false,
            false, false, false, false
        ];
        const game = new GameForTesting(rollNumbers, isWrongAnswers);
        game.add("Chet");
        game.add("Pat");
        game.add("Sue");
        game.add("Peter");
        game.add("Jackson");

        game.run();

        expect(game.messagesShown).toEqual(getExpectedMessagesForSimulationWith5Players());
    });

    it('simulation with 3 players', () => {
        const rollNumbers = [
            5, 2, 6, 3, 1, 2,
            3, 1, 2, 5, 4, 2,
            6, 2, 3, 6
        ];
        const isWrongAnswers = [
            false, false, false,
            false, false, false,
            false, false, true,
            false, false, false,
            false, false, false,
            false
        ];
        const game = new GameForTesting(rollNumbers, isWrongAnswers);
        game.add("Chet");
        game.add("Pat");
        game.add("Sue");

        game.run();

        expect(game.messagesShown).toEqual(getExpectedMessagesForSimulationWith3Players());
    });
});

class GameForTesting extends Game {
    messagesShown: string[];
    private _rollNumbers: number[];
    private _isWrongAnswers: boolean[];

    constructor(rollNumbers: number[], isWrongAnswers: boolean[]) {
        super();
        this._rollNumbers = rollNumbers;
        this._isWrongAnswers = isWrongAnswers;
        this.messagesShown = [];
    }


    protected override isAnswerWrong(): boolean {
        const result = this._isWrongAnswers.shift();
        if (result === undefined) {
            throw new Error();
        }
        return result;
    }

    protected override getRoll(): number {
        const result = this._rollNumbers.shift();
        if (result === undefined) {
            throw new Error();
        }
        return result;
    }

    protected override notify(message: string | undefined) {
        if (message === undefined) {
            throw new Error();
        }
        this.messagesShown.push(message)
    }
}

function getExpectedMessagesForSimulationWith5Players() {
    return [
        'Chet was added',
        'They are player number 1',
        'Pat was added',
        'They are player number 2',
        'Sue was added',
        'They are player number 3',
        'Peter was added',
        'They are player number 4',
        'Jackson was added',
        'They are player number 5',
        'Chet is the current player',
        'They have rolled a 3',
        "Chet's new location is 3",
        'The category is Rock',
        'Rock Question 0',
        'Question was incorrectly answered',
        'Chet was sent to the penalty box',
        'Pat is the current player',
        'They have rolled a 6',
        "Pat's new location is 6",
        'The category is Sports',
        'Sports Question 0',
        'Answer was correct!!!!',
        'Pat now has 1 Gold Coins.',
        'Sue is the current player',
        'They have rolled a 1',
        "Sue's new location is 1",
        'The category is Science',
        'Science Question 0',
        'Answer was correct!!!!',
        'Sue now has 1 Gold Coins.',
        'Peter is the current player',
        'They have rolled a 6',
        "Peter's new location is 6",
        'The category is Sports',
        'Sports Question 1',
        'Answer was correct!!!!',
        'Peter now has 1 Gold Coins.',
        'Jackson is the current player',
        'They have rolled a 4',
        "Jackson's new location is 4",
        'The category is Pop',
        'Pop Question 0',
        'Answer was correct!!!!',
        'Jackson now has 1 Gold Coins.',
        'Chet is the current player',
        'They have rolled a 5',
        'Chet is getting out of the penalty box',
        "Chet's new location is 8",
        'The category is Pop',
        'Pop Question 1',
        'Answer was correct!!!!',
        'Chet now has 1 Gold Coins.',
        'Pat is the current player',
        'They have rolled a 3',
        "Pat's new location is 9",
        'The category is Science',
        'Science Question 1',
        'Answer was correct!!!!',
        'Pat now has 2 Gold Coins.',
        'Sue is the current player',
        'They have rolled a 2',
        "Sue's new location is 3",
        'The category is Rock',
        'Rock Question 1',
        'Answer was correct!!!!',
        'Sue now has 2 Gold Coins.',
        'Peter is the current player',
        'They have rolled a 3',
        "Peter's new location is 9",
        'The category is Science',
        'Science Question 2',
        'Answer was correct!!!!',
        'Peter now has 2 Gold Coins.',
        'Jackson is the current player',
        'They have rolled a 4',
        "Jackson's new location is 8",
        'The category is Pop',
        'Pop Question 2',
        'Question was incorrectly answered',
        'Jackson was sent to the penalty box',
        'Chet is the current player',
        'They have rolled a 1',
        'Chet is getting out of the penalty box',
        "Chet's new location is 9",
        'The category is Science',
        'Science Question 3',
        'Answer was correct!!!!',
        'Chet now has 2 Gold Coins.',
        'Pat is the current player',
        'They have rolled a 5',
        "Pat's new location is 2",
        'The category is Sports',
        'Sports Question 2',
        'Answer was correct!!!!',
        'Pat now has 3 Gold Coins.',
        'Sue is the current player',
        'They have rolled a 1',
        "Sue's new location is 4",
        'The category is Pop',
        'Pop Question 3',
        'Answer was correct!!!!',
        'Sue now has 3 Gold Coins.',
        'Peter is the current player',
        'They have rolled a 5',
        "Peter's new location is 2",
        'The category is Sports',
        'Sports Question 3',
        'Answer was correct!!!!',
        'Peter now has 3 Gold Coins.',
        'Jackson is the current player',
        'They have rolled a 6',
        'Jackson is not getting out of the penalty box',
        'Chet is the current player',
        'They have rolled a 3',
        'Chet is getting out of the penalty box',
        "Chet's new location is 0",
        'The category is Pop',
        'Pop Question 4',
        'Answer was correct!!!!',
        'Chet now has 3 Gold Coins.',
        'Pat is the current player',
        'They have rolled a 3',
        "Pat's new location is 5",
        'The category is Science',
        'Science Question 4',
        'Question was incorrectly answered',
        'Pat was sent to the penalty box',
        'Sue is the current player',
        'They have rolled a 5',
        "Sue's new location is 9",
        'The category is Science',
        'Science Question 5',
        'Answer was correct!!!!',
        'Sue now has 4 Gold Coins.',
        'Peter is the current player',
        'They have rolled a 5',
        "Peter's new location is 7",
        'The category is Rock',
        'Rock Question 2',
        'Answer was correct!!!!',
        'Peter now has 4 Gold Coins.',
        'Jackson is the current player',
        'They have rolled a 3',
        'Jackson is getting out of the penalty box',
        "Jackson's new location is 11",
        'The category is Rock',
        'Rock Question 3',
        'Answer was correct!!!!',
        'Jackson now has 2 Gold Coins.',
        'Chet is the current player',
        'They have rolled a 5',
        'Chet is getting out of the penalty box',
        "Chet's new location is 5",
        'The category is Science',
        'Science Question 6',
        'Answer was correct!!!!',
        'Chet now has 4 Gold Coins.',
        'Pat is the current player',
        'They have rolled a 3',
        'Pat is getting out of the penalty box',
        "Pat's new location is 8",
        'The category is Pop',
        'Pop Question 5',
        'Answer was correct!!!!',
        'Pat now has 4 Gold Coins.',
        'Sue is the current player',
        'They have rolled a 4',
        "Sue's new location is 1",
        'The category is Science',
        'Science Question 7',
        'Answer was correct!!!!',
        'Sue now has 5 Gold Coins.',
        'Peter is the current player',
        'They have rolled a 2',
        "Peter's new location is 9",
        'The category is Science',
        'Science Question 8',
        'Answer was correct!!!!',
        'Peter now has 5 Gold Coins.',
        'Jackson is the current player',
        'They have rolled a 1',
        'Jackson is getting out of the penalty box',
        "Jackson's new location is 0",
        'The category is Pop',
        'Pop Question 6',
        'Answer was correct!!!!',
        'Jackson now has 3 Gold Coins.',
        'Chet is the current player',
        'They have rolled a 4',
        'Chet is not getting out of the penalty box',
        'Pat is the current player',
        'They have rolled a 4',
        'Pat is not getting out of the penalty box',
        'Sue is the current player',
        'They have rolled a 5',
        "Sue's new location is 6",
        'The category is Sports',
        'Sports Question 4',
        'Answer was correct!!!!',
        'Sue now has 6 Gold Coins.'
    ];
}

function getExpectedMessagesForSimulationWith3Players() {
    return [
        'Chet was added',
        'They are player number 1',
        'Pat was added',
        'They are player number 2',
        'Sue was added',
        'They are player number 3',
        'Chet is the current player',
        'They have rolled a 5',
        "Chet's new location is 5",
        'The category is Science',
        'Science Question 0',
        'Answer was correct!!!!',
        'Chet now has 1 Gold Coins.',
        'Pat is the current player',
        'They have rolled a 2',
        "Pat's new location is 2",
        'The category is Sports',
        'Sports Question 0',
        'Answer was correct!!!!',
        'Pat now has 1 Gold Coins.',
        'Sue is the current player',
        'They have rolled a 6',
        "Sue's new location is 6",
        'The category is Sports',
        'Sports Question 1',
        'Answer was correct!!!!',
        'Sue now has 1 Gold Coins.',
        'Chet is the current player',
        'They have rolled a 3',
        "Chet's new location is 8",
        'The category is Pop',
        'Pop Question 0',
        'Answer was correct!!!!',
        'Chet now has 2 Gold Coins.',
        'Pat is the current player',
        'They have rolled a 1',
        "Pat's new location is 3",
        'The category is Rock',
        'Rock Question 0',
        'Answer was correct!!!!',
        'Pat now has 2 Gold Coins.',
        'Sue is the current player',
        'They have rolled a 2',
        "Sue's new location is 8",
        'The category is Pop',
        'Pop Question 1',
        'Answer was correct!!!!',
        'Sue now has 2 Gold Coins.',
        'Chet is the current player',
        'They have rolled a 3',
        "Chet's new location is 11",
        'The category is Rock',
        'Rock Question 1',
        'Answer was correct!!!!',
        'Chet now has 3 Gold Coins.',
        'Pat is the current player',
        'They have rolled a 1',
        "Pat's new location is 4",
        'The category is Pop',
        'Pop Question 2',
        'Answer was correct!!!!',
        'Pat now has 3 Gold Coins.',
        'Sue is the current player',
        'They have rolled a 2',
        "Sue's new location is 10",
        'The category is Sports',
        'Sports Question 2',
        'Question was incorrectly answered',
        'Sue was sent to the penalty box',
        'Chet is the current player',
        'They have rolled a 5',
        "Chet's new location is 4",
        'The category is Pop',
        'Pop Question 3',
        'Answer was correct!!!!',
        'Chet now has 4 Gold Coins.',
        'Pat is the current player',
        'They have rolled a 4',
        "Pat's new location is 8",
        'The category is Pop',
        'Pop Question 4',
        'Answer was correct!!!!',
        'Pat now has 4 Gold Coins.',
        'Sue is the current player',
        'They have rolled a 2',
        'Sue is not getting out of the penalty box',
        'Chet is the current player',
        'They have rolled a 6',
        "Chet's new location is 10",
        'The category is Sports',
        'Sports Question 3',
        'Answer was correct!!!!',
        'Chet now has 5 Gold Coins.',
        'Pat is the current player',
        'They have rolled a 2',
        "Pat's new location is 10",
        'The category is Sports',
        'Sports Question 4',
        'Answer was correct!!!!',
        'Pat now has 5 Gold Coins.',
        'Sue is the current player',
        'They have rolled a 3',
        'Sue is getting out of the penalty box',
        "Sue's new location is 1",
        'The category is Science',
        'Science Question 1',
        'Answer was correct!!!!',
        'Sue now has 3 Gold Coins.',
        'Chet is the current player',
        'They have rolled a 6',
        "Chet's new location is 4",
        'The category is Pop',
        'Pop Question 5',
        'Answer was correct!!!!',
        'Chet now has 6 Gold Coins.'
    ];

}
