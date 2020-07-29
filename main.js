const cells = document.getElementsByClassName('cell');

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

function leftArrowPressed() {
    console.log("left");
}

function upArrowPressed() {
    console.log("up");
}

function rightArrowPressed() {
    console.log("right");
}

function downArrowPressed() {
    console.log("down");
}

init();

function init() {
    initTwoCells();
}

function initTwoCells() {
    let previousCellIndex = -1;
    let initCounter = 0;
    while (initCounter < 2) {
        const index = Math.floor(Math.random() * 16);
        if (previousCellIndex !== index) {
            previousCellIndex = index;
            const currentCell = cells[index];
            initCell(currentCell);
            initCounter++;
        }
    }
}

function initCell(cell) {
    cell.classList.add('number-cell');

    const x = Math.floor(Math.random() * 2); // amount of available numbers
    const number = 2 * x + 2; // y = ax + b
    cell.innerHTML = `<p>${number}</p>`;
}