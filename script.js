const startingMinutes = 5;
let time = startingMinutes*60;

const countdownEl = document.getElementById("countdown");

var x = setInterval(updateCountdown, 1000);

function updateCountdown() {
    var minutes = Math.floor(time / 60);
    var formattedMinutes = ("0" + minutes).slice(-2);
    var seconds = time % 60;
    var formattedSeconds = ("0" + seconds).slice(-2);

    countdownEl.innerHTML = formattedMinutes + ":" + formattedSeconds;
    time--;

    if (time < 0)
    {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "Session Ended";
        setTimeout(function(){
            location.replace("exp.html");
        }, 2000);
    }
}
