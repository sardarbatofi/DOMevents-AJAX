
    var questionBank = [];
    var newQuestion;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://opentdb.com/api.php?amount=25&type=multiple");
    xhr.onload = function() {
        response = JSON.parse(xhr.responseText);

        for (var result in response.results) {
            // console.log(response.results[result].category);
            var newQuestion = new TriviaQuestion(response.results[result]);

            questionBank.push(newQuestion);
        }

        currentQuestion = questionBank[0];
        printQuestion();
    };
    xhr.send();

    // console.log(xhr.status);
    // console.log(xhr.statusText);

    var response;

    var currentQuestion;

    var questionCount = 10;

    var teamScore = 0;

    var quiz = document.getElementById('quiz');

    function TriviaQuestion(triviaObject) {
        this.question = triviaObject.question;
        this.answers = triviaObject.incorrect_answers;
        this.correct = triviaObject.correct_answer;

        this.answers.push(this.correct);

    }




    /*Denna funktionen presenterar frågan i en div som jag skapar och döper id:n till quiz*/
    function printQuestion() {
        console.log("You're on question " + questionCount + ".");
        quiz= document.createElement('div');
        quiz.setAttribute("id","quiz");
        quiz = currentQuestion.question;
        document.getElementById('container').append(quiz);

        
        

        /*Här presenterar jag svaren i label där 4 alternativ visas*/

        //Jobba på detta, presentera alternativen!!!


        /*currentQuestion.answers.forEach(function(answer) {
        	
            answer= document.createElement('INPUT');
            answer.setAttribute("type", "radio");
            answer.setAttribute("name", "answer");
            answer.setAttribute("value", answer);
        
            var label= document.createElement("label");
            label.textContent=answer;
            
            document.getElementById('container').append(label);
            document.getElementById('container').append(answer);
           


            /*var answer = document.getElementsByTagName("label").htmlFor;
            document.getElementById("answer").innerHtml = answer;*/
        
           //answer = document.createElement('label<input type="radio" name="answer" value="' + answer + '" /> ' + answer + '</label><br>');
           // quiz.append(answer);

        //  });
        // checkAnswer();
    }




    
    









