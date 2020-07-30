const cells = document.getElementsByClassName('cell');
const cubes = [];
let freeCells = 16;
const leftBorder = [0, 4, 8, 12];

const field = [
    false, false, false, false,
    false, false, false, false,
    false, false, false, false,
    false, false, false, false
];


document.onkeydown = checkKeyAndAct;

function checkKeyAndAct(event) {
    switch (event.key) {
        case 'ArrowLeft':
            leftArrowPressed();
            break;
        case 'ArrowUp':
            upArrowPressed();
            break;
        case 'ArrowRight':
            rightArrowPressed();
            break;
        case 'ArrowDown':
            downArrowPressed();
            break;
        default:
            console.log('No action is implemented for key: ' + event.code);
    }
}

function createCube() {
    while (freeCells > 0) {
        const index = Math.floor(Math.random() * 16);
        if (!field[index]) {
            field[index] = true;
            const currentCell = cells[index];
            initCell(currentCell, index);
            cubes.push(currentCell);
            freeCells--;
            break;
        }
    }
    if (!freeCells) {
        setTimeout(() => {
            alert("Loooooser!")
        }, 100);
    }
}

function move() {
    createCube();
}

function moveCube(cube) {
    cells[cube.index].classList.remove('number-cell');
    cells[cube.index].style.backgroundColor = 'white';
    const number = cells[cube.index].innerHTML;
    cells[cube.index].innerHTML = '';
    field[cube.index] = false;

    cube.index--;

    cells[cube.index].classList.add('number-cell');
    cells[cube.index].innerHTML = number;
    setCellColor(cells[cube.index], number);
    field[cube.index] = true;
}

function moveLeft() {
    cubes
        .sort((c1, c2) => c1.index - c2.index)
        .forEach(cube => {
            while (!leftBorder.includes(cube.index) && !field[cube.index - 1]) {
                moveCube(cube);
            }
            if (!leftBorder.includes(cube.index) && field[cube.index - 1]) {
                const leftNumber = cells[cube.index - 1].innerHTML;
                const currentNumber = cells[cube.index].innerHTML;
                if (leftNumber === currentNumber) {
                    cells[cube.index].classList.remove('number-cell');
                    cells[cube.index].style.backgroundColor = 'white';
                    cells[cube.index].innerHTML = '';
                    field[cube.index] = false;

                    cube.index--;

                    const number = JSON.stringify(Number.parseInt(leftNumber) * 2);
                    cells[cube.index].innerHTML = number;
                    setCellColor(cells[cube.index], number);
                    field[cube.index] = true;
                    freeCells++;
                }
            }
        })
}

function leftArrowPressed() {
    moveLeft();
    // createCube();
}

function upArrowPressed() {
    move();
}

function rightArrowPressed() {
    move();
}

function downArrowPressed() {
    move();
}

init();

function init() {
    initTwoCells();
}

function initTwoCells() {
    let initCounter = 0;
    while (initCounter < 2) {
        const index = Math.floor(Math.random() * 16);
        if (!field[index]) {
            field[index] = true;
            const currentCell = cells[index];
            initCell(currentCell, index);
            cubes.push(currentCell);
            initCounter++;
            freeCells--;
        }
    }
}

function setCellColor(cell, number) {
    switch (number) {
        case '2':
            cell.style.backgroundColor = 'antiquewhite';
            break;
        case '4':
            cell.style.backgroundColor = 'lime';
            break;
        case '8':
            cell.style.backgroundColor = 'green';
            break;
        case '16':
            cell.style.backgroundColor = 'blue';
            break;
        case '32':
            cell.style.backgroundColor = 'yellow';
            break;
        case '64':
            cell.style.backgroundColor = 'red';
            break;
        case '128':
            cell.style.backgroundColor = 'pink';
            break;
        case '256':
            cell.style.backgroundColor = 'brown';
            break;
        case '512':
            cell.style.backgroundColor = 'orange';
            break;
        case '1024':
            cell.style.backgroundColor = 'purple';
            break;
        case '2048':
            cell.style.backgroundColor = 'silver';
            break;
    }
}

function initCell(cell, index) {
    cell.classList.add('number-cell');

    const x = Math.floor(Math.random() * 2); // amount of available numbers
    const number = 2 * x + 2; // y = ax + b
    setCellColor(cell, JSON.stringify(number));
    cell.innerHTML = number;
    cell.index = index;
}