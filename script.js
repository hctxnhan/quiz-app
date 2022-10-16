const questions = [
  {
    title:
      'Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.',
    a: 'Guilty Hands',
    b: 'She Had to Say Yes',
    c: 'Keoma',
    d: 'Escape from Dartmoor',
    correctAnswer: 'b',
  },
  {
    title:
      'Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl.',
    a: 'Ledge, The',
    b: 'When Dinosaurs Ruled the Earth',
    c: 'Halloween Tree, The',
    d: 'Jimmy Rosenberg: The Father, the Son & the Talent',
    correctAnswer: 'b',
  },
  {
    title: 'Duis consequat dui nec nisi volutpat eleifend.',
    a: 'Bad Biology',
    b: 'Johnny Be Good',
    c: 'Fallen Idol, The',
    d: 'Smokey and the Bandit III',
    correctAnswer: 'a',
  },
  {
    title:
      'In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue.',
    a: 'Demetrius and the Gladiators',
    b: '10 Items or Less',
    c: '23 (23 - Nichts ist so wie es scheint)',
    d: 'Six by Sondheim',
    correctAnswer: 'a',
  },
  {
    title:
      'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.',
    a: "Hell's Hinges",
    b: 'Black Bread (Pa Negre)',
    c: 'Married Life',
    d: 'Lovelace',
    correctAnswer: 'a',
  },
  {
    title:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim.',
    a: 'Well Spent Life, A',
    b: 'Home Alone: The Holiday Heist',
    c: 'A Rumor Of War',
    d: 'Philadelphia Story, The',
    correctAnswer: 'b',
  },
  {
    title: 'Proin interdum mauris non ligula pellentesque ultrices.',
    a: 'Indochine',
    b: 'Naked in New York',
    c: 'Scorpio Rising',
    d: 'Le Week-End',
    correctAnswer: 'a',
  },
  {
    title:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
    a: 'Arrow, The',
    b: 'Silver Stallion (Silver Brumpy, The)',
    c: 'WW III: World War III (Der 3. Weltkrieg)',
    d: 'Night at the Museum',
    correctAnswer: 'b',
  },
  {
    title:
      'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat.',
    a: 'Cathedral, The (Katedra)',
    b: 'Snowriders',
    c: 'Passion Play',
    d: 'Northern Soul',
    correctAnswer: 'a',
  },
  {
    title:
      'Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus.',
    a: 'Viva Riva!',
    b: 'Pistol Whipped',
    c: 'Avalanche',
    d: 'Quest',
    correctAnswer: 'b',
  },
];

const answerAElem = document.getElementById('answerLabelA');
const answerBElem = document.getElementById('answerLabelB');
const answerCElem = document.getElementById('answerLabelC');
const answerDElem = document.getElementById('answerLabelD');

const questionNoElem = document.querySelector('.question-no');

const answersElem = [answerAElem, answerBElem, answerCElem, answerDElem];

const questionElem = document.querySelector('.question');

const submitButton = document.querySelector('.submit-button');

const answerRadioElem = document.querySelectorAll('.answer-input');

const notificationElem = document.querySelector('.notification');
const resultElem = document.querySelector('.result');

let currentQuestion = 0;
let nextQuestion = false;
let correctAnswer = 0;
let finished = false;

function loadQuestion({ title, a, b, c, d }) {
  questionNoElem.textContent = 'Question ' + currentQuestion;
  questionElem.textContent = title;
  answerAElem.textContent = a;
  answerBElem.textContent = b;
  answerCElem.textContent = c;
  answerDElem.textContent = d;
}

function resetAnswerElem() {
  answerRadioElem.forEach((elem) => {
    elem.checked = false;
  });

  answersElem.forEach((elem) => {
    elem.classList.remove('answer--correct', 'answer--wrong');
  });
}

function getCurrentSelectedAnswer() {
  let selected = null;
  answerRadioElem.forEach((elem) => {
    if (elem.checked) {
      console.log('Selected item is', elem.id);
      selected = elem.id;
    }
  });
  return selected;
}

function toggleSelectAnswer(disabled) {
  answerRadioElem.forEach((elem) => (elem.disabled = disabled));
}

function checkAnswer() {
  const answer = getCurrentSelectedAnswer();

  if (answer == null) {
    console.log('Chua chon dap an nao', answer);
    setNotification("You haven't chosen any answer yet!");
    return false;
  }

  toggleSelectAnswer(true);

  if (answer == questions[currentQuestion].correctAnswer) {
    correctAnswer++;
    document.getElementById(answer).labels[0].classList.add('answer--correct');
    setNotification('Congratulations! You chose the correct answer!');
  } else {
    document.getElementById(answer).labels[0].classList.add('answer--wrong');
    document
      .getElementById(questions[currentQuestion].correctAnswer)
      .labels[0].classList.add('answer--correct');
    setNotification('Oh no!');
  }

  return true;
}

function hideNotification() {
  notificationElem.classList.add('notification--hidden');
  notificationElem.classList.remove('notification--show');
}

function showNotification() {
  notificationElem.classList.remove('notification--hidden');
  notificationElem.classList.add('notification--show');
}

let timeoutId;

function setNotification(message) {
  if (timeoutId) {
    window.clearTimeout(timeoutId);
  }

  notificationElem.textContent = message;
  showNotification();

  timeoutId = window.setTimeout(() => {
    hideNotification();
  }, 1500);
}

function showResult() {
  resultElem.classList.add('result--show');
}

function changeButtonText(text) {
  submitButton.textContent = text;
}

function handleClickSubmitButton() {
  if (finished) {
    showResult();
    return;
  }
  if (!nextQuestion) {
    if (checkAnswer()) {
      if (currentQuestion == 2) {
        finished = true;
        nextQuestion = false;
        changeButtonText('Go to result');
      } else {
        currentQuestion++;
        nextQuestion = true;
        changeButtonText('Next question');
      }
    }
  } else {
    nextQuestion = false;
    changeButtonText('Submit');
    resetAnswerElem();
    toggleSelectAnswer(false);
    loadQuestion(questions[currentQuestion]);
  }
}

submitButton.addEventListener('click', handleClickSubmitButton);

loadQuestion(questions[0]);

// TODO:
// - warning user if they didn't choose any answer before clicked submit button
// - show result when out of question
