class Bot {
    makeMove(gamestate) {
       let chance = Math.floor(Math.random() * 10);
       if (chance < 4){
        return 'R';
       }
       if (chance < 7 && 4 <= chance){
        return 'S';
       }
       if (chance >= 7) {
        return 'P';
       }
        
    }
}

module.exports = new Bot();