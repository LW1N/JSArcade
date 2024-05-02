// const canvas = document.getElementById('board');
// const ctx = canvas.getContext('2d');


class Deck {
    constructor() {
        this.deck = [];
        this.reset();
        this.shuffle();
    }

    // Fill out deck with cards
    reset() {
        this.deck = [];
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];

        for (let suit in suits) {
            for (let value in values) {
                this.deck.push(values[value] + " of " + suits[suit]);
            }
        }
    }

    // Shuffle the deck
    shuffle() {
        let numberOfCards = this.deck.length;  
        for (var i=0; i<numberOfCards; i++) {
            let j = Math.floor(Math.random() * numberOfCards);
            let tmp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = tmp;
        }
    }

    // Deal out a card from the deck
    deal(){
        return this.deck.pop();
    }

    // Check if deck is empty
    isEmpty() {
        return (this.deck.length==0);
    }

    // Return length of deck
    length() {
        return this.deck.length;
    }
}

// Const array holding values of cards
const cardValues = {
    "Ace of Hearts":1, "2 of Hearts":2, "3 of Hearts":3, "4 of Hearts":4, "5 of Hearts":5, "6 of Hearts":6, "7 of Hearts":7, "8 of Hearts":8, "9 of Hearts":9, "10 of Hearts":10, "Jack of Hearts":11, "Queen of Hearts":12, "King of Hearts":13, 
    "Ace of Diamonds":1, "2 of Diamonds":2, "3 of Diamonds":3, "4 of Diamonds":4, "5 of Diamonds":5, "6 of Diamonds":6, "7 of Diamonds":7, "8 of Diamonds":8, "9 of Diamonds":9, "10 of Diamonds":10, "Jack of Diamonds":11, "Queen of Diamonds":12, "King of Diamonds":13, 
    "Ace of Clubs":1, "2 of Clubs":2, "3 of Clubs":3, "4 of Clubs":4, "5 of Clubs":5, "6 of Clubs":6, "7 of Clubs":7, "8 of Clubs":8, "9 of Clubs":9, "10 of Clubs":10, "Jack of Clubs":11, "Queen of Clubs":12, "King of Clubs":13, 
    "Ace of Spades":1, "2 of Spades":2, "3 of Spades":3, "4 of Spades":4, "5 of Spades":5, "6 of Spades":6, "7 of Spades":7, "8 of Spades":8, "9 of Spades":9, "10 of Spades":10, "Jack of Spades":11, "Queen of Spades":12, "King of Spades":13
};

class Card {
    constructor(card) {
        this.card = card;
        this.value = cardValues[card];
        this.suit = card.substring(card.indexOf(" of ")+4);
        this.placeHolder = null;
        this.flipped = false;
        // Suits array relating to card values
        var suits = {
            'Hearts':0, 
            'Diamonds':13, 
            'Clubs':26, 
            'Spades':39 
        }
        // Retrieve position in a sorted deck
        this.position = suits[this.suit] + this.value;
    } 

    // Initial position of the card(flipped = false -> face up, true -> face down)
    displayCard(placeHolder,flipped=true) {
        this.placeHolder = document.getElementById(placeHolder);
        this.placeHolder.classList.add("card");
        this.flipped=flipped;
        if (flipped) {
            this.placeHolder.style.backgroundPosition = -150*this.position + "px";
        }
        else {
            this.placeHolder.style.backgroundPosition = "0px";  
        }
    } 

    // 'Flip' the card from one orientation to another
    flip() {
        if (this.flipped) {
            this.placeHolder.style.backgroundPosition = "0px";
            this.flipped=false;
        } 
        else {
            this.placeHolder.style.backgroundPosition = -150*this.position + "px";
            this.flipped=true;  
        }
    }
}

// Const b/c we only need 1 deck per game
const deck = new Deck();
// Arrays to hold player and dealer cards
let dealerCards = [5];
let playerCards = [5];
// Variables hold hand totals
let playerTotal = 0;
let dealerTotal = 0;

// Deal out cards
function deal() {
    // If deck is smaller than amount of cards needed, reset deck
    if (deck.length()<7) {
        deck.reset();
        deck.shuffle();
    }

    // Grab cards from deck
    for (let i = 0; i < 5; i++) {
        playerCards[i] = new Card(deck.deal());
        dealerCards[i] = new Card(deck.deal());
    }

    // Initial positions of cards
    dealerCards[0].displayCard("card1",true);
    dealerCards[1].displayCard("card2",false);
    dealerCards[2].displayCard("card3",false);
    dealerCards[3].displayCard("card4",false);
    dealerCards[4].displayCard("card5",false);
    playerCards[0].displayCard("playerCard1",true);
    playerCards[1].displayCard("playerCard2",true);
    playerCards[2].displayCard("playerCard3",false);
    playerCards[3].displayCard("playerCard4",false);
    playerCards[4].displayCard("playerCard5",false);

    // Initial value of player/dealer's hands
    playerTotal = checkCardValue(playerCards[0]) + checkCardValue(playerCards[1]);
    dealerTotal = checkCardValue(dealerCards[0]) + checkCardValue(dealerCards[1]);
}

// Check if card is > 10, and cap if so
function checkCardValue(card) {
    if (card.value > 10) {
        return 10;
    }

    else {
        return card.value;
    }
}


// When button is pressed, reveal a card
function nextStep(button) {
    // Check which card to flip if button is pressed
    if (!playerCards[2].flipped) {
        playerCards[2].flip();
        playerTotal += checkCardValue(playerCards[2]);        
    } 

    else if(!playerCards[3].flipped) {
        playerCards[3].flip();
        playerTotal += checkCardValue(playerCards[3]);
    }
    // If flipping last card, dealer will then play
    else if(!playerCards[4].flipped) {
        playerCards[4].flip();
        playerTotal += checkCardValue(playerCards[4]);
        dealerPlays();
        return;
    }

    // If at or greater than 21 can't hit anymore, prep reset
    if (playerTotal >= 21) {
        dealerPlays();
        return;
    }
}

// Have the dealer try to hit 21 after pressing 'Stay'
function dealerPlays(button) {
    // Reveal the 2nd card
    dealerCards[1].flip();

    // Player bust
    if (playerTotal > 21) {
        setTimeout(function() {
            alert("YOU BUST - YOU LOSE!");
            deal();
        }, 250)
        return;
    }

    // Flip over cards unless at 18, play 'smartly'
    let i = 2;
    while (dealerTotal < 18 && i < 5) {
        dealerCards[i].flip();
        dealerTotal += checkCardValue(dealerCards[i]);
        i++;
    }

    // Dealer bust
    if (dealerTotal > 21) {
        setTimeout(function() {
            alert("DEALER BUST - YOU WIN!");
            deal();
        }, 250)
    }

    // Dealer has higher hand
    else if (dealerTotal > playerTotal) {
        setTimeout(function() {
            alert("DEALER WINS - YOU LOSE!");
            deal();
        }, 250)
    }

    // Player has higher hand
    else {
        setTimeout(function() {
            alert("YOU WIN!");
            deal();
        }, 250)
    }
}

deal();