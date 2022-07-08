# simply-blackjack
A simple blackjack module to play and manage games.

## Usage
You will need to require the package and create a game just like this:
```js
const Blackjack = require('simply-blackjack');

const Game = new Blackjack({
  decks: 3,
  payouts: {
    blackjack: 1.5,
    default: 1
  }
});
```
---

### Options
| Option            | Description                                        | Type   | Default |
|-------------------|----------------------------------------------------|--------|---------|
| decks             | The number of decks to use when dealing cards.     | Number | 3       |
| payouts           |                                                    | Object | {}      |
| payouts.blackjack | The multiplier for winning blackjack.              | Number | 1.5     |
| payouts.default   | The default multiplier for winning (No blackjack). | Number | 1       |
---

### Variables
| Variable   | Description                                                                                               | Type   | Default                        |
|------------|-----------------------------------------------------------------------------------------------------------|--------|--------------------------------|
| deckAmount | The number of decks being used.                                                                           | Number | 3                              |
| payouts    | The object defining blackjack and default payouts.                                                        | Object | { blackjack: 1.5, default: 1 } |
| state      | The current state of the game (waiting, player_blackjack, player_win, draw, dealer_blackjack, dealer_win) | String | 'waiting'                      |
| dealer     | The dealers cards.                                                                                        | Array  | []                             |
| player     | The players cards.                                                                                        | Array  | []                             |
| table      | The current table, showing player and dealer cards (Minus hidden card) and their totals.                  | Object | {}                             |
| betAmount  | The amount the player is betting.                                                                         | Number |                                |
---

### Events
These are examples of the following events:
```js
// This will fire when the game has reached the end
Game.on('end', (results) => {
  console.log(results);
  // Example output:
  // {
  //    state: 'dealer_win',
  //    bet: 20,
  //    winnings: 0,
  //    losses: 20,
  //    player: { total: 23, cards: [ [Object], [Object], [Object] ] },
  //    dealer: { total: 11, cards: [ [Object], [Object] ] }
  // }
});
```
---

### Methods

**Bet**

This will update the players bet on the game.
| Param  | Type   | Required |
|--------|--------|----------|
| Amount | Number | Yes      |
```js
// Updates your bet on the current game
Game.bet(20);
```

**Start**

This method will start the game and draw 2 cards for the player, and the dealer (One dealer card is hidden).
```js
let cards = Game.start();

console.log(cards);
// Example output:
//{
//  "player": {
//    "total": 7,
//    "cards": [ 
//      {
//        "name": "5 of Clubs",
//        "suit": "Clubs",
//        "value": 5
//      },
//      {
//        "name": "2 of Diamonds",
//        "suit": "Diamonds",
//        "value": 2
//      }
//    ]
//  },
//  "dealer": {
//    "total": 10,
//    "cards": [
//      {
//        "name": "J of Hearts",
//        "suit": "Hearts",
//        "value": 10
//      }
//    ]
//  }
// }
```

**Hit**

This will give the player another card.
```js
let cards = Game.hit();

console.log(cards);
// Example output:
// {
//   "name": "J of Clubs",
//   "suit": "Clubs",
//   "value": 10
// }
```

**Stand**

This will trigger the dealer to get dealt cards and trigger the end event.
```js
// Tells the game you no longer want cards
Game.stand();
```
