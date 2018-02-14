 (function(){


    angular
        .module("turtleFacts",[])
        .controller("listCtrl",listController);



    listController.$inject = ['quizMetrics','dataService'];

    function listController(quizMetrics,dataService){

	// console.log("I am in controller");
	// this.demo="hello"; //or we can use the basic method $scope.demo="hello";
	// this.data=turtlesData;
    this.data=dataService.turtlesData;
	this.activeTurtle={};
	this.changeActiveTurtle=changeActiveTurtle;
	this.activateQuiz=activateQuiz;
	this.search="";
    this.quizMetrics=quizMetrics;
	// this.quizActive=false;


	function changeActiveTurtle(index){
		this.activeTurtle=index;
	}

	function activateQuiz(){
         // this.quizActive=true;
        quizMetrics.changeState("quiz",true);
	}

}

 
})();