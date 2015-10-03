$(document).ready(function(){
  //create empty array
  var questions = [];
  questions.push({
  question: 'Who knocked out the Lakers in the 2006-2007 playoffs?',
  selection: ['Phoenix Suns', 'Denver Nuggets', 'San Antonio Spurs', 'Boston Celtics'],
  answer: 0
});
questions.push({
  question: 'Who ousted Elgin Baylor’s 34.0 PPG to take the Scoring Title in 1962 by more than 10.0 PPG?',
  selection: ['Jerry West', 'Wilt Chamberlain', 'Bill Russell', 'Oscar Robertson'],
  answer: 1
});
questions.push({
  question: 'What year did the Lakers record their string of 33 consecutive wins?',
  selection: ['1990-1991', '1971-1972', '2000-2001', '1957-1958'],
  answer: 1
});

  var Quiz = function(q, target){
    var quiz = this;
    
    //stores questions objects
    quiz.questions = q;
    
    //where we want items to display
    quiz.target = target;
    
    // Add a property to keep track of the current question
    quiz.currentQuestion = 0; 
    
    // Create a method that displays the question in the target element
    quiz.questionDisplay = function() {
      // Make sure the question exists
      // if (currentQuestion less than 0 or larger than the number of questions) invalid
      if(quiz.currentQuestion < 0 || quiz.currentQuestion >= quiz.questions.length){
        return false; //stops execution of line and not do anything else
      }
      
      // MAKE SURE YOU SAVE THIS ;)
      
      // Create a variable that will reference the current question
      var quizQuestion = quiz.questions[quiz.currentQuestion];
      
      // Create the <ul>
      quiz.target.html('<ul></ul>');
      //quiz.target.html($('<ul/>'));
      
      // Create a <li> for the question text
      quiz.target.find('ul').append('<li class="title">' + quizQuestion.question + '</li>');
      
      // Create the <li>'s foreach of the answers (selection)
      // Loop through the answers and append a <li> for each answer
      for(var i = 0; i < quizQuestion.selection.length; i++){
        // TODO: Add a user input element to each li so the user
        // can select an answer.  Look at form inputs and find the
        // most appropriate.
        
        quiz.target.find('ul').append('<li class="answer"><input value="' + i + '" type="radio" name="quizAnswer">' + quizQuestion.selection[i] + '</li>');
      }
      
      return true;
    };
    
    // TODO:
    // Check if the user's guess is correct. Compare the value of
    // the chose form input against the answer of the current question.
    // If the answer is correct, increment a counter that keeps track
    // of the number of correct questions.  If it isn't correct, move on.
    var correctAnswer = 0;

    quiz.checkAnswer = function(){
      var select = quiz.questions[quiz.currentQuestion];
      var chosenAnswer = $('.answer input:checked');   
      
      if (chosenAnswer.length === 0) {
        alert("Please select an answer before submitting.");
        return false;
      }
      
      console.log('Chosen Answer', chosenAnswer.val());
      console.log('Actual Answer', select.answer);
      
      if(+chosenAnswer.val() === select.answer) {
        correctAnswer++;
        $('#correct').text(correctAnswer);
      }
      return true; 
    };
    
    
    quiz.nextQuestion = function(){

      if (!quiz.checkAnswer()){
        return;
      }
      // Logic to get the next question
      quiz.currentQuestion++;
      if (quiz.questionDisplay()) {
        // New question was displayed

      } else {
        // TODO: No more questions.  Display end message
        
        // Hide #next and #score.  Update the text of quiz.target
        // to display an end message
        $('#next').hide();
        $('#score').hide();
        
        quiz.target.html("Congrats you've recorded a score of " + correctAnswer + "/" + quiz.questions.length);
      }
    };
    
    quiz.reset = function(){
      // Step 1) Unhide #next and #score
      $('#next').show();
      $('#score').show();
      
      // Step 2) Reset the current question counter (quiz.currentQuestion)
      quiz.currentQuestion = 0;
      quiz.currentQuestion++;
      // Step 3) Reset the correct answer counter (correctAnswer)
      correctAnswer = 0;
      correctAnswer++;
      
      // Step 4) Display the current question (quiz.questionDisplay)
      quiz.questionDisplay();
    };
    
    return quiz;
  };
  
  // Call the Quiz function, pass in your questions and the target element ID 
  // that you want the quesitons to be displayd in
  var quizApp = Quiz(questions, $('#quiz-area'));
  
  quizApp.questionDisplay(); // currentQuestion = 0, valid question
  
  $('#score').on('click', quizApp.nextQuestion);
  $('#totalQuestions').text(questions.length);
  
  // TODO: Add event listener for reset
  $('#reset').on('click', quizApp.reset);
});

