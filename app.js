/*
* i3logix Code Challenge
* 
* Please refer to the README.md for challenge questions and complete your challenge below.
* 
* Steps:
*
* 1. Write your challenge code below.
* 2. Export a higher order function that will accept arguments for testing
*/

const Card = function (value, text, suit) {
  this.value = value;
  this.text = text;
  this.suit = suit;
}

const getHandArray = function (handString) {
  let cards = handString.split(' ');
  if (cards.length !== 5) {
    console.error('ERROR: Please Enter a Five Card Hand');
    return;
  }
  let handArray = [];

  cards.forEach((cardString) => {
    let v, t, s;

    if (cardString.indexOf('10') !== -1) {
      v = t = parseInt(cardString.substr(0, 2));
      s = cardString.charAt(2);
    } else {
      t = cardString.charAt(0)
      switch (t) {
        case 'J':
          v = 11;
          t = 'Jack';
          break;
        case 'Q':
          v = 12;
          t = 'Queen';
          break;
        case 'K':
          v = 13;
          t = 'King';
          break;
        case 'A':
          v = 14;
          t = 'Ace';
          break;
        default:
          v = parseInt(t);
      }

      s = cardString.charAt(1);
    }

    let c = new Card(v, t, s);
    handArray.push(c);
  })
  return handArray;
}

const sortCards = function (a, b) {
  if (a.value < b.value) {
    return -1;
  }
  if (a.value > b.value) {
    return 1;
  }
  return 0;
}

const isHandFlush = function (hand) {
  let suit = hand[0].suit;

  for (let card of hand) {
    if (card.suit !== suit) {
      return false;
    }
  }
  return true;
}

const evaluateHand = function (hand) {
  let cardHistogram = {};
  let count = 0;
  let highCard, lowCard, handVal, cardText;
  let isFlush = isHandFlush(hand);

  hand.sort(sortCards);

  // count number of unique cards
  for (let card of hand) {
    if (cardHistogram[card.text]) {
      cardHistogram[card.text] += 1;
      if (cardHistogram[card.text] > 4) {
        console.log("ERROR: TOO MANY OF ONE CARD");
        return;
      }
    }
    else {
      cardHistogram[card.text] = 1;
      count++;
    }

  }

  switch (count) {
    //5 unique cards: Straight flush, straight, flush, or high card
    case 5:
      // Straight: if difference between 1st and last card is 4
      // OR if difference is 12, and difference between cards 3 and 4 is 1 (2345A)
      if (hand[4].value - hand[0].value === 4 || (hand[4].value - hand[0].value === 12 && hand[3].value - hand[2].value === 1)) {
        if (isFlush) {
          cardText = "Straight Flush";
          // if hand is 10JQKA, Royal Flush
          if (hand[0].value === 10 && hand[4].value === 14) {
            handVal = "Royal Flush!";
            break;
          }
        }
        else {
          cardText = "Straight";
        }
        // if hand is 2345A, set A to low card
        if (hand[0].value === 2 && hand[4].value === 14) {
          highCard = hand[3];
          lowCard = hand[4];
        }
        else {
          highCard = hand[4];
          lowCard = hand[0];
        }
        handVal = `${cardText}, ${lowCard.text} to ${highCard.text}`;
      }
      // Flush
      else if (isFlush) {
        handVal = "Flush";
      }
      // High Card
      else {
        highCard = hand[4];
        handVal = `${highCard.text} High`;
      }
      break;

    // 4 unique cards: one pair
    case 4:
      for (let x in cardHistogram) {
        if (cardHistogram[x] == 2) {
          handVal = `Pair of ${x}s`;
          break;
        }
      }
      break;

    // 3 unique cards: 3 of a kind or two pair
    case 3:
      let cardArr = [];

      for (let x in cardHistogram) {
        // 3 of a kind
        if (cardHistogram[x] == 3) {
          cardText = `Three of a kind`;
          cardArr.push(x);
          break;
        }

        // 2 pair
        if (cardHistogram[x] == 2) {
          cardText = 'Two Pair';
          cardArr.push(x);
        }
      }
      handVal = `${cardText} (${cardArr.join('s and ')}s)`;
      break;

    // 2 unique cards: Full House or Four of a Kind
    case 2:
      let card1, card2;
      for (let x in cardHistogram) {
        // 3 of a kind
        if (cardHistogram[x] == 3) {
          card1 = x;
          handVal = `Full House, ${card1}s full of ${card2}s`;
        }

        // 2 pair
        if (cardHistogram[x] == 2) {
          card2 = x;
          handVal = `Full House, ${card1}s full of ${card2}s`;
        }

        // 4 of a kind
        if (cardHistogram[x] == 4) {
          handVal = `Four of a kind (${x}s)`;
          break;
        }

      }

      break;
  }

  return handVal;
}

// export your function for testing
module.exports = function higherOrderFunction(cards) {
  let hand = getHandArray(cards);
  let handRank = evaluateHand(hand);
  console.log(`${cards} -> ${handRank}`)
  return handRank;
}