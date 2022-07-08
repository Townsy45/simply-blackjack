const Deck = require('./cards');
const { EventEmitter } = require('events');

module.exports = class Blackjack extends EventEmitter {
  constructor(options) {
    super();
    this.deckAmount = validate('deckAmount', options?.['decks']);
    this.payouts = validate('payouts', options?.['payouts']);
    this.state = 'waiting';
    this.dealer = [];
    this.player = [];
    this.table = {};
    this.betAmount = null;
  }

  _updateTable() {
    this.table = {
     player: formatCards(this.player),
     dealer: formatCards([this.dealer[0]])
    };
  }

  bet(amount) {
    this.betAmount = validate('bet', +amount);
  }

  start() {
    if (!this.betAmount) throw 'Please place a bet before starting!';
    this.cards = new Deck(this.deckAmount);
    this.cards.shuffle(2);

    this.player = this.cards.deal(2);
    this.dealer = this.cards.deal(2);

    this.table = {
      player: formatCards(this.player),
      dealer: formatCards([this.dealer[0]])
    };

    return this.table;
  }

  hit() {
    const newCard = this.cards.deal(1)[0];
    this.player.push(newCard);
    this._updateTable();
    return newCard;
  }

  stand() {
    let dealerSum = sumCards(this.dealer);
    let playerSum = sumCards(this.player);

    if (playerSum <= 21) {
      while (dealerSum < 17) {
        this.dealer.push(...this.cards.deal(1));
        dealerSum = sumCards(this.dealer);
        this._updateTable();
      }
    }

    let winnings = 0, losses = 0;

    if (playerSum <= 21 && (dealerSum > 21 || dealerSum < playerSum)) {
      if (playerSum === 21) {
        this.state = 'player_blackjack';
        winnings = this.betAmount * this.payouts.blackjack;
      } else {
        this.state = 'player_win';
        winnings = this.betAmount * this.payouts.default;
      }
    } else if (dealerSum === playerSum) {
      this.state = 'draw';
    } else {
      this.state = dealerSum === 21 ? 'dealer_blackjack' : 'dealer_win';
      losses = this.betAmount;
    }

    this.emit('end', {
      state: this.state,
      bet: this.betAmount,
      winnings, losses,
      player: formatCards(this.player),
      dealer: formatCards(this.dealer)
    });
  }

}

function validate(option, value) {
  const validateError = (message) => { throw new Error(message) };
  switch (option) {
    case 'deckAmount':
      // Default to 1
      if (!value) value = 3;
      // Check numbers value
      if (isNaN(value) || +value < 1 || +value > 100) validateError('Invalid Deck Amount, must be from 1-100!');
      // Convert to a number if sent as a string
      value = +value;
      break;
    case 'payouts':
      // Assign default values
      if (!value) value = { blackjack: 1.5, default: 1 };
      if (value.blackjack == null) value.blackjack = 1.5;
      if (value.default == null) value.default = 1;
      // Validate values
      if (isNaN(value?.blackjack) || isNaN(value?.default)) validateError('Payouts must be a number multiplier!');
      if (value?.blackjack <= 0) validateError('Blackjack payout must be above 0!');
      if (value?.default <= 0) validateError('Default payout must be above 0!');
      break;
    case 'bet':
      if (value == null || isNaN(value)) validateError('Invalid Bet Amount!');
      if (value < 1) validateError('Bet amount must be above 0!');
      break;
  }
  return value;
}

function sumCards(cards) {
  return cards.map(c => +c.value).reduce((p,v) => p+v);
}

function formatCards(cards) {
  return { total: sumCards(cards), cards };
}
