
const questionEL = document.querySelector(".question-field");

const options = document.getElementsByName('option')
const nextBtn = document.querySelector(".next-btn")

const questions = [
  {
    question: "what is the capital city of Nigeria",
    options: ["Benin City", "Abuja FCT", "Ikeja", "Aso Rock"],
    answer: "Abuja FCT"
  },
  {
    question: "Which language runs in a browser?",
    options: ["Python", "C++", "JavaScript", "Java"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: ["Computer Style System", "Cascading Style Sheets", "Creative Style Syntax", "Color Style System"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Rome", "Berlin"],
    answer: "Paris"
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Netscape", "Microsoft", "Sun Microsystems", "Oracle"],
    answer: "Netscape",
  },
  {
    question: "Which HTML element is used to link JavaScript to a page?",
    options: ["<script>", "<js>", "<link>", "<code>"],
    answer: "<script>",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Creative Style System",
      "Computer Style Syntax",
      "Colorful Sheet Styles"
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "Which keyword is used to declare a constant variable in JavaScript?",
    options: ["let", "var", "const", "constant"],
    answer: "const",
  },
  {
    question: "What is the correct syntax to output 'Hello World' in the console?",
    options: [
      "console.log('Hello World');",
      "print('Hello World');",
      "echo('Hello World');",
      "console.print('Hello World');"
    ],
    answer: "console.log('Hello World');",
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "/* */", "<!-- -->", "#"],
    answer: "//",
  }

]

let currentIndex = 0;

let questionNumber = 1;
const aphabetOpt = [`(a).`, '(b).', '(c).', '(d).']
const userAnswers = new Array(questions.length).fill(null);

function LoadQuestion() {
  let current = questions[currentIndex];
  questionEL.textContent = `${questionNumber}. ${current.question} `

  // Display each option

  // for (let i = 0; i < options.length; i++) {
  //   options[i].textContent = `${aphabetOpt[i]} ${current.options[i]} `
  //   options[i].classList.remove("answer-btn-toggle");
  //   options[i].style = ""
  //   options[i].style.pointerEvents = "auto"

  //   // Re-highlight previously choosen answer

  //   if (userAnswers[currentIndex] === current.options[i]) {
  //     options[i].classList.add("answer-btn-toggle");
  //     // options[i].style.background = "black"
  //   }
  // }


  options.forEach((optionBtn, i) => {

    optionBtn.textContent = `${aphabetOpt[i]} ${current.options[i]} `
    optionBtn.classList.remove("answer-btn-toggle");
    optionBtn.style = ""
    optionBtn.style.pointerEvents = "auto"

    // Re-highlight previously choosen answer

    if (userAnswers[currentIndex] === current.options[i]) {
      options[i].classList.add("answer-btn-toggle");

    }
  });
}
// options toggle select
function turnOffAll() {
  // for (let i = 0; i < options.length; i++) {
  //   options[i].classList.remove('answer-btn-toggle')
  // }

  options.forEach(optionBtn => {
    optionBtn.classList.remove('answer-btn-toggle')
  })
};


// handle optiion selction

// for (let i = 0; i < options.length; i++) {
//   options[i].addEventListener('click', () => {

//     turnOffAll();
//     options[i].classList.add("answer-btn-toggle");

//     // extract text properly (remove label like "(a).")
//     let selectedOpt = options[i].textContent.split(" ").slice(1).join(" ").trim();

//     // store user's answer for current question
//     userAnswers[currentIndex] = selectedOpt
//     console.log(userAnswers);

//   })

// }

options.forEach(optionBtn => {
  optionBtn.addEventListener("click", () => {
    turnOffAll();
    optionBtn.classList.add("answer-btn-toggle")

    // extract text properly (remove label like "(a).")

    let selectedOpt = optionBtn.textContent.split(" ").slice(1).join(" ").trim();

    // store user's answer for current question
    userAnswers[currentIndex] = selectedOpt
  })
});

nextBtn.addEventListener('click', () => {

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    questionNumber++
    LoadQuestion()
  }

  if (currentIndex === questions.length - 1) {
    alert("Last question — click Submit when you're done.");
  }

});



const backBtn = document.querySelector(".back-btn");
backBtn.addEventListener('click', () => {

  if (currentIndex > 0) {
    currentIndex--
    questionNumber--
    LoadQuestion();
    backBtn.disabled = false;
    backBtn.style.background = "";
  }

});

function showResult() {
  let score = 0;

  // for (let i = 0; i < questions.length; i++) {
  //   const correctAnswer = questions[i].answer
  //   if (userAnswers[i] === correctAnswer) {
  //     score++
  //   }
  // }

  questions.forEach((question, i) => {
    const correctAnswer = question.answer
    if (userAnswers[i] === correctAnswer) {
      score++
    }
  });


  document.querySelector(".container").innerHTML = `
    <h2>Quiz Finished ✅</h2>
    <p>You scored ${score} / ${questions.length}</p>
    <button class="restart-btn">Restart</button>
  `;

  document.querySelector(".restart-btn").addEventListener("click", () => {
    location.reload();
  });
}
const submitBtn = document.querySelector('.submit-btn')
submitBtn.addEventListener('click', () => {
  showResult()
});

// Quiz timer

let seconds = 0
let minutes = 0;
const timerDisplay = document.querySelector("#timer-display");
let id;

id = setInterval(() => {

  if (seconds === 60) {
    minutes++
    seconds = 0;
  }
  //Submit when the timer is 1 minutes
  if (minutes === 1) {
    clearInterval(id)
    showResult()
  }
  timerDisplay.textContent = timerDisplay.innerHTML =
    `  ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  ;
  seconds++
}, 1000)
LoadQuestion();
