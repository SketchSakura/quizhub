(function(){
  //FUNCTIONS
  function buildQuiz(){
    //variable to store HTML output
    const output=[];

    //for each question (to prep for loop of each question to appear one after another)
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
        
        //variable to store list of possible answers choices
        const answers = [];

        //for available answers
        for(letter in currentQuestion.answers){

          //add an HTML radio button for the multiple choices (the backtick (``) makes it template literals)
          //template literals are good for multi-line, avoiding using more quote strings and can imbed JS expressions (the ${}s)
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        //add this question and its answer to the output (and slide class is for next button)
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>
          </div>`
        );
      }
    );

    //combine our output list as one list of html and put on page
    quizContainer.innerHTML=output.join('');

    //add to Progress
    addProgress();
  }

  function showResults(){
    //get all the answer containers in quiz
    const answersContainers = quizContainer.querySelectorAll('.answers');

    //keep track of users answers
    let numCorrect=0;

    //for each question
    myQuestions.forEach((currentQuestion,questionNumber) => {

      //find selected answer
      const answerContainer = answersContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      //the || is 'or' in scenario the person didnt answer
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      //if correct (calling correctAnswer for question arrays) adds to the numCorrect
      if(userAnswer === currentQuestion.correctAnswer){
        numCorrect++;
        answersContainers[questionNumber].style.color='lightgreen';
      }
      //if incorrect or blank
      else{
        answersContainers[questionNumber].style.color='red';
      }
    });

    //show number of correct answers out of total
    resultsContainer.innerHTML = `You got ${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n){
    //hides current slide by taking off active-slide class and giving it to next one and updates number
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide=n;

    //makes the previous, next, and submit button appear and disappear based on current slide/question number
    if(currentSlide===0){
      previousButton.style.display='none';
    }
    else{
      previousButton.style.display='inline-block';
    }
    if (currentSlide===slides.length-1){
      nextButton.style.display='none';
      submitButton.style.display='inline-block';
    }
    else{
      nextButton.style.display='inline-block'
      submitButton.style.display='none'
    }
  }

  function showNextSlide(){
    showSlide(currentSlide + 1);
    addProgress();
  }
  function showPreviousSlide(){
    showSlide(currentSlide - 1);
    deductProgress();
  }

  //FUNCTIONS FOR UPDATING PROGRESS BAR
  function addProgress(){
    myBarWidth +=100 / myBarFull;
    if(myBarWidth>100){
      myBarWidth = 100;
    }
    //calls myBar from html to adjust the css
    document.getElementById("myBar").style.width=myBarWidth+"%";
  }
  function deductProgress(){
    myBarWidth -= 100/myQuestions.length;
    if (myBarWidth<0){
      myBarWidth=0
    }
    
    //calls myBar from html to adjust the css
    document.getElementById("myBar").style.width=myBarWidth+"%";
  }
  
  //VARIABLES
  //calling out the variables in the html file
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  //ALL THE QUESTIONS
  const myQuestions = [
    {
      question:"What is the homeworld of the transformers race?",
      answers: {
        a: "Cybertron",
        b: "Earth",
        c: "Alpha-Centauri",
        d: "Cyberutopia",
      },
      correctAnswer:"a"
    },
    {
      question:"What is concept where the roles of the Transformers are inverted, where Autobots are evil and Decepticons good?",
      answers: {
        a: "Anti-Verse",
        b: "Reversal",
        c: "Shattered Glass",
        d: "Reflection",
      },
      correctAnswer:"c"
    },
    {
      question:"Which of these was a Decepticon defector, becoming an Autobot during the war in the IDW 2005 continuity?",
      answers: {
        a: "Drift",
        b: "Starscream",
        c: "Megatron",
        d: "Knockout",
      },
      correctAnswer:"a"
    },
    {
      question:"What is the artifact that allows multiple Cybertronians to combine into a larger entity?",
      answers: {
        a: "Fusion Matrix",
        b: "Gestalt Crucible",
        c: "Enigma of Combination",
        d: "Polymorpher",
      },
      correctAnswer:"c"
    },
    {
      question:"What does the 'J' in DJD stand for?",
      answers: {
        a: "Justice",
        b: "Journalism",
        c: "Jet",
        d: "Jamming",
      },
      correctAnswer:"a"
    },
    {
      question:"Which of these is NOT the name of a colony world of Cybertron?",
      answers: {
        a: "Prion",
        b: "Velocitron",
        c: "Caminus",
        d: "Mechanus",
      },
      correctAnswer:"d"
    },
    {
      question:"Who did NOT voice Optimus Prime?",
      answers: {
        a: "Chris Hemsworth",
        b: "David Kaye",
        c: "George Takei",
        d: "Toru Okawa",
      },
      correctAnswer:"c"
    },
    {
      question:"What is the name of the special task force with high morality rate of the Autobot that appear in multiple continuities?",
      answers: {
        a: "Death Knights",
        b: "Spark Squad",
        c: "Lightning Strike Coalition",
        d: "Wreckers",
      },
      correctAnswer:"d"
    },
    {
      question:"What color has energon NOT been in the various continuities?",
      answers: {
        a: "Yellow",
        b: "Purple",
        c: "Green",
        d: "Brown",
      },
      correctAnswer:"d"
    },
    {
      question:"What continuity was Elita-1 not an implied love interest of Optimus?",
      answers: {
        a: "G1",
        b: "Animated",
        c: "IDW 2005",
        d: "War for Cybertron Trilogy",
      },
      correctAnswer:"c"
    },
    {
      question:"What was the name of the human Starscream befriended in the Armada continuity?",
      answers: {
        a: "Judy",
        b: "Alexis",
        c: "Miko",
        d: "Carly",
      },
      correctAnswer:"b"
    },
    {
      question:"Who is the owner of the Oil House seen in Transformers (as well as the tag for Transformers content on Tumblr)?",
      answers: {
        a: "Maccadam",
        b: "Mortilus",
        c: "Trion",
        d: "Miner",
      },
      correctAnswer:"a"
    },
    {
      question:"What franchise has Transformers NOT done a crossover with?",
      answers: {
        a: "G.I Joe",
        b: "My Little Pony",
        c: "Star Wars",
        d: "Gundam",
      },
      correctAnswer:"d"
    },
    
  ];
  var myBarWidth=0;
  var myBarFull=12; //UPDATE THIS IF NEW QUESTIONS POP UP

  //make quiz show up
  buildQuiz();

  //PAGINATION
  const previousButton=document.getElementById("previous");
  const nextButton=document.getElementById("next");
  const slides=document.querySelectorAll(".slide");
  let currentSlide=0;

  //SHOW FIRST SLIDE
  showSlide(currentSlide)

  //Event listenings (will react when button is clicked)
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener('click', showPreviousSlide);
  nextButton.addEventListener('click', showNextSlide);
})();
