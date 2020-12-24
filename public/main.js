const socket = io();

let userName = "";
let currentKey = "";
const countDownTimer = document.querySelector(".container");

//add an event listner for keypress
document.addEventListener('keydown', function(event) {
    currentKey = event.key;
});


//When a new connection is made, display the game rules and start after 5 seconds
const newUserConnected = (user) => {
    userName = user || `User${Math.floor(Math.random() * 1000000)}`;
    socket.emit("new_user", userName);
    
    let timeleft = 5;
    var downloadTimer = setInterval(function(){
        timeleft--;
        countDownTimer.innerHTML = `<div class="center">
                                        <p class="countdown_timer">Game starting in ${timeleft}</p>
                                        <p>RULES: Press the key displayed on the screen</p>
                                        <ul>
                                            <li>Wrong answer    :  -1</li>
                                            <li>Correct answer  :  +1</li>
                                            <li>No answer       :   0</li>
                                            <li>Game over       :   3 consecutive misses</li>
                                        </ul>
                                    </div>`;
        if(timeleft <= 0){
            // get the display key from server
            socket.emit("get_display_key", userName);
            currentKey = "";
            clearInterval(downloadTimer);
        }
        },1000);

};
newUserConnected();



// when a new display key is received from the server and update the UI and request server to update the score on keypress or timeout
socket.on("display_key", function (key_to_press, score, lives) {
    let timeleft = 5;
    var answerTimer = setInterval(function(){
        timeleft--;
        countDownTimer.innerHTML = `<div class="center">
                                        <p class="countdown_timer">Press key: ${key_to_press}</p>
                                        <p>Time left to answer: ${timeleft}</p>
                                        <br/>
                                        <p>Current score: ${score}, lives: ${lives}</p>
                                    </div>`;
        if(timeleft <= 0 || currentKey!=""){
            socket.emit("update_score", userName, currentKey, key_to_press);
            currentKey = "";
            clearInterval(answerTimer);
        }
        },1000);
    
});

// display the final score on game over
socket.on("game_over", function (score) {
    countDownTimer.innerHTML = `<div class="center">
                                        <p class="countdown_timer">Game over, score: ${score}</p>
                                    </div>`;
});

