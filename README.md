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

### Options
These are the available options when creating a game:
| Option            | Description                                        | Type   | Default |
|-------------------|----------------------------------------------------|--------|---------|
| decks             | The number of decks to use when dealing cards.     | Number | 3       |
| payouts           |                                                    | Object | {}      |
| payouts.blackjack | The multiplier for winning blackjack.              | Number | 1.5     |
| payouts.default   | The default multiplier for winning (No blackjack). | Number | 1       |

### Events
These are examples of the follow events:
```js
// This will fire when the game has reached the end
Game.on('end', (res) => {
  console.log('Results', res);
});
```
