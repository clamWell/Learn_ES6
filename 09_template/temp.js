/*****

ES6 Template 기능
UI 개발을 할때 json으로 데이터 응답을 받아서
자바스크립트 오브젝트로 변환해준 후에 화면에 뿌려주는
즉 dom 노드를 추가해주는 템플릿 개발이 자주 사용된다. 

ES6전까지는 이것이 까다로웠다.
데이터 + HTML 문자열의 결합이 필요했기 때문이다.

최근에는 react, angular 과 같이
virtual dom을 활용한 프레임워크들이 지원이 되어서
비교적 이러한 작업들이 수훨해졌다.

ES6가 지원해주는 백킷, temlplate 또한 이러한 템플릿 작업을 
보다 쉽게 할 수 있도록 돕는다.

*****/


// 아래의 json 형태의 데이터가 있음
const data = [
	{
		name: "Starbuck",
		order: true,
		items: ["coffee","latte","macaron"]
	},
	{
		name: "twosome",
		order: false
	}
];

//ES6는 아래와 같이 ``사이에서 html 문자열과 데이터의 결합을 허용한다.
//데이터는 jquery의 $표시와 중괄호 사이에 객체명으로 호출해준다.

const template = `<div> Welcome ${data[0].name} ~ :) </div>`;
console.log(template); // <div> Welcome Starbuck ~ :) </div> 출력된다.




