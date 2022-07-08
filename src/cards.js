module.exports = class Deck {
  constructor(amount) {
    this.deck = [];
    this.dealt_cards = [];
    for (let i = 0; i < amount; i++) this.gen();
  }

  gen() {
    let card = (suit, value) => {
      let name = value + ' of ' + suit;
      if (value.toUpperCase().includes('J') || value.toUpperCase().includes('Q') || value.toUpperCase().includes('K')) value = '10';
      if (value.toUpperCase().includes('A')) value = '11';
      return {'name': name, 'suit': suit, 'value': +value}
    };

    let values = ['2', '3','4','5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let suits = ['Clubs', 'Diamonds', 'Spades', 'Hearts'];

    for (let s = 0; s < suits.length; s++) {
      for (let v = 0; v < values.length; v++) {
        this.deck.push(card(suits[s], values[v]))
      }
    }
  }

  print() {
    if (this.deck.length === 0) return console.log('Deck has not been generated. Call gen() on deck object before continuing.');
    for (let c = 0; c < this.deck.length; c++) { console.log(this.deck[c]) }
  }

  shuffle(amount = 1) {
    for (let i = 0; i < amount; i++) {
      for (let c = this.deck.length -1; c >= 0; c--){
        const tempVal = this.deck[c];
        let randomIndex = Math.floor(Math.random() * this.deck.length);

        // ensures that the random index isn't the same as the current index. It runs the function again if this returns as true
        while (randomIndex === c) { randomIndex = Math.floor(Math.random() * this.deck.length) }
        this.deck[c] = this.deck[randomIndex];
        this.deck[randomIndex] = tempVal;
      }
    }
  }

  deal(num_cards) {
    let cards = [];
    for (let c = 0; c < num_cards; c++) {
      let dealt_card = this.deck.shift();
      cards.push(dealt_card);
      this.dealt_cards.push(dealt_card)
    }
    return cards
  }

  replace() {
    this.deck.unshift(this.dealt_cards.shift())
  }

  clear_deck() {
    this.deck = []
  }
};
