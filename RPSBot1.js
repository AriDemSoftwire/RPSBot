const possibleMoveOptions = ["R", "P", "S", "D", "W"];
class Bot {
    constructor() {
        this.turnCount = 0;
        this.dynamiteCount = 100;
    }
    makeMove(gamestate) {
        this.turnCount++;

        if (this.turnCount < 100 && this.dynamiteCount > 0) {
            this.dynamiteCount--;
            return possibleMoveOptions[3];
        }
        let chance = Math.floor(Math.random() * 10);
        if (chance < 4) {
            return possibleMoveOptions[0];
        }
        if (chance < 7 && 4 <= chance) {
            return possibleMoveOptions[1];
        }
        if (chance >= 7) {
            return possibleMoveOptions[2];
        }
    }
}

module.exports = new Bot();
