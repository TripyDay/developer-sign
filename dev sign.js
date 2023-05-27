document.addEventListener("DOMContentLoaded", () => {
    class Game {
        constructor(id) {
            this.element = document.getElementById(id);
        }
  
        start() {
            // Define what happens when a game starts
        }
    }
  
    class SnakeGame extends Game {
      constructor(id) {
          super(id);
          this.snake = [{ top: 5, left: 5 }];
          this.direction = 'right';
          this.apple = this.newApple();
      }
  
      stop() {
        clearInterval(this.intervalId);
        document.getElementById('restart-button').style.display = 'block'; // Show the restart button
      }
  
      newApple() {
          return {
              top: Math.floor(Math.random() * 20),
              left: Math.floor(Math.random() * 20),
          };
      }
  
      start() {
          super.start();
          this.intervalId = setInterval(() => {
              this.update();
              this.draw();
          }, 500);
      }
  
      update() {
        const head = Object.assign({}, this.snake[0]); // copy head
        switch (this.direction) {
          case 'right':
            head.left++;
            break;
          case 'down':
            head.top++;
            break;
          case 'left':
            head.left--;
            break;
          case 'up':
            head.top--;
            break;
        }
  
        this.snake.unshift(head);
  
        if (this.apple.top === head.top && this.apple.left === head.left) {
          this.apple = this.newApple();
        } else {
          // remove tail
          this.snake.pop();
        }
  
        // collision with self
        if (this.snake.some((segment, i) => i !== 0 && segment.top === head.top && segment.left === head.left)) {
          this.stop();
        }
  
        // collision with wall
        if (head.top < 0 || head.left < 0 || head.top > 19 || head.left > 19) {
          this.stop();
        }
      }
  
      draw() {
        this.element.innerHTML = '';
        this.snake.forEach(part => {
          const div = document.createElement('div');
          div.style.top = part.top * 20 + 'px';
          div.style.left = part.left * 20 + 'px';
          div.classList.add('snake-part');
          this.element.appendChild(div);
        });
  
        const appleDiv = document.createElement('div');
        appleDiv.style.top = this.apple.top * 20 + 'px';
        appleDiv.style.left = this.apple.left * 20 + 'px';
        appleDiv.classList.add('apple');
        this.element.appendChild(appleDiv);
      }
  }
  
  document.getElementById('restart-button').addEventListener('click', () => {
    snakeGame = new SnakeGame("snake-game"); // Create a new game
    snakeGame.start(); // Start the new game
    document.getElementById('restart-button').style.display = 'none'; // Hide the restart button
  });
  
  
  class RockPaperScissorsGame extends Game {
      constructor(id) {
          super(id);
          this.moves = ['rock', 'paper', 'scissors'];
          this.playerScore = 0;
          this.computerScore = 0;
          this.setupGame();
      }
  
      setupGame() {
          this.resultElement = document.createElement('p');
          this.scoreboardElement = document.createElement('div');
          this.scoreboardElement.classList.add('scoreboard');
  
          this.element.appendChild(this.resultElement);
          this.element.appendChild(this.scoreboardElement);
          
          this.moves.forEach(move => {
              const button = document.createElement('button');
              button.innerText = move;
              button.addEventListener('click', () => {
                  button.classList.add('shake');
                  setTimeout(() => button.classList.remove('shake'), 1000);
                  this.playRound(move);
              });
              this.element.appendChild(button);
          });
      }
  
      start() {
          super.start();
          this.element.style.display = 'block';
      }
  
      playRound(playerMove) {
          const computerMove = this.moves[Math.floor(Math.random() * this.moves.length)];
          let result;
      
          if (playerMove === computerMove) {
              result = 'It\'s a tie';
          } else if (
              (playerMove === 'rock' && computerMove === 'scissors') ||
              (playerMove === 'scissors' && computerMove === 'paper') ||
              (playerMove === 'paper' && computerMove === 'rock')) {
              result = 'Player Wins!';
              this.playerScore++;
          } else {
              result = 'Computer Wins!';
              this.computerScore++;
          }
      
          this.resultElement.innerText = `Player chose ${playerMove}, Computer chose ${computerMove}. ${result}`;
          this.scoreboardElement.innerText = `Player: ${this.playerScore} - Computer: ${this.computerScore}`;
      }
  }
  
  
  
    // Instantiate both games
    let snakeGame = new SnakeGame("snake-game");
    const rpsGame = new RockPaperScissorsGame("rps-game");
  
    // Hide game UI initially
    snakeGame.element.style.display = 'none';
    rpsGame.element.style.display = 'none';
  
    const snakeGameButton = document.getElementById('snake-game-button');
    const rpsGameButton = document.getElementById('rps-game-button');
  
    // Add event listeners to start the games when their buttons are clicked
    snakeGameButton.addEventListener('click', () => {
        rpsGame.element.style.display = 'none'; // Hide other games
        snakeGame.element.style.display = 'block'; // Show this game
        snakeGame.start();
    });
  
    rpsGameButton.addEventListener('click', () => {
        snakeGame.element.style.display = 'none'; // Hide other games
        rpsGame.element.style.display = 'block'; // Show this game
        rpsGame.start();
    });
  
    document.addEventListener('keydown', event => {
      switch(event.key) {
        case 'ArrowUp':
          event.preventDefault();
          snakeGame.direction = 'up';
          break;
        case 'ArrowDown':
          event.preventDefault();
          snakeGame.direction = 'down';
          break;
        case 'ArrowLeft':
          event.preventDefault();
          snakeGame.direction = 'left';
          break;
        case 'ArrowRight':
          event.preventDefault();
          snakeGame.direction = 'right';
          break;
      }
    });
  });
  