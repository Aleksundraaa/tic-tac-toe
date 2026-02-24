const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const gameField = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]
]
let isCross = true;
let isWin = false;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame() {
    let size = prompt('Какое поле вы хотите сделать?', 3);
    renderGrid(size);
}

function renderGrid(dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler(row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (isWin) {
        return;
    }

    if (gameField[row][col] === EMPTY) {
        if (isCross) {
            gameField[row][col] = CROSS;
            renderSymbolInCell(CROSS, row, col);
        } else {
            gameField[row][col] = ZERO;
            renderSymbolInCell(ZERO, row, col);
        }
        isCross = !isCross;
    }
    let winner = checkForWin(row, col);
    if (winner) {
        setTimeout(() => alert(winner), 0);
        isWin = true;
        return;
    }
    let isEnd = true;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameField[i][j] === EMPTY) {
                isEnd = false;
            }
        }
    }
    if (isEnd) {
        setTimeout(() => alert("Победила дружба"), 0);
    }

    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function checkForWin(row, col) {
    if (gameField[row][0] !== EMPTY && gameField[row][0] === gameField[row][1] && gameField[row][1] === gameField[row][2]) {
        renderSymbolInCell(gameField[row][0], row, 0, 'red');
        renderSymbolInCell(gameField[row][0], row, 1, 'red');
        renderSymbolInCell(gameField[row][0], row, 2, 'red');
        return gameField[row][0]
    }
    if (gameField[0][col] !== EMPTY && gameField[0][col] === gameField[1][col] && gameField[1][col] === gameField[2][col]) {
        renderSymbolInCell(gameField[0][col], 0, col, 'red');
        renderSymbolInCell(gameField[0][col], 1, col, 'red');
        renderSymbolInCell(gameField[0][col], 2, col, 'red');

        return gameField[0][col]
    }
    if (gameField[0][0] !== EMPTY && gameField[0][0] === gameField[1][1] && gameField[1][1] === gameField[2][2]) {
        renderSymbolInCell(gameField[0][0], 0, 0, 'red')
        renderSymbolInCell(gameField[0][0], 1, 1, 'red')
        renderSymbolInCell(gameField[0][0], 2, 2, 'red')
        return gameField[0][0]
    }
    if (gameField[0][2] !== EMPTY && gameField[0][2] === gameField[1][1] && gameField[1][1] === gameField[2][0]) {
        renderSymbolInCell(gameField[0][2], 0, 2, 'red')
        renderSymbolInCell(gameField[0][2], 1, 1, 'red')
        renderSymbolInCell(gameField[0][2], 2, 0, 'red')
        return gameField[0][2]
    }
    return false;

}


function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler() {
    console.log('reset!');
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameField[i][j] = ' ';
            renderSymbolInCell(EMPTY, i, j)
        }
    }
    isCross = true;
    isWin = false;
}


/* Test Function */

/* Победа первого игрока */
function testWin() {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw() {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell(row, col) {
    findCell(row, col).click();
}
