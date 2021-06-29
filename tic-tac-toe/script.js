const CLICKED_NONE = 0;
const CLICKED_O = 1;
const CLICKED_X = 2;

let clickCnt = 0;
let gameEndFlag = false;
const gameMap = [];
const textMap = {
    [CLICKED_NONE]: "",
    [CLICKED_O]: "O",
    [CLICKED_X]: "X",
};

function setGameResultText(txt) {
    const result = document.getElementsByClassName('game-result-text')[0];
    result.textContent = txt;
}

function winnerCheck(player) {
    // 가로 체크
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameMap[i * 3 + j] != player) {
                break;
            }
            if (j == 2) {
                return player;
            }
        }
    }
    // 세로 체크
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameMap[j * 3 + i] != player) {
                break;
            }
            if (j == 2) {
                return player;
            }
        }
    }
    // 왼쪽 위-오른쪽 아래 대각선 체크
    for (let i = 0; i < 3; i++) {
        if (gameMap[i * 3 + i] != player) {
            break;
        }
        if (i == 2) {
            return player;
        }
    }

    // 왼쪽 아래-오른쪽 위 대각선 체크
    for (let i = 0; i < 3; i++) {
        if (gameMap[i * 3 - i + 2] != player) {
            break;
        }
        if (i == 2) {
            return player;
        }
    }

    return CLICKED_NONE;
}

function updateUI() {
    const items = document.getElementsByClassName('item');
    for (let i = 0; i < 9; i++) {
        const id = parseInt(items[i].dataset.id, 10);
        items[i].textContent = textMap[gameMap[id]];
    }
}

function itemClick(itemId) {
    if (gameEndFlag) {
        return;
    }

    if (gameMap[itemId] === CLICKED_NONE) {
        gameMap[itemId] = !(clickCnt % 2) ? CLICKED_O : CLICKED_X;
        clickCnt++;
    }
    updateUI();
    if (clickCnt < 3) {
        return CLICKED_NONE;
    }
    return winnerCheck(CLICKED_O) || winnerCheck(CLICKED_X);
}

function initialGameMap() {
    for (let i = 0; i < 9; i++) {
        gameMap[i] = CLICKED_NONE;
    }
    clickCnt = 0;
    setGameResultText("");
    gameEndFlag = false;
    updateUI();
}

function initialUI() {
    const container = document.getElementById('container');

    container.innerHTML = "";

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const item = document.createElement('div');
            item.classList.add('item');
            item.dataset.id = i * 3 + j;
            container.appendChild(item);
        }
    }

    container.addEventListener('click', event => {
        if (gameEndFlag) {
            return;
        }

        const item = event.target.closest('.item');
        const itemId = parseInt(item.dataset.id, 10);
        
        const clicked = itemClick(itemId);

        if (clicked !== CLICKED_NONE) {
            gameEndFlag = true;
            setGameResultText(clicked === CLICKED_O ? "O가 이겼습니다" : "X가 이겼습니다");
            
        } else if (clickCnt == 9) {
            gameEndFlag = true;
            setGameResultText("무승부입니다");
            return;
        }

        if(clicked === CLICKED_O) {
            clickCnt = 0;
            const gameResultO = document.getElementsByClassName("game-result-o")[0];
            gameResultO.textContent = "" + (parseInt(gameResultO.textContent, 10) + 1);
        } else if(clicked === CLICKED_X) {
            clickCnt = 0;
            const gameResultX = document.getElementsByClassName("game-result-x")[0];
            gameResultX.textContent = "" + (parseInt(gameResultX.textContent, 10) + 1);
        }
    });

    const btnNewGame = document.getElementsByClassName('btn-new')[0];
    const btnResetGame = document.getElementsByClassName('btn-reset')[0];

    btnResetGame.addEventListener('click', () => {
        const gameResultO = document.getElementsByClassName("game-result-o")[0];
        const gameResultX = document.getElementsByClassName("game-result-x")[0];
        gameResultO.textContent = "0";
        gameResultX.textContent = "0";
        initialGameMap();
    });
    btnNewGame.addEventListener('click', initialGameMap);

    initialGameMap();
}

initialUI();