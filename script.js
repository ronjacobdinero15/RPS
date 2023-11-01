let hero = document.querySelector(".hero");
let stats = document.querySelector(".stats");
let buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", rounds);
});

let score = {
  player: 0,
  computer: 0,
  tie: 0,
};

function MAX_ROUNDS() {
  const MAX_ROUNDS = parseInt(document.getElementById("input").value);
  return MAX_ROUNDS;
}

function rounds(e) {
  if (isNaN(MAX_ROUNDS())) {
    displayContent(hero, "Enter a valid number of rounds");
  } else if (score.player + score.computer + score.tie >= MAX_ROUNDS()) {
    if (confirm("New game?") == true) {
      location.reload();
    }
  } else {
    let playerChoice = e.target.closest("button").id;
    brawl(playerChoice.toLowerCase(), computerCHOICE());
  }
}

function computerCHOICE() {
  const CHOICES = ["rock", "paper", "scissor"];
  return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

function updateStats() {
  displayContent(
    stats,
    `Player: ${score.player},\nComputer: ${score.computer},\nTie: ${score.tie}`
  );
}

function updateHero(winner) {
  let matchResult = winner === "Tie" ? "It's a Tie" : `${winner} wins`;

  if (score.player + score.computer + score.tie < MAX_ROUNDS()) {
    displayContent(
      hero,
      `Round ${score.player + score.computer + score.tie}\n${matchResult}`
    );
  } else {
    let scores = {
      player: score.player,
      computer: score.computer,
      tie: score.tie,
    };
    let champ =
      scores.player > scores.computer
        ? "Player"
        : scores.computer > scores.player
        ? "Computer"
        : "Tie";
    displayContent(hero, `Match Finished!\nGame Winner\n${champ}`);
  }
}

function tally(winner) {
  switch (winner) {
    case "Player":
      score.player++;
      break;
    case "Computer":
      score.computer++;
      break;
    case "Tie":
      score.tie++;
      break;
  }
  updateStats();
  updateHero(winner);
}

function brawl(player, computer) {
  if (player === computer) {
    tally("Tie");
  } else if (
    (player === "rock" && computer === "scissor") ||
    (player === "scissor" && computer === "paper") ||
    (player === "paper" && computer === "rock")
  ) {
    tally("Player");
  } else {
    tally("Computer");
  }
}

function displayContent(tag, content) {
  tag.textContent = content;
}
