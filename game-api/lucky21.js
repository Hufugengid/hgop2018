module.exports = (context) => {
  let deckConstructor = context('deck');
  let deck = deckConstructor(context);
  
  let dealerConstructor = context('dealer');
  let dealer = dealerConstructor(context);
  
  dealer.shuffle(deck);
  let card0 = dealer.draw(deck);
  let card1 = dealer.draw(deck);
  let state = {
    deck: deck,
    dealer: dealer,
    cards: [
        card0,
        card1,
    ],
    // The card that the player thinks will exceed 21.
    card: undefined,
    // A boolean variable, stores information if the cards went bust or not.
    explode: false,
    // A boolean variable, stores information if the player has won or not.
    win: false,
  };
  return {
    state: state,
    /* Is the game over, returns (true or false).
     * The game is over when the player has won or lost.
     * The function first checks if the first two cards dealt are Lucky21.
     * It then checks if the player went bust, of which are two possibilities:
     * 1.He just guessed 21 or under and the total went over 21
     * 2.He just guessed over 21, and the total was 21 or under.
     * Then the function checks if the player has won,
     * of which are also two possibilities:
     * 1.He just guessed 21 or under and the total was 21.
     * 2.He just guessed over 21, and the total was over 21.
     * If its none of these things, then the function returns false by default.
     */
    isGameOver: (game) => {
      if (state.cards.length == 2) {
        if (game.getCardsValue(game) == 21) {
          state.win = true;
          return true;
        }
      }
      if (state.explode) {
        return true;
      }
      if (state.win) {
        return true;
      } else {
        return false;
      }
    },
    /* Has the player won, returns (true or false).
     * The function first checks if the first two cards dealt are Lucky21.
     * It then returns state.win, which is by default false
     * but is set true in either of the guessfunctions.
     */
    playerWon: (game) => {
      if (state.cards.length == 2) {
        if (game.getCardsValue(game) == 21) {
          state.win = true;
          return state.win;
        }
      }
      return state.win;
    },
    /* The highest score the cards can yield without going over 21
     * (integer) AKA the value of cards currently drawn by the player.
     * The iterates through the cards array, getting the right values.
     * King, Queen and Jack should return 10
     * The ace should return either 1 or 11,
     * so long as the total card value doesn't exceed 21.
     */
    getCardsValue: (game) => {
      let i;
      let x = 0;
      let ace = false; // Keeps track of aces in the cards drawn.
      for (i = 0; i < state.cards.length; i++) {
        if (parseInt(state.cards[i]) == 1) {
          ace = true; // Here we have found an ace
          x += 1; // Only added 1, extra 10 is added later.
        }
        if (parseInt(state.cards[i]) > 10) { // Royal people checker
          x += 10;
        }
        if (parseInt(state.cards[i]) <= 10 && parseInt(state.cards[i]) > 1) {
          x += parseInt(state.cards[i]);
        }
      }
      if (x + 10 <= 21) { // CAN i add 10 to the total without exceeding 21?
        if (ace) { // Do I have an ace drawn?
          x += 10; // If both if requirements pass, add 10.
        }
      }
      return x;
    },
    /* The value of the statecard. Returns either an integer or undefined.
     * Is always undefined, unless player has guessed over 21.
     * Then this card is the next card drawn.
     * And the total, value of this card + value of cards on hand,
     * will determine if the player has guessed right or not.
     */
    getCardValue: (game) => {
      if (state.card == undefined) {
        return undefined;
      } else {
        if (parseInt(state.card) >= 10) { // Royal people checker
          return 10;
        } else {
          if (parseInt(state.card) == 1) { // Checks for the ace
            if ((game.getCardsValue(game) + 11) <= 21) {
              return 11; // Returns 11 if the total doesnt exceed 21.
            }
          }
          return parseInt(state.card);
        }
      }
    },
    /* Returns the total, value of all cards on hand + statecard.
     * Pretty straightforward function,
     * just adds getCardsValue and getCardValue together.
     * If state.card is undefined, then getCardValue doesnt get called.
     */
    getTotal: (game) => {
      if (state.card == undefined) {
        return game.getCardsValue(game);
      }
      return game.getCardsValue(game) + game.getCardValue(game);
    },
    // The player's cards (array of strings).
    getCards: (game) => {
      return state.cards;
    },
    // The player's card (string or undefined).
    getCard: (game) => {
      if (state.card == undefined) {
        return undefined;
      }
      return state.card.toString();
    },
    /* The player guesses 21 or under.
     * The function draws a card from the deck and
     * puts it into the cards-array, AKA the players hand.
     * If the total is 21 now, the player has won,
     * if it went over 21 the player went bust.
     */
    guess21OrUnder: (game) => {
      state.cards[state.cards.length] = state.dealer.draw(game.state.deck);
      if (game.getTotal(game) == 21) {
        state.win = true;
      }
      if (game.getTotal(game) > 21) {
        state.explode = true;
      }
    },
    /* The player guesses over 21.
     * The function draws a card from the deck and
     * puts it into the statecard
     * This only happens when player guesses over 21.
     * If the total, this time the players hand + the statecard is over 21,
     * the player has won, else the game is over and the player has lost.
     */
    guessOver21: (game) => {
      game.state.card = game.state.dealer.draw(game.state.deck);
      if (game.getTotal(game) > 21) {
        state.win = true;
      } else {
        state.explode = true;
      }
    },
  };
};
