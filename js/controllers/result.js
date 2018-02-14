(function(){

	angular
		.module("turtleFacts")
		.controller("resultCtrl",ResultController);

		ResultController.$inject=['quizMetrics','dataService'];

	function ResultController(quizMetrics,dataService){
		var vm = this;

		vm.quizMetrics=quizMetrics;
		vm.dataService=dataService;
		vm.activeQuestion=0;
		vm.setActiveQuestion=setActiveQuestion;
		vm.setAnswerClass=setAnswerClass;
		vm.calculatePerc=calculatePerc;
		vm.reset=reset;

		function setActiveQuestion(index){
			vm.activeQuestion=index;
		}

		function setAnswerClass(index){
			if(index === quizMetrics.correctAnswers[vm.activeQuestion]){
				return "bg-correct-answer";
			}
			else if(index === dataService.quizQuestions[vm.activeQuestion].selected){
				return "bg-wrong-answer";
			}

		}

		function calculatePerc(){
			return (quizMetrics.numCorrect/dataService.quizQuestions.length)*100;
		}

		function reset(){

			quizMetrics.changeState("result",false);
			quizMetrics.numCorrect=0;
			for (var i = 0; i <dataService.quizQuestions.length; i++) {
				var data=dataService.quizQuestions[i];

				data.selected=null;
				data.correct=null;
			}
		}

	}





})();
