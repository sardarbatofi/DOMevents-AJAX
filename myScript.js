


    var res;
    var newQuestion;
    var questionArray= [];
    document.addEventListener('DOMContentLoaded', function (){
      var body = document.getElementsByTagName("BODY")[0];
      
      var httpReq = new XMLHttpRequest();
      httpReq.open("GET", "https://opentdb.com/api.php?amount=25&type=multiple");

      httpReq.onload=function(){
      	response = JSON.parse(xhr.responseText);

      	for (var result in response.results) {
            // console.log(response.results[result].category);
            var newQuestion = new TriviaQuestion(response.results[result]);

            questionArray.push(newQuestion);
        }

        currentQuestion = questionArray[0];
        printQuestion();

      };

      httpReq.send();


      var response
      var currentQuestion;
      var questionCount=25;
      var quiz= getElementsById(questions);


