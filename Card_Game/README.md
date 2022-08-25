## Programming Challenge: Card Game

# Introduction

You are building a card game for 2 players. Use Java, JavaScript/TypeScript, Python or Go to create your
solution. Please include the source code as well as instructions on how to compile and run the game in your
submission. The rules of the game are listed below and split into tasks. For each tasks, please implement
the indicated unit-tests. If you are struggling to complete the challenge, it is okay to submit a solution that
does not solve all tasks. The order of tasks is just a suggestion, feel free to implement in whatever order you
see fit.

# Task 1: Create a shuffled deck of cards

Each card shows a number from 1 to 10. Each number is in the deck four times for a total of 40 cards. At the
beginning of the game, the deck is shuffled (Hint: Look up Fisher-Yates Shuffle Algorithm) to
make sure it is in a random order. Each player receives a stack of 20 cards from the shuffled deck as their
draw pile. The draw pile is kept face-down in front of the player. Each player also keeps a discard pile (see
"Task 3" for more). Tests:

. A new deck should contain 40 cards
. A shuffle function should shuffle a deck

# Task 2: Draw cards

The players present their drawn card and compare the values. The player with the higher value card, takes
both cards and adds them to their discard pile, next to the draw pile. If the cards show the same value, the
winner of the next turn wins these cards as well. If a tie situation appears multiple times in a row the winner
after the tied rounds receives the cards from all tied rounds. Hint: The game will likely result in a stalemate,
if this rule is not implemented. Tests:

. When comparing two cards, the higher card should win
. When comparing two cards of the same value, the winner of the next round should win 4 cards

# Task 4: Console Output

![ss](https://user-images.githubusercontent.com/84997756/186637159-41196e63-1bd1-4b1a-b096-0aabcbca8c80.png)
