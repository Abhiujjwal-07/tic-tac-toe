import { Body } from "./appsty";
import "./App.css";
const boxes = document.querySelectorAll(".box");
const text = document.querySelector("#heading");
const strategy = document.querySelector("#strategy");

const spaces = [];
const tick_circle = "O";
const tick_x = "X";
let currentPlayer = tick_circle;

const drawBoard = () => {
  boxes.forEach((box, i) => {
    let styleString = "";
    if (i < 3) {
      styleString += "border-bottom: 3px solid var(--text);";
    }
    if (i % 3 === 0) {
      styleString += "border-right: 3px solid var(--text);";
    }
    if (i % 3 === 2) {
      styleString += "border-left: 3px solid var(--text);";
    }
    if (i > 5) {
      styleString += "border-top: 3px solid var(--text);";
    }
    box.style = styleString;
    box.addEventListener("click", boxClicked);
  });
};

const boxClicked = (e) => {
  const id = e.target.id;
  console.log(e);
  if (!spaces[id]) {
    console.log(spaces[id]);
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (playerWon()) {
      text.innerText = `${currentPlayer} has won!`;
      restart();
      return;
    }

    if (playerDraw()) {
      return;
    }
    currentPlayer = currentPlayer === tick_circle ? tick_x : tick_circle;
  }
};

const playerWon = () => {
  if (spaces[0] === currentPlayer) {
    if (spaces[1] === currentPlayer && spaces[2] === currentPlayer) {
      strategy.innerText = `${currentPlayer} wins up to top`;
      return true;
    }
    if (spaces[3] === currentPlayer && spaces[6] === currentPlayer) {
      strategy.innerText = `${currentPlayer} wins on the left`;
      return true;
    }
    if (spaces[4] === currentPlayer && spaces[8] === currentPlayer) {
      strategy.innerText = `${currentPlayer} wins diagonally`;
      return true;
    }
  }
  if (spaces[8] === currentPlayer) {
    if (spaces[2] === currentPlayer && spaces[5] === currentPlayer) {
      strategy.innerText = `${currentPlayer} wins on the right`;
      return true;
    }
    if (spaces[6] === currentPlayer && spaces[7] === currentPlayer) {
      strategy.innerText = `${currentPlayer} wins on the bottom`;
      return true;
    }
  }
  if (spaces[4] === currentPlayer) {
    if (spaces[1] === currentPlayer && spaces[7] === currentPlayer) {
      strategy.innerText = `${currentPlayer} wins vertically on middle`;
      return true;
    }
    if (spaces[3] === currentPlayer && spaces[5] === currentPlayer) {
      strategy.innerText = `${currentPlayer} wins horizontally on the middle`;
      return true;
    }
    if (spaces[2] === currentPlayer && spaces[6] === currentPlayer) {
      strategy.innerText = `${currentPlayer} wins diagonally`;
      return true;
    }
  }
};

const playerDraw = () => {
  let draw = 0;
  spaces.forEach((space, i) => {
    if (spaces[i] !== null) draw++;
  });
  if (draw === 9) {
    text.innerText = `Draw`;
    restart();
  }
};

const restart = () => {
  setTimeout(() => {
    spaces.forEach((space, i) => {
      spaces[i] = null;
    });
    boxes.forEach((box) => {
      box.innerText = "";
    });
    text.innerText = `Play`;
    strategy.innerText = ``;
  }, 1000);
};

drawBoard();
function App() {
  return (
    <Body>
      <div className="container">
        <h1 id="heading">Play</h1>
        <h2 id="strategy">Abhiii Pro Abhiiii</h2>
        <button id="restart">Restart</button>
        <div id="board">
          <div className="box" id="0"></div>
          <div className="box" id="1"></div>
          <div className="box" id="2"></div>
          <div className="box" id="3"></div>
          <div className="box" id="4"></div>
          <div className="box" id="5"></div>
          <div className="box" id="6"></div>
          <div className="box" id="7"></div>
          <div className="box" id="8"></div>
        </div>
      </div>
    </Body>
  );
}

export default App;
