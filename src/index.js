module.exports = class Blackjack {
  constructor(options) {
    this.deckAmount = options?.decks ? validate('deckAmount', options?.decks) : 1;
  }

  init() {

  }

}

function validate(option, value) {
  return new Promise((res, rej) => {
    switch (option) {
      case 'deckAmount':
        if (!value || isNaN(value) || +value < 1 || +value > 100) {
          rej('Invalid Deck Amount, must be from 1-100!');
        }
        break;
    }
    res();
  });
}
