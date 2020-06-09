/*****
Learn ES6: ECMASCRIPT 2015
*****/

//es6에서 새로 추가된 from 메소드

function addMark(){
	let newData;

	// javascript는 함수에서 인자값을 별도로 미리 선언해주지 않아도
	// 만약 인자의 값이 전달이 되었을 때
	// 함수 내부에서 arguments 라고 미리 약속한 키를 통해 접근이 가능하다.
	// arguments 는 일종의 객체라고 볼 수 있다.
	// 이 경우에서는 arguments는 1,2,3,4,5,6 
	// 일반적으로는 권장하는 문법이 아닌데,
	// 만약 함수가 넘겨받는 인자의 갯수가 정해져 있지 않은 경우에는 
	// arguments를 활용하는 것이 좋다.

	/*
	for(let i=0; i<arguments.length;i++){
		newData.push(arguments[i]+"!");	
	}*/

	//arguments로 건내받은 인자 목록들을 활용하고 싶은데
	//배열의 모양을 하고 있는 arguments는 정작 배열이 아닌 객체다.
	//즉 map()과 같이 배열에 사용하는 메소드를 사용할 수가 없다.
	//이때 arguments를 새로운 '진짜' 배열로 바꿔주는 메소드가 바로 from 이다.

	let arguArr = Array.from(arguments); //arguments로 부터 배열을 만든다 라는 뜻!
	newData = arguArr.map(function(v){
		return v+"!";
	}); 

	console.log(newData);
}

addMark(1,2,3,4,5,6);
