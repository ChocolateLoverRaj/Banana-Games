//Change the display of fun free games
const fun = document.getElementById("fun");
const free = document.getElementById("free");
const games = document.getElementById("games");

//Every five seconds, change what it says
var cycle = 0;
setInterval(() => {
    cycle++;
    if (cycle == 3) {
        cycle = 0;
    }
    fun.style.display = cycle == 0 ? "block" : "none";
    free.style.display = cycle == 1 ? "block" : "none";
    games.style.display = cycle == 2 ? "block" : "none";
}, 5000);