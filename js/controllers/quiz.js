(function(){

	angular
		.module("turtleFacts")
		.controller("quizCtrl",QuizController);
		
		 QuizController.$inject = ['quizMetrics','dataService'];
		
		function QuizController(quizMetrics,dataService){
			 	
			 	var vm = this;
        		 vm.quizMetrics = quizMetrics;
        		 vm.dataService = dataService;
        		 // vm.onQuestionSelected=onQuestionSelected;
        		 vm.activeQuestion=0;
        		 vm.setActiveQuestion=setActiveQuestion;
        		 vm.questionAnswered=questionAnswered;
        		 vm.selectedAnswer=selectedAnswer;
        		 vm.finalizeAnswers=finalizeAnswers;
        		 vm.error=false;
        		 vm.finalize=false;
        		 var numQuestionAnswered = 0; 

        		
        		 function setActiveQuestion(index){
        		 	if(index === undefined){
        		 		var breakOut = false;
        		 		var quizLength = dataService.quizQuestions.length -1;
        		 		while(!breakOut){
        		 			vm.activeQuestion=vm.activeQuestion < quizLength?(++vm.activeQuestion):0;
        		 			//console.log(vm.activeQuestion);
        		 			if(vm.activeQuestion===0){
        		 				vm.error=true;
        		 			}
        					if(dataService.quizQuestions[vm.activeQuestion].selected === null){
        						breakOut=true;
        					}	
        		 		}	
        		 	}
        		 	else{
        		 		vm.activeQuestion=index;
        		 	}
        		 	
        		 }

        		 function questionAnswered(){
        		 	
        		 	var quizLength=dataService.quizQuestions.length;

        		 	if(dataService.quizQuestions[vm.activeQuestion].selected !== null){
        		 		
        		 		numQuestionAnswered++;
        		 		if(numQuestionAnswered>=quizLength){
        		 			//finalixze quiz
        		 			for (var i = 0; i < quizLength; i++) {
        		 				if(dataService.quizQuestions[i].selected === null){
        		 					vm.setActiveQuestion(i);
        		 					return;
        		 				}
        		 			}
        		 		vm.error=false;
        		 		vm.finalize=true;
        		 		return;
        		 		}	
        		 	}

					vm.setActiveQuestion();

        		 }


        		 function selectedAnswer(index){
        		 	dataService.quizQuestions[vm.activeQuestion].selected=index;
        		 	
        		 }

        		 function finalizeAnswers(){
        		 	vm.activeQuestion=0;
        		 	numQuestionAnswered=0;
        		 	quizMetrics.markQuiz();
        		 	quizMetrics.changeState("quiz",false);
        			quizMetrics.changeState("result",true);
        		 		
        		 }

        		// console.log("In Quiz Controller");
		}

})();
