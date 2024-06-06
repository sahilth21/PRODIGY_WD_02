document.addEventListener("DOMContentLoaded", function() {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset-button');

    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    resetButton.addEventListener('click', resetGame);

    function handleCellClick(event) {
        const clickedCell = event.target;
        const cellIndex = parseInt(clickedCell.id.split('-')[1]);

        if (gameState[cellIndex] !== '' || checkWinner()) {
            return;
        }

        gameState[cellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        if (checkWinner()) {
            alert(`${currentPlayer} wins!`);
        } else if (gameState.every(cell => cell !== '')) {
            alert("It's a draw!");
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWinner() {
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winningConditions.some(combination => {
            const [a, b, c] = combination;
            return gameState[a] !== '' && gameState[a] === gameState[b] && gameState[a] === gameState[c];
        });
    }

    function resetGame() {
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => {
            cell.textContent = '';
        });
    }
});
