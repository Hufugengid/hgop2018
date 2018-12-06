const deckConstructor = require('./deck.js');
const dealerConstructor = require('./dealer.js');
const lucky21Constructor = require('./lucky21.js');

test('a new game should have 50 cards left in the deck', () => {
  const deck = deckConstructor();
  const dealer = dealerConstructor();
  const game = lucky21Constructor(deck, dealer);
  expect(game.state.deck.length).toEqual(50);
});

test('a new game should have 2 drawn cards', () => {
  const deck = deckConstructor();
  const dealer = dealerConstructor();
  const game = lucky21Constructor(deck, dealer);
  expect(game.state.cards.length).toEqual(2);
});

test('Game should be over, and player should win', () =>{
  let deck = deckConstructor();
  deck = [
    '05C', '10H', '10S', '01D',
  ];
  const dealer = dealerConstructor();
  dealer.shuffle = (deck) => {};
  const game = lucky21Constructor(deck, dealer);
  game.guess21OrUnder(game);
  expect(game.playerWon(game)).toBe(true);
});

test('Game should be over already, lucky21 in first two cards', () =>{
  let deck = deckConstructor();
  deck = [
    '05C', '01D', '01S', '10H',
  ];
  const dealer = dealerConstructor();
  dealer.shuffle = (deck) => {};
  const game = lucky21Constructor(deck, dealer);
  expect(game.isGameOver(game)).toBe(true);
  expect(game.playerWon(game)).toBe(true);
});

test('Player should have won, got blackjack guessed right', () =>{
  let deck = deckConstructor();
  deck = [
    '05C', '01D', '10S', '11H',
  ];
  const dealer = dealerConstructor();
  dealer.shuffle = (deck) => {};
  const game = lucky21Constructor(deck, dealer);
  expect(game.getCardsValue(game)).toBe(20);
  game.guess21OrUnder(game);
  expect(game.playerWon(game)).toBe(true);
  expect(game.isGameOver(game)).toBe(true);
});

test('Player has KQ, expect value to be 20', () =>{
  let deck = deckConstructor();
  deck = [
    '05C', '01D', '12S', '13H',
  ];
  const dealer = dealerConstructor();
  dealer.shuffle = (deck) => {};
  const game = lucky21Constructor(deck, dealer);
  expect(game.getCardsValue(game)).toBe(20);
});

test('Player should have lost, got blackjack but guessed wrong', () =>{
  let deck = deckConstructor();
  deck = [
    '05C', '01D', '10S', '11H',
  ];
  const dealer = dealerConstructor();
  dealer.shuffle = (deck) => {};
  const game = lucky21Constructor(deck, dealer);
  expect(game.getCardsValue(game)).toBe(20);
  game.guessOver21(game);
  expect(game.playerWon(game)).toBe(false);
  expect(game.isGameOver(game)).toBe(true);
  expect(game.getCardValue(game)).toBe(1);
});

test('Player should have won, got blackjack', () =>{
  let deck = deckConstructor();
  deck = [
    '01H', '06S', '10D', '05D',
  ];
  const dealer = dealerConstructor();
  dealer.shuffle = (deck) => {};
  const game = lucky21Constructor(deck, dealer);
  game.guess21OrUnder(game);
  expect(game.playerWon(game)).toBe(true);
});

test('Player should have lost, got blown up. Card is undefined', () =>{
  let deck = deckConstructor();
  deck = [
    '01H', '10S', '10D', '07D',
  ];
  const dealer = dealerConstructor();
  dealer.shuffle = (deck) => {};
  const game = lucky21Constructor(deck, dealer);
  game.guess21OrUnder(game);
  expect(game.playerWon(game)).toBe(false);
  expect(game.getCardValue(game)).toBe(undefined);
});

test('Player should have won, 3 aces in hand', () =>{
  let deck = deckConstructor();
  deck = [
    '01H', '01S', '08S', '01D',
  ];
  const dealer = dealerConstructor();
  dealer.shuffle = (deck) => {};
  const game = lucky21Constructor(deck, dealer);
  game.guess21OrUnder(game);
  expect(game.playerWon(game)).toBe(false);
  game.guess21OrUnder(game);
  expect(game.getCardsValue(game)).toBe(21);
  expect(game.playerWon(game)).toBe(true);
});

test('should return player cards value, check if getCardsValue works as intended', () =>{
  const deck = deckConstructor();
  const dealer = dealerConstructor();
  const game = lucky21Constructor(deck, dealer);

  game.state.cards = [
    '01H', '01S', '08S', '01D',
  ];
  expect(game.getCardsValue(game)).toBe(21);
});

test('should return player cards value, check if getCardsValue works as intended', () =>{
  const deck = deckConstructor();
  const dealer = dealerConstructor();
  const game = lucky21Constructor(deck, dealer);
  game.state.cards = [
    '01H', '08S',
  ];
  expect(game.getCardsValue(game)).toBe(19);
});

test('should not return 9, ace is 11', () =>{
  const deck = deckConstructor();
  const dealer = dealerConstructor();
  const game = lucky21Constructor(deck, dealer);
  game.state.cards = [
    '08S', '01D',
  ];
  expect(game.getCardsValue(game)).not.toBe(9);
});

test('should should return 15, getCardsValue works as intended', () =>{
  const deck = deckConstructor();
  const dealer = dealerConstructor();
  const game = lucky21Constructor(deck, dealer);
  game.state.cards = [
    '04S', '01S',
  ];
  expect(game.getCardsValue(game)).toBe(15);
});

test('should return 21, 4 aces edgecase', () =>{
  let deck = deckConstructor();
  deck = [
    '01S', '01L', '07S', '01H', '01D',
  ];
  const dealer = dealerConstructor();
  dealer.shuffle = (deck) => {};
  const game = lucky21Constructor(deck, dealer);
  game.guess21OrUnder(game);
  game.guess21OrUnder(game);
  game.guess21OrUnder(game);
  expect(game.getCardsValue(game)).toBe(21);
  expect(game.playerWon(game)).toBe(true);
  expect(game.isGameOver(game)).toBe(true);
});

test('should return 10, because player guess over21, also check cards', () =>{
  const deck = deckConstructor();
  const dealer = dealerConstructor();
  const game = lucky21Constructor(deck, dealer);
  game.state.deck = [
    '07H', '10S', '03S', '10D',
  ];
  game.state.cards = [
    '10H', '08S',
  ];
  game.guessOver21(game);
  expect(game.getCardValue(game)).toBe(10);
  expect(['10H', '08S']).toEqual(expect.arrayContaining(game.getCards(game)));
});

test('should return undefined because a card was never put there ', () =>{
  const deck = deckConstructor();
  const dealer = dealerConstructor();
  const game = lucky21Constructor(deck, dealer);
  game.state.deck = [
    '07H', '10S', '03S', '10D',
  ];
  game.state.cards = [
    '03D', '07H', '06D', '05S',
  ];
  expect(game.getCardValue(game)).toBe(undefined);
});

test('should return 12 as current total of cards', () =>{
  const deck = deckConstructor();
  const dealer = dealerConstructor();
  const game = lucky21Constructor(deck, dealer);
  game.state.cards = [
    '10H', '02S',
  ];
  expect(game.getTotal(game)).toBe(12);
});

test('should return 12 as current total of cards', () =>{
  const deck = deckConstructor();
  const dealer = dealerConstructor();
  const game = lucky21Constructor(deck, dealer);
  game.state.cards = [
    '01H', '01S',
  ];
  expect(game.getTotal(game)).toBe(12);
});

test('should return the players cards on hand', () =>{
  const deck = deckConstructor();
  const dealer = dealerConstructor();
  const game = lucky21Constructor(deck, dealer);
  game.state.cards = [
    '02S', '03S',
  ];
  expect(['02S', '03S']).toEqual(expect.arrayContaining(game.getCards(game)));
});

test('should return the players cards on hand', () =>{
  const deck = deckConstructor();
  const dealer = dealerConstructor();
  const game = lucky21Constructor(deck, dealer);
  game.state.cards = [
    '10S', '07D', '03S',
  ];
  expect(['10S', '07D', '03S']).toEqual(expect.arrayContaining(game.getCards(game)));
});

test('should return the drawn card, on the right', () =>{
  let deck = deckConstructor();
  deck = [
    '05C', '01D', '10S', '11H',
  ];
  const dealer = dealerConstructor();
  dealer.shuffle = (deck) => {};
  const game = lucky21Constructor(deck, dealer);
  game.guessOver21(game);
  expect(game.getCard(game)).toEqual('01D');
});

test('guessOver21 should draw the next card', () => {
  let deck = deckConstructor();
  deck = [
    '02C', '01D', '05S', '10H',
  ];
  const dealer = dealerConstructor();
  dealer.shuffle = (deck) => {};
  const game = lucky21Constructor(deck, dealer);
  game.guessOver21(game);
  expect(game.state.cards.length).toEqual(2);
  expect(game.state.card).toEqual('01D');
});

test('guess21OrUnder should draw the next card', () => {
  let deck = deckConstructor();
  deck = [
    '02C', '01D', '05S', '10H',
  ];
  const dealer = dealerConstructor();
  dealer.shuffle = (deck) => {};
  const game = lucky21Constructor(deck, dealer);
  game.guess21OrUnder(game);
  expect(game.state.cards.length).toEqual(3);
  expect(game.state.cards[2]).toEqual('01D');
});
