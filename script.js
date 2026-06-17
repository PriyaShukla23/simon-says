let gameSeq = [];
let userSeq = [];
let btns = ["b1", "b2", "b3", "b4"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keydown", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

function btnflash(btn) {
    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn) {
    btn.classList.add("userflash");

    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;

    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randBtnClass = btns[randIdx];

    let randBtn = document.querySelector(`.${randBtnClass}`);
    let randColor = randBtn.getAttribute("id");

    gameSeq.push(randColor);

    btnflash(randBtn);
}
let highestscore = 0;
let h1 = document.createElement("h1");
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key to restart`;

        highestscore = Math.max(highestscore, level);
        h1.innerText = `Highest Score: ${highestscore}`;
        document.body.appendChild(h1);

        document.body.style.backgroundColor = "red";

        setTimeout(function () {
            document.body.style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

function btnPress() {
    let btn = this;

    userflash(btn);

    let userColor = btn.getAttribute("id");

    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

function reset() {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}

let allBtns = document.querySelectorAll("button");

for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}