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

function learnTempBasic(){
	const template = `<div> Welcome ${data[0].name} ~ :) </div>`;
	console.log(template); // <div> Welcome Starbuck ~ :) </div> 출력된다.
}

//learnTempBasic();


function learnTempLiterals(){

	function fn(tags, name, items){
		//console.log(tags);

		//tags는 html tag 영역이 배열로 들어온다.
		//name은 오브젝트의 name 변수
		//items는 아이템 배열
		
		if( typeof items === "undefined"){
			items = "주문 가능한 상품이 지금은 없습니다.";
		}
		
		return (tags[0] + name + tags[1] + items + tags[2]);
		// <div> Welcome twosome ~ :) </div><h2>주문가능항목</h2><div>주문 가능한 상품이 지금은 없습니다.</div>


	};

	// 1. 아래는 문제없다.
	const template1 = `<div> Welcome ${data[0].name} ~ :) </div><h2>주문가능항목</h2><div>${data[0].items}</div>`;
	//console.log(template1);

	// 2. 다만 두번째 배열은 items 가 없기 때문에 undefined가 나와버린다.
	const template2 = `<div> Welcome ${data[1].name} ~ :) </div><h2>주문가능항목</h2><div>${data[1].items}</div>`;
	//console.log(template2);

	// 3. 이를 위해서 템플릿을 함수로 감싼후, 해당 함수에서 일종의 정제 과정을 거칠 수 있다.
	const templateWithFn = fn`<div> Welcome ${data[1].name} ~ :) </div><h2>주문가능항목</h2><div>${data[1].items}</div>`;
	//console.log(templateWithFn);

	//4. 이 과정을 데이터의 갯수만큼 forEach를 돌려서 자동화 해본다.
	data.forEach(function(v){
		let temp = fn`<div> Welcome ${v.name} ~ :) </div><h2>주문
		가능
		항목</h2><div>${v.items}</div>`;
		console.log(temp);
	})

}	

learnTempLiterals();

