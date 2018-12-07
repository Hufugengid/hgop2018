const deckConstructor = require('./deck.js');
const dealerConstructor = require('./dealer.js');
const lucky21Constructor = require('./lucky21.js');
const inject = require('./inject.js')

function createGame(deck) {
  const dealer = dealerConstructor();
  dealer.shuffle = () => {};
  return lucky21Constructor(inject({
    dealer: () => dealer,
    deck: () => deck,
  }))
}

test('a new game should have 50 cards left in the deck', () => {
  const game = createGame([
    '01H', '02H', '03H', '04H', '05H', '06H', '07H',
    '08H', '09H', '10H', '11H', '12H', '13H', 
    '01C', '02C', '03C', '04C', '05C', '06C', '07C', 
    '08C', '09C', '10C', '11C', '12C', '13C',
    '01D', '02D', '03D', '04D', '05D', '06D', '07D',
    '08D', '09D', '10D', '11D', '12D', '13D',
    '01S', '02S', '03S', '04S', '05S', '06S', '07S',
    '08S', '09S', '10S', '11S', '12S', '13S',
  ]);
  expect(game.state.deck.length).toEqual(50);
});

test('a new game should have 2 drawn cards', () => {
  const game = createGame([
    '05C', '10H', '10S', '01D',
  ]);
  expect(game.state.cards.length).toEqual(2);
});

test('Game should be over, and player should win', () =>{
  const game = createGame([
    '05C', '10H', '10S', '01D',
  ]);
  game.guess21OrUnder(game);
  expect(game.playerWon(game)).toBe(true);
});

test('Game should be over already, lucky21 in first two cards', () =>{
  const game = createGame([
    '05C', '10H', '10S', '01D',
  ]);
  expect(game.isGameOver(game)).toBe(true);
  expect(game.playerWon(game)).toBe(true);
});

test('Player should have won, got blackjack guessed right', () =>{
  const game = createGame([
    '05C', '01D', '10S', '11H',
  ]);
  expect(game.getCardsValue(game)).toBe(20);
  game.guess21OrUnder(game);
  expect(game.playerWon(game)).toBe(true);
  expect(game.isGameOver(game)).toBe(true);
});

test('Player has KQ, expect value to be 20', () =>{
  const game = createGame([
    '05C', '01D', '12S', '13H',
  ]);
  expect(game.getCardsValue(game)).toBe(20);
});

test('Player should have lost, got blackjack but guessed wrong', () =>{
  const game = createGame([
    '05C', '01D', '11S', '13H',
  ]);
  expect(game.getCardsValue(game)).toBe(20);
  game.guessOver21(game);
  expect(game.playerWon(game)).toBe(false);
  expect(game.isGameOver(game)).toBe(true);
  expect(game.getCardValue(game)).toBe(1);
});

test('Player should have won, got blackjack', () =>{
  const game = createGame([
    '01H', '06S', '10D', '05D',
  ]);
  game.guess21OrUnder(game);
  expect(game.playerWon(game)).toBe(true);
});

test('Player should have lost, got blown up. Card is undefined', () =>{
  const game = createGame([
    '01H', '10S', '10D', '07D',
  ]);
  game.guess21OrUnder(game);
  expect(game.playerWon(game)).toBe(false);
  expect(game.getCardValue(game)).toBe(undefined);
});

test('Player should have won, 3 aces in hand', () =>{
  const game = createGame([
    '01H', '01S', '08D', '01D',
  ]);
  game.guess21OrUnder(game);
  expect(game.playerWon(game)).toBe(false);
  game.guess21OrUnder(game);
  expect(game.getCardsValue(game)).toBe(21);
  expect(game.playerWon(game)).toBe(true);
});
// eslint-disable-next-line
test('should return player cards value, check if getCardsValue works as intended', () =>{
  const game = createGame([
    '01H', '01S', '08D', '01D',
  ]);
  game.guess21OrUnder(game);
  game.guess21OrUnder(game);
  expect(game.getCardsValue(game)).toBe(21);
});
// eslint-disable-next-line
test('should return player cards value, check if getCardsValue works as intended', () =>{
  const game = createGame([
    '01H', '01S', '08D', '05D',
  ]);
  expect(game.getCardsValue(game)).toBe(13);
});

test('should not return 9, ace is 11', () =>{
  const game = createGame([
    '01H', '01S', '08D', '01D',
  ]);
  expect(game.getCardsValue(game)).not.toBe(9);
  expect(game.getCardsValue(game)).toBe(19);
});

test('should should return 15, getCardsValue works as intended', () =>{
  const game = createGame([
    '01H', '01S', '04D', '01D',
  ]);
  expect(game.getCardsValue(game)).toBe(15);
});

test('should return 21, 4 aces edgecase', () =>{
  const game = createGame([
    '01S', '07S', '01H', '01D', '01C',
  ]);
  game.guess21OrUnder(game);
  game.guess21OrUnder(game);
  game.guess21OrUnder(game);
  expect(game.getCardsValue(game)).toBe(21);
  expect(game.playerWon(game)).toBe(true);
  expect(game.isGameOver(game)).toBe(true);
});

test('should return 10, because player guess over21, also check cards', () =>{
  const game = createGame([
    '01H', '10S', '08S', '10H',
  ]);
  game.guessOver21(game);
  expect(game.getCardValue(game)).toBe(10);
  expect(game.playerWon(game)).toBe(true);
  expect(game.isGameOver(game)).toBe(true);
  expect(['10H', '08S']).toEqual(expect.arrayContaining(game.getCards(game)));
});

test('should return undefined because a card was never put there ', () =>{
  const game = createGame([
    '01H', '04S', '08S', '10H',
  ]);
  game.guess21OrUnder(game);
  expect(game.playerWon(game)).toBe(false);
  expect(game.isGameOver(game)).toBe(true);
  expect(game.getCardValue(game)).toBe(undefined);
});

test('should return 12 as current total of cards', () =>{
  const game = createGame([
    '01H', '04S', '10S', '02H',
  ]);
  expect(game.getTotal(game)).toBe(12);
});

test('two aces should return 12 as current total of cards', () =>{
  const game = createGame([
    '01H', '04S', '01S', '01H',
  ]);
  expect(game.getTotal(game)).toBe(12);
});

test('should return the players cards on hand', () =>{
  const game = createGame([
    '01H', '04S', '03S', '02S',
  ]);
  expect(['02S', '03S']).toEqual(expect.arrayContaining(game.getCards(game)));
});

test('should return the players cards on hand', () =>{
  const game = createGame([
    '01H', '03S', '07D', '10S',
  ]);
  game.guess21OrUnder(game);
  // eslint-disable-next-line
  expect(['10S', '07D', '03S']).toEqual(expect.arrayContaining(game.getCards(game)));
});

test('should return the drawn card, on the right', () =>{
  const game = createGame([
    '01H', '03S', '07D', '10S',
  ]);
  game.guessOver21(game);
  expect(game.getCard(game)).toEqual('03S');
});

test('guessOver21 should draw the next card', () => {
  const game = createGame([
    '01H', '01D', '07D', '10S',
  ]);
  game.guessOver21(game);
  expect(game.state.cards.length).toEqual(2);
  expect(game.state.card).toEqual('01D');
});

test('guess21OrUnder should draw the next card', () => {
  const game = createGame([
    '01H', '01D', '07D', '10S',
  ]);
  game.guess21OrUnder(game);
  expect(game.state.cards.length).toEqual(3);
  expect(game.state.cards[2]).toEqual('01D');
});
