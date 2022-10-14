let options = ["R", "P", "S", "D", "W"];
function useTheRemainingMove (opponentMove, myMove) {

    let optionsForMove = options;
      for (i = 0; i <= 4; i++) {
        if (opponentMove === optionsForMove[i]) {
          optionsForMove.splice(i, 1)
        }
        if (myMove === optionsForMove[i]) {
          optionsForMove.splice(i, 1)
        }
      }
      for (i = 0; i < optionsForMove.length; i++) {
        if (optionsForMove[i] === "W") {
          optionsForMove.splice(i, 1);
          break;
        }
      }
      if (this.dynamiteCounter === 0) {
        for (i = 0; i < optionsForMove.length; i++) {
          if (optionsForMove[i] === "D") {
            optionsForMove.splice(i, 1);
            break;
          }
        }
      }

      if (optionsForMove.length > 1) {
        let lengthOfOptionsForMove = optionsForMove.length;
        let optionsForMoveIndex = Math.round(Math.random() * (lengthOfOptionsForMove - 1))
        return optionsForMove[optionsForMoveIndex];
      } else return optionsForMove[0];
  }

  console.log(useTheRemainingMove("P", "R"));

  let lastP2Move = gamestate.rounds[gamestate.rounds.length - 1].p2;
  let lastP1Move = gamestate.rounds[gamestate.rounds.length - 1].p1;


      // checks how many dynamites the opponent has used
      if (
        this.turnCount > 0 &&
        gamestate.rounds[gamestate.rounds.length - 1].p2 === options[3]
      ) {
        this.opponentDynamiteCount++;
      } 
      if (this.turnCount > 0) {
       
        let temporary = this.useTheRemainingMove(lastP1Move, lastP2Move);
        console.log(temporary)
        return temporary;
      } 
    }


    
    // checks if the bot is throwing a hundred dynamites at you; if he does - i throw 97 waters at him
    if (
        this.turnCount > 3 &&
        gamestate.rounds[0].p2 === gamestate.rounds[1].p2 &&
        gamestate.rounds[0].p2 === gamestate.rounds[2].p2 &&
        gamestate.rounds[0].p2 === options[3]
      ) {
        if (this.waterCounter > 0) {
          this.waterCounter--;
          return options[4];
        }
      } 

          // randomly throws dynamites at opponent after the first 100 turns
    if (this.turnCount > 100) {
        if (Math.random() > 0.5 && this.dynamiteCounter > 100) {
          this.turnCount++;
          return options[3];
        }
      } 

      