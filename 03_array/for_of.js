/*****
Learn ES6: ECMASCRIPT 2015
*****/

//es6에서 새로 추가된 문법 for ~ of

//1. 기존 ES5의 .forEach()는 배열에서 메소드로 작동하면,
//각 배열을 돌며(순회하며) 인자로 받은 함수를 실행한다.
var data = [1,2,undefined, NaN, null, ""];
function m_forEach(){
	data.forEach(function(value){
		console.log("value: ", value);
	});
}
//m_forEach();

//2. 같은 작업을 하는 ES5의 문법이 for/in 문
function m_forIn(){
	for(let idx in data){
		console.log("value: ", data[idx]);	
	}
}

//for/in은 기본적으로 객체(오브젝트)의 값을 순회하는 문법인데
//위의 경우에는 배열 타입의 객체를 순회한 것
//이 경우의 문제점은 이 배열의 상위 프로토타입에 추가된 값도 for/in이 출력할 수 있다는 것

Array.prototype.getIndex = function(){ console.log("blahblah")}
//이렇게 array 객체 프로토타입에 새로운 변수 값을 지정해주면, 
//for/in문은 이 변수조차 출력해버린다.
//즉 좋은 패턴은 아니다. 배열에서는 for/in을 쓰지 말자.
//m_forIn();

//3. 이러한 for/in 문의 단점을 보완한 것이 ES6의 문법이 for of 문법
//이 경우는 상위 프로토타입에 새로 할당된 값은 출력되지 않는다.
function m_forOf(){
	for(let value of data){
		console.log("value: ", value);	
	}
};
m_forOf();

//4. for of는 문자열도 순회할 수 있다.
var str = "let's use ES6"
function m_forOfStr(){
	for(let value of str){
		console.log(value);
	}
};	
m_forOfStr();



