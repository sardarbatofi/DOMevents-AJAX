



/*global variabels*/
var containerStats = {
  questionAsked: 0,
  correctAnswer: 0,
  correctAnswersStreak: 0,
}; 
var triviaQuestions = []; 

playGame(triviaQuestions, containerStats);



// loading data from api
function playGame(triviaQuestions, containerStats) {
  fetch("https://opentdb.com/api.php?amount=20&difficulty=hard")
  .then(function(res) {
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return res.json(); 
  })
  .then(function(data) {
    for(let i=0; i<data.results.length; i++){
      triviaQuestions.push({
        category: data.results[i].category,
        difficulty: data.results[i].difficulty,
        type: data.results[i].type,
        question: data.results[i].question,
        answers: createAnswersArray(data.results[i].correct_answer, data.results[i].incorrect_answers)
      });
    }
    displayQuestion(triviaQuestions[0]);
  })
  .catch(function(error) {
    console.log('Seems to be a problem \n', error);
  });  
}




// Showing questions
function displayQuestion(questionObject) {
  document.querySelector("#questionText").innerHTML = questionObject.question;
  document.querySelector("#questionText").classList.remove("zoomOut");
  document.querySelector("#questionText").classList.add("zoomIn");
  setTimeout(() => { 
    document.querySelector("#questionText").classList.remove("zoomIn"); 
    containerStats.questionAsked++;    
  }, 1000);
  for(let i=0; i<questionObject.answers.length; i++) {
    let button = document.createElement("button");
    button.disabled = true;
    button.id = "quiz-ans-" + i;
    button.classList.add("btn","quiz-ans-btn", "animated", i%2===0 ? "fadeInLeft" : "fadeInRight");
    button.innerHTML = questionObject.answers[i].answer;
    document.querySelector("#alternativAnswers").appendChild(button);
    setTimeout(() => { 
      button.disabled = false;
      button.classList.remove(i%2===0 ? "fadeInLeft" : "fadeInRight"); 
    }, 1200);        
  }
}




//  Manipulate the json file (api from opendb) and returning the answer in a array
function createAnswersArray(correct_answer, incorrect_answers) {
  const totalAnswers = incorrect_answers.length + 1;
  const correct_answer_index = Math.floor(Math.random() * totalAnswers);
  let answersArray = [];
  for(let i=0; i<incorrect_answers.length; i++){
    answersArray.push({
      answer: incorrect_answers[i],
      isCorrect: false
    });
  }

  answersArray.splice(correct_answer_index, 0, {answer: correct_answer, isCorrect: true});
  if(totalAnswers===2) {
    answersArray.sort((a, b)=> a.answer < b.answer);
  }
  return answersArray;
}




// button click functions
document.addEventListener("click", function (event) { // This way of handling is useful for dynamically created elements
  
  if (event.target.classList.contains("quiz-ans-btn")) { // Handle ".quiz-ans-btn" click
    Array.from(document.querySelectorAll(".quiz-ans-btn")).forEach(btn => btn.disabled = true); // Disable buttons
    event.target.blur();
    const choice = Number(event.target.id.split("-")[2]);
    
  
    if(triviaQuestions[0].answers[choice].isCorrect) {
      event.target.classList.add("pulse", "correctAnswer");
      containerStats.correctAnswer++;
      containerStats.correctAnswersStreak++;
      setTimeout(() => {
        nextQuestion(triviaQuestions);
      }, 1250);

    }
    else {
      event.target.classList.add("shake", "incorrect");
      containerStats.correctAnswersStreak = 0;
      setTimeout(() => {
        const correctAnswerId = "quiz-ans-" + triviaQuestions[0].answers.findIndex(elem => elem.isCorrect);
        document.querySelector("#" +correctAnswerId).classList.add("correctAnswer");
        setTimeout(() => {
          nextQuestion(triviaQuestions);
        }, 1500);        
      }, 750);
    }
    showStats(containerStats);
  } 

   
});

if(triviaQuestions[0].answers[choice].isCorrect) {
      document.getElementByTag("span").style.color = "#51af51";

    }










// Removing current question and showing the next one
function nextQuestion(triviaQuestions) {
  document.querySelector("#questionText").classList.add("zoomOut");
  for(let i=0; i<triviaQuestions[0].answers.length; i++) {
     document.querySelector("#quiz-ans-" + i).classList.add(i%2===0 ? "fadeOutLeft" : "fadeOutRight");
  }
  setTimeout(() => {  
    const quizOptions = document.querySelector("#alternativAnswers");
    while (quizOptions.firstChild) { quizOptions.removeChild(quizOptions.firstChild); }    
    if(triviaQuestions.length>1) {
      triviaQuestions.shift();
      displayQuestion(triviaQuestions[0]);
    }   
  }, 1000);  
}



// Showing stats
function showStats(containerStats) {
  document.querySelectorAll("#quizCorrect>div>span").forEach(el => el.classList.add("fadeOut"));
  setTimeout(() => { 
    document.querySelector("#correctOfNumbers-span").innerHTML = containerStats.correctAnswer + "/" + containerStats.questionAsked;          
    document.querySelector("#correctRow-span").innerHTML = containerStats.correctAnswersStreak;    
    document.querySelectorAll("#quizCorrect>div>span").forEach(el => { el.classList.remove("fadeOut"); el.classList.add("fadeIn");});
    setTimeout(() => { 
      document.querySelectorAll("#quizCorrect>div>span").forEach(el => el.classList.remove("fadeIn"));
    }, 375);      
  }, 375);  
}

