
if (localStorage.getItem("darkmode") === "enabled") {
    document.body.classList.add("dark");
}


document.addEventListener("click", function (e) {
    if (e.target.id === "toggleDark") {
        document.body.classList.toggle("dark");
        localStorage.setItem(
            "darkmode",
            document.body.classList.contains("dark") ? "enabled" : "disabled"
        );
    }
});


let questions = [];
let index = 0;
let score = 0;
let timeLeft = 30;

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}


fetch("/questions")
    .then(res => res.json())
    .then(data => {

       
        let shuffled = shuffleArray(data);

               questions = shuffled.slice(0, 15);

        localStorage.setItem("total", questions.length);

        showQuestion();
        startTimer();
    });


function showQuestion() {
    const q = questions[index];

        document.getElementById("question").textContent = q.question;

    
    let optHtml = "";
    q.options.forEach((opt, i) => {
        optHtml += `
            <div class="option" onclick="selectOption(${i})">
                ${opt}
            </div>
        `;
    });

    document.getElementById("options").innerHTML = optHtml;
}


function selectOption(selectedIndex) {
    if (selectedIndex === questions[index].answer) {
        score++;
    }

 
    document.querySelectorAll(".option").forEach(o => {
        o.style.pointerEvents = "none";
        o.style.opacity = "0.6";
    });
}

document.getElementById("nextBtn").onclick = () => {
    index++;

    if (index >= questions.length) {
        localStorage.setItem("score", score);
        localStorage.setItem("total", questions.length);
        location.href = "result.html";
        return;
    }

    showQuestion();
    timeLeft = 30;
};


function startTimer() {
    setInterval(() => {

        if (timeLeft <= 0) {
            document.getElementById("nextBtn").click();
        }

        document.getElementById("timer").textContent =
            "00:" + (timeLeft < 10 ? "0" : "") + timeLeft;

        timeLeft--;
    }, 1000);
}
