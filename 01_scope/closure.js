/*****
Learn ES6: ECMASCRIPT 2015
let/const 등의 지역변수, arrow 함수, 객체리터럴개선, 백킷을 이용한 템플릿 스트링 등
신규 기능과 문법 추가
*****/

var list = document.querySelectorAll("li");
/*
for(var i=0;i<list.length;i++){
	list[i].addEventListener("click", function(){
		console.log(i);
	});
}*/
// list를 클릭하면 list의 순서값이 console에 찍히도록 이벤트리스너를 생성
// 그러나 이렇게 실행하면 1~4번째를 클릭해도 모두 콘솔에 4가 찍힌다. 
// 이는 클로저(closure)로 인해 발생한 문제
// 이벤트 리스너에 추가해둔 콜백함수는 스크립트가 모두 실행 된 뒤
// 이벤트 트리거가 발동되면 실행되는 함수이고,
// 이 콜백안에서 호출된 i 값은 콜백함수의 지역변수가 아닌 외부에서 참조해온 값.
// 이런 i를 클로저 변수.라고 한다.
// 4개의 이벤트리스너는 모두 외부의 클로저변수 i값을 참조하고,
// 이미 i는 for문안에서 4로 변경이 되기 때문에 4가 찍히는 것.


// 이 문제를 ES6의 let 변수로 바로 잡을 수 있다.
for(let i=0;i<list.length;i++){
	list[i].addEventListener("click", function(){
		console.log(i);
	});
}
// let이 블록스코프를 지원하기 때문.
// 위의 경우에는 각 이벤트리스너의 콜백 함수가
// 외부에서 참조해온 let 변수를 기억해두었다가 사용한다.


