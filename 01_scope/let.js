/*****
Learn ES6: ECMASCRIPT 2015
let/const 등의 지역변수, arrow 함수, 객체리터럴개선, 백킷을 이용한 템플릿 스트링 등
신규 기능과 문법 추가
*****/

var name = "global var";
function home(){
	var home_var = "home var";
	for(var i=0; i<100;i++){
		
	}
	console.log(i); 
	//여기서 i는 home 함수안의 지역 변수.
	//ES5버전까지는 이처럼 함수 단위의 변수 스코프만이 존재.
	//만약 i가 함수내에서 선언되지 않았다면,
	//ES5의 자바스크립트는 스코프 체이닝을 따라 외부의 전역변수 중에서 i를 찾는다.

}
home();
//console에 100이 찍힌다.

function home2(){
	var home_var = "home var";
	for(let i=0; i<100;i++){
		
	}
	console.log(i); 
	//여기서 i값이 찍히지 않는다.
	//ES6에서 제공되는 let은 블록단위 변수로
	//이때의 변수i의 스코프는 for문(블록) 안.

	if(true){
		let myif = "MY IF"
	}
	console.log(myif);
	//여기서도 변수 myif 값이 찍히지 않는다.
	//myif 변수는 if문 블록의 스코프를 갖기 때문. 
}
home2();



