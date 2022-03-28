function startGame() {
    var playerName = getInputValue('playername');
    logPlayer(playerName);
    postScore(80, playerName);
    var messagesElement = document.getElementById('messages');
    messagesElement.innerText = 'Welcome to MultiMath! Starting new game...';
}
function logPlayer(name) {
    if (name === void 0) { name = "Or Hasson Player"; }
    console.log("New game starting for player: " + name);
}
function getInputValue(elementID) {
    var inputElement = document.getElementById(elementID);
    if (inputElement.value === '') {
        return undefined;
    }
    else {
        return inputElement.value;
    }
}
function postScore(score, playerName) {
    if (playerName === void 0) { playerName = 'Or Hasson Player'; }
    var scoreElement = document.getElementById('postedScores');
    scoreElement.innerText = score + " - " + playerName;
}
document.getElementById('startGame').addEventListener('click', startGame);
//# sourceMappingURL=app.js.map