function tictactoe(rowNum, colNum) {
    //get gameboard
    const board = document.getElementById('gameBoard');
    //check if game is over
    if(board.gameOver) return board.winner;
    //get current position
    const curPos = document.getElementById(`row${rowNum}col${colNum}`);
    //check if already taken
    if(curPos.value) return;
    //determine which player based on number of plays
    const player = [...document.getElementsByClassName('sqr')]
        .filter(x => !x.value).length % 2 ? 'cross' : 'circle';
    //set value to current player
    curPos.value = player;
    //append drawplayer piece element (cross|circle)
    curPos.appendChild(drawPlayer(player));
    //get victor or false if none
    const victor = checkVictory(player, rowNum, colNum);
    //set board's game over property to victor
    board.gameOver = victor;
    //draw victory line on board.
    if(victor) {
        victoryDance(victor);
        //update score
        updateScore(player);
    }
    //set board.winner state
    if(board.gameOver) board.winner = player + " " + victor;
}
function checkVictory(player, rowNum, colNum) {
    //game logic...this looks better but still not great...refactor!
    //if the current row is one player return row number
    if([...document.getElementsByClassName('row' + rowNum)].every(c => c.value === player)) return 'row' + rowNum;
    //if the current col is one player return col number
    if([...document.getElementsByClassName('col' + colNum)].every(c => c.value === player)) return 'col' + colNum;
    //if the diagonal left down return ltdg
    if([...document.getElementsByClassName('ltdg')].every(c => c.value === player)) return 'ltdg';
    //if the diagonal right up return rtdg
    if([...document.getElementsByClassName('rtdg')].every(c => c.value === player)) return 'rtdg';
    //else return false, this could probably be removed as undefined will short circut just as well.
    return false;
}
function updateScore(player) {
    const playerScore = document.getElementById(player);
    const points = parseInt(playerScore.innerText) + 1;
    playerScore.innerText = points;
}
function drawPlayer(style) {
    //define char unicode characters
    const char = {
        'cross' : '&#9587;',
        'circle' : '&#9711;', 
    }
    //create extra div
    const player = document.createElement('div');
    //add style class
    player.classList +=  !['circle', 'cross'].includes(style) ? 'cross' : style 
    //set html to character
    player.innerHTML = char[style];
    //return element
    return player;
}
//reset gameboard
function resetboard() {
    //get gameboard
    const board = document.getElementById('gameBoard')
    //reset gameOver setting
    board.gameOver = false;
    //get all positions
    const pos = [...document.getElementsByClassName('col')];
    //reset each element in pos array
    pos.forEach(e => {
        //check if there are any children
        if(e.children.length) {
            //set value to empty string
            e.value = '';
            //remove 0th child
            e.removeChild(e.children[0] || '');
            //remove cross or circle from class list
            e.className.replace(/cross|circle/g, '');
        }
    })
}
function victoryDance(winner) {
    //line object
    const line = {
        col : 'vL', 
        row : 'hL', 
        ltdg : 'ldL', 
        rtdg : 'rdL', 
    }
    //get winner class into array
    const win = [...document.getElementsByClassName(winner)];
    //loop through winner class
    win.forEach(e => {
        //create div
        let l = document.createElement('div');
        //add line style class
        l.classList += line[winner.replace(/[0-9]/, '')];
        e.children[0].appendChild(l);
    });
}