document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const resetBtn = document.getElementById('resetBtn');
  
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
  
    function checkWinner() {
      const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
  
      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          return true;
        }
      }
  
      return false;
    }
  
    function checkDraw() {
      return !gameBoard.includes('');
    }
  
    function updateStatus() {
      if (checkWinner()) {
        status.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
      } else if (checkDraw()) {
        status.textContent = 'It\'s a draw!';
        gameActive = false;
      } else {
        status.textContent = `Player ${currentPlayer}'s turn`;
      }
    }
  
    function handleCellClick(index) {
      if (gameBoard[index] || !gameActive) {
        return;
      }
  
      gameBoard[index] = currentPlayer;
      cells[index].textContent = currentPlayer;
      
      if (checkWinner() || checkDraw()) {
        updateStatus();
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
      }
    }
  
    function handleReset() {
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      currentPlayer = 'X';
      gameActive = true;
  
      cells.forEach(cell => {
        cell.textContent = '';
      });
  
      status.textContent = `Player ${currentPlayer}'s turn`;
    }
  
    cells.forEach((cell, index) => {
      cell.addEventListener('click', () => handleCellClick(index));
    });
  
    resetBtn.addEventListener('click', handleReset);
  });
  