function shuffle(array) {
  var tmp, current, top = array.length;
  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}

// Task 1 : Create a shuffled deck of cards
var drawDeck = Array(40);
for(var i=0; i<drawDeck.length; i++)
{
  drawDeck[i] = (i + 1) % 10;
  if (drawDeck[i] == 0)
    drawDeck[i] = 10;
}
drawDeck = shuffle(drawDeck);

// Task 2, Part I: Each player draws a total of 20 cards
var player1= Array(20).fill(0);
var player2= Array(20).fill(0);
for(var i=0; i<drawDeck.length; i++)
{
  var index = Math.floor(i / 2);
  if (i % 2 == 0)
    player1[index] = drawDeck[i];
  else
    player2[index] = drawDeck[i];
}

// Task 2, Part II:: Each player draws from his/her discard file
// Task 3: Each player draws card in hi/her turn
var tempDeck = [];
while(player1.length > 0 && player2.length > 0)
{
  player1 = shuffle(player1);
  player2 = shuffle(player2);

  var lengthOfPlayer1 = player1.length
  var lengthOfPlayer2 = player2.length
  
  var p1Card = player1.pop();
  var p2Card = player2.pop();

  console.log(`Player 1 (${lengthOfPlayer1} cards) : ${p1Card}`);
  console.log(`Player 2 (${lengthOfPlayer2} cards) : ${p2Card}`);

  tempDeck.push(p1Card);
  tempDeck.push(p2Card);
  var winner = null;
  if (p1Card != p2Card)
    winner = p1Card > p2Card ? player1 : player2;

    if (winner != null) {
      for (var i = 0; i < tempDeck.length; i++)
        winner.push(tempDeck[i]);
      tempDeck = [];
      if(p1Card>p2Card)
        console.log(`Player 1 wins this round`);
        else{
        console.log(`Player 2 wins this round`);
      }
    }
  else{
    console.log(`No winner in this round`);
  }
  console.log('\n');
}


if (player1.length > 0)
  console.log('Player 1 wins');
else
  console.log('Player 2 wins');
