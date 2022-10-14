const possibleMoveOptions = ["R", "P", "S", "D", "W"];
class Bot {
    constructor() {
        this.dynamiteCount = 100;
        this.waterCount = 97;
        this.turnCount = 0;
    }
    
    makeMove(gamestate) {
        const lastP1Move =
            this.turnCount > 0
                ? gamestate.rounds[gamestate.rounds.length - 1].p1
                : "R";
        const lastP2Move =
            this.turnCount > 0
                ? gamestate.rounds[gamestate.rounds.length - 1].p2
                : "S";

        if (gamestate.rounds.length === 0) {
            this.dynamiteCount--;
            this.turnCount++;
            return possibleMoveOptions[3];
        }

         if (lastP1Move === lastP2Move && this.dynamiteCount > 0) {
            this.dynamiteCount--;
            return possibleMoveOptions[3];
        } 

        if (
            this.turnCount > 3 &&
            gamestate.rounds[0].p2 === gamestate.rounds[1].p2 &&
            gamestate.rounds[0].p2 === gamestate.rounds[2].p2 &&
            gamestate.rounds[0].p2 === possibleMoveOptions[3]
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
            if (optionsForMove[optionsForMoveIndex] === possibleMoveOptions[3]) {
                this.dynamiteCount--;
            }
            this.turnCount++;
            return optionsForMove[optionsForMoveIndex];
        }
        if (optionsForMove[0] === possibleMoveOptions[3]) {
            this.dynamiteCount--;
            this.turnCount++;
            return optionsForMove[0];
        }
        this.turnCount++;
        return optionsForMove[0];
    }
}

module.exports = new Bot();

function spliceArrayAtIndex(index, array) {
    if (index !== undefined) {
        array.splice(index, 1);
    }
}
