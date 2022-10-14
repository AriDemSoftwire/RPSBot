const possibleMoveOptions = ["R", "P", "S", "D", "W"];
class Bot {
    constructor() {
        this.dynamiteCount = 100;
        this.waterCount = 96;
        this.turnCount = 0;
        this.opponentDynamiteCount = 100;
    }

    makeMove(gamestate) {
        this.turnCount++;

        const lastP1Move =
            this.turnCount > 1
                ? gamestate.rounds[gamestate.rounds.length - 1].p1
                : "R";

        const lastP2Move =
            this.turnCount > 1
                ? gamestate.rounds[gamestate.rounds.length - 1].p2
                : "D";

        if (lastP1Move === possibleMoveOptions[3]) {
            this.opponentDynamiteCount--;
        }

        if (gamestate.rounds.length === 0) {
            this.dynamiteCount--;
            return possibleMoveOptions[3];
        }

        if (lastP1Move === lastP2Move && this.dynamiteCount > 0) {
            this.dynamiteCount--;
            return possibleMoveOptions[3];
        }

        if (
            lastP1Move === lastP2Move &&
            this.dynamiteCount <= 0 &&
            this.opponentDynamiteCount > 0
        ) {
            return possibleMoveOptions[4];
        }

        if (
            this.turnCount > 3 &&
            gamestate.rounds[0].p1 === gamestate.rounds[1].p1 &&
            gamestate.rounds[0].p1 === gamestate.rounds[2].p1 &&
            gamestate.rounds[0].p1 === possibleMoveOptions[3]
        ) {
            if (this.waterCount > 0) {
                this.waterCount--;
                return possibleMoveOptions[4];
            }
        }


        return this.getTheMove(lastP1Move, lastP2Move);
    }

    getTheMove(opponentMove, myMove) {
        const optionsForMove = ["R", "P", "S", "D", "W"];
        let opponentMoveIndex;
        let myMoveIndex;
        let waterIndex;
        let dynamiteIndex;

        for (let i = 0; i <= optionsForMove.length; i++) {
            if (opponentMove === optionsForMove[i]) {
                opponentMoveIndex = i;
            }
        }

        spliceArrayAtIndex(opponentMoveIndex, optionsForMove);

        for (let i = 0; i <= optionsForMove.length; i++) {
            if (myMove === optionsForMove[i]) {
                myMoveIndex = i;
            }
        }

        if (myMoveIndex !== opponentMoveIndex) {
            spliceArrayAtIndex(myMoveIndex, optionsForMove);
        }

        for (let i = 0; i < optionsForMove.length; i++) {
            if (optionsForMove[i] === "W") {
                waterIndex = i;
                break;
            }
        }
        spliceArrayAtIndex(waterIndex, optionsForMove);

        if (this.dynamiteCount <= 0) {
            for (let i = 0; i < optionsForMove.length; i++) {
                if (optionsForMove[i] === "D") {
                    dynamiteIndex = i;
                    break;
                }
            }
        }
        spliceArrayAtIndex(dynamiteIndex, optionsForMove);

        if (optionsForMove.length > 1) {
            let lengthOfOptionsForMove = optionsForMove.length;
            let optionsForMoveIndex = Math.floor(
                Math.random() * lengthOfOptionsForMove
            );
            if (
                optionsForMove[optionsForMoveIndex] === possibleMoveOptions[3]
            ) {
                this.dynamiteCount--;
            }
            return optionsForMove[optionsForMoveIndex];
        }
        if (optionsForMove[0] === possibleMoveOptions[3]) {
            this.dynamiteCount--;
            return optionsForMove[0];
        }
        return optionsForMove[0];
    }
}

function spliceArrayAtIndex(index, array) {
    if (index !== undefined) {
        array.splice(index, 1);
    }
}

module.exports = new Bot();