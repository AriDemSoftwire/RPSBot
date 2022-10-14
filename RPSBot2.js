/* this bot is supposed to:
- start every first turn with a dynamite
- check if it's attacked by a 100 dynamites; if yes - attack back with water balloons
- keep count of opponent's dynamites and stop using water balloons if opponent's run out
- if a round ends with a tie - it attacks with dynamite (if it's still possible), if not - attacks with water balloons (disabled)
- if no other conditions are met, attacks with a move that wasn't used in the previous round
- can display turn count, how many points are at stake and results of the previous round */

const possibleMoveOptions = ["R", "P", "S", "D", "W"];

class Bot {
    constructor() {
        this.dynamiteCount = 100;
        this.waterCount = 96;
        this.turnCount = 0;
        this.opponentDynamiteCount = 100;
        this.p1wins = 0;
        this.p2wins = 0;
        this.nextRoundScore = 1;
        this.round = 0;
    }

    makeMove(gamestate) {

        this.turnCount++;
        console.log('turn count: ', this.turnCount)

        const lastP1Move =
            this.turnCount > 1
                ? gamestate.rounds[gamestate.rounds.length - 1].p1
                : "R";

        const lastP2Move =
            this.turnCount > 1
                ? gamestate.rounds[gamestate.rounds.length - 1].p2
                : "D";   

        if (this.turnCount > 2) {
        this.getLastRoundResults (gamestate);
        }

        if (lastP1Move === possibleMoveOptions[3]) {
            this.opponentDynamiteCount--;
        }

        if (gamestate.rounds.length === 0) {
            this.dynamiteCount--;
            console.log('p2:', possibleMoveOptions[3])
            return possibleMoveOptions[3];
        }

        if (
            this.turnCount > 3 &&
            gamestate.rounds[0].p1 === gamestate.rounds[1].p1 &&
            gamestate.rounds[0].p1 === gamestate.rounds[2].p1 &&
            gamestate.rounds[0].p1 === possibleMoveOptions[3]
        ) {
            if (this.waterCount > 0) {
                this.waterCount--;
                console.log('p2:', possibleMoveOptions[4])
                return possibleMoveOptions[4];
            }
        }

        if (lastP1Move === lastP2Move && this.dynamiteCount > 0 && this.nextRoundScore >= 3) {
            this.dynamiteCount--;
            console.log('p2:', possibleMoveOptions[3])
            return possibleMoveOptions[3];
        }

      /*  if (
            lastP1Move === lastP2Move &&
            this.dynamiteCount <= 0 &&
            this.opponentDynamiteCount > 0
        ) {
            console.log('p2:', possibleMoveOptions[4])
            return possibleMoveOptions[4];
        } */



        console.log('p2:', this.getTheMove(lastP1Move, lastP2Move))
        return this.getTheMove(lastP1Move, lastP2Move);
    }

    getTheMove(opponentMove, myMove) {
        const optionsForMove = ["R", "P", "S", "W"];
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

      /*  if (this.dynamiteCount <= 0) {
            for (let i = 0; i < optionsForMove.length; i++) {
                if (optionsForMove[i] === "D") {
                    dynamiteIndex = i;
                    break;
                }
            }
        }
        spliceArrayAtIndex(dynamiteIndex, optionsForMove); */

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

    getLastRoundResults (gamestate) {

        console.log('+ score:', this.nextRoundScore)

        let p1move = gamestate.rounds[gamestate.rounds.length - 1].p1;
        let p2move = gamestate.rounds[gamestate.rounds.length - 1].p2;
    
    
        if (p1move === p2move) {
            this.nextRoundScore++;
            return;
        }

        if (p1move === 'D') {
            if (p2move === 'W') {
                this.p2wins += this.nextRoundScore;
                this.nextRoundScore = 1;
                return;
            } else {
                this.p1wins += this.nextRoundScore;
                this.nextRoundScore = 1;
                return;
            }
        }
        if (p2move === 'D') {
            if (p1move === 'W') {
                this.p1wins += this.nextRoundScore;
                this.nextRoundScore = 1;
                return;
            } else {
                this.p2wins += this.nextRoundScore;
                this.nextRoundScore = 1;
                return;
            }
        }

        if (p1move === 'W') {
                this.p2wins += this.nextRoundScore;
                this.nextRoundScore = 1;
                return;
        }

        if (p2move === 'W') {
                this.p1wins += this.nextRoundScore;
                this.nextRoundScore = 1;
                return;
        }
    
        if (p1move === 'R') {
            if (p2move === 'S') {
                this.p1wins += this.nextRoundScore;
                this.nextRoundScore = 1;
                return;
            } else if (p2move === 'P') {
                this.p2wins += this.nextRoundScore;
                this.nextRoundScore = 1;
                return;
            }
        }
    
        if (p1move === 'P') {
            if (p2move === 'R') {
                this.p1wins += this.nextRoundScore;
                this.nextRoundScore = 1;
                return;
            } else if (p2move === 'S') {
                this.p2wins += this.nextRoundScore;
                this.nextRoundScore = 1;
                return;
            }
        }
    
        if (p1move === 'S') {
            if (p2move === 'P') {
                this.p1wins += this.nextRoundScore;
                this.nextRoundScore = 1;
                return;
            } else if (p2move === 'R') {
                this.p2wins += this.nextRoundScore;
                this.nextRoundScore = 1;
                return;
            }
        }
    }

}

function spliceArrayAtIndex(index, array) {
    if (index !== undefined) {
        array.splice(index, 1);
    }
}


module.exports = new Bot();