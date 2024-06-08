document.addEventListener('DOMContentLoaded', () => {
    const solveButton = document.getElementById('solveButton');
    const cells = document.querySelectorAll('.cell');
    
    solveButton.addEventListener('click', () => {
        clearErrors();
        colorDuplicates(); // Vérifier les doublons avant de valider le Sudoku
        if (isValidSudoku()) {
            alert('Félicitations ! Vous avez résolu le Sudoku !');
        } else {
            alert('Il y a des erreurs dans votre solution.');
        }
    });

    function clearErrors() {
        cells.forEach(cell => {
            cell.classList.remove('error');
        });
    }

    function isValidSudoku() {
        const grid = [];
        for (let i = 0; i < 9; i++) {
            const row = [];
            for (let j = 0; j < 9; j++) {
                const cell = cells[i * 9 + j];
                const value = parseInt(cell.textContent) || 0;
                row.push(value);
            }
            grid.push(row);
        }

        for (let i = 0; i < 9; i++) {
            if (!isValidGroup(grid[i]) || !isValidGroup(getColumn(grid, i)) || !isValidGroup(getBox(grid, i))) {
                return false; // Sortir dès qu'une erreur est détectée
            }
        }

        return true;
    }

    function colorDuplicates() {
        clearErrors();
        for (let i = 0; i < 9; i++) {
            colorDuplicatesInGroup(getRow(cells, i));
            colorDuplicatesInGroup(getColumn(cells, i));
            colorDuplicatesInGroup(getBox(cells, i));
        }
    }
    
    function colorDuplicatesInGroup(group) {
        const counts = new Map();
        group.forEach(cell => {
            const value = parseInt(cell.textContent) || 0;
            counts.set(value, (counts.get(value) || 0) + 1);
        });
        group.forEach(cell => {
            const value = parseInt(cell.textContent) || 0;
            if (counts.get(value) > 1 && value !== 0) {
                cell.classList.add('error');
            }
        });
    }
    
    function isValidGroup(group) {
        const seen = new Set();
        for (let i = 0; i < 9; i++) {
            const value = group[i];
            if (value !== 0) {
                if (seen.has(value)) {
                    highlightError(group);
                    return false;
                }
                seen.add(value);
            }
        }
        return true;
    }

    function getColumn(grid, colIndex) {
        return grid.map(row => row[colIndex]);
    }

    function getBox(grid, boxIndex) {
        const box = [];
        const startRow = Math.floor(boxIndex / 3) * 3;
        const startCol = (boxIndex % 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                box.push(grid[startRow + i][startCol + j]);
            }
        }
        return box;
    }

    function getRow(cells, rowIndex) {
        return Array.from(cells).slice(rowIndex * 9, (rowIndex + 1) * 9);
    }
   
    function checkSums() {
        clearErrors();
        for (let i = 0; i < 9; i++) {
            const row = getRow(cells, i);
            const rowSum = row.reduce((acc, cell) => acc + (parseInt(cell.textContent) || 0), 0);
            if (rowSum !== 45) {
                highlightError(row);
            }
        }
        for (let i = 0; i < 9; i++) {
            const col = getColumn(cells, i);
            const colSum = col.reduce((acc, cell) => acc + (parseInt(cell.textContent) || 0), 0);
            if (colSum !== 45) {
                highlightError(col);
            }
        }
    }
    
    function highlightError(group) {
        group.forEach(cell => {
            const value = parseInt(cell.textContent) || 0;
            if (value !== 0) {
                cell.classList.add('error');
            }
        });
    }

    solveButton.addEventListener('click', checkSums);
});
