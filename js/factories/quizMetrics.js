(function(){
		
		angular
			.module("turtleFacts")
			.factory("quizMetrics",QuizMetrics);


			QuizMetrics.$inject=['dataService'];

			function QuizMetrics(dataService){
		
			var quizObj={
 			quizActive : false,
 			resultsActive: false,
 			correctAnswers:[],
 			numCorrect:0,
 			changeState:changeState,
 			markQuiz:markQuiz
			};
			
			return quizObj;
			
			function changeState(metric,state){
				if(metric === "quiz"){
					quizObj.quizActive= state;	
				}
				else if(metric === "result"){
					quizObj.resultsActive= state;
				}
				else{
					return false;
				}
			}

			function markQuiz(){
				quizObj.correctAnswers=dataService.correctAnswers;
				for (var i = 0; i < dataService.quizQuestions.length; i++) {
					if(dataService.quizQuestions[i].selected===dataService.correctAnswers[i]){
						dataService.quizQuestions[i].correct=true;
						quizObj.numCorrect++;
					}
					else{
						dataService.quizQuestions[i].correct=false;
					}
				}

			}

			
	
			
		}
})();
