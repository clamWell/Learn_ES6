/*****

filter, includes, from 을 이용해 문자열 e 가 포함된 배열을 만들어서 반환

*****/

function getArrWithE(){
	let nodeList = document.querySelectorAll("li"); //노드리스트는 객체 타입
	let nodeListArr = Array.from(nodeList); //이를 from 메소드를 이용해 배열로 변환
	let NodeArrWithE = nodeListArr.filter(function(value){ 
		return value.innerText.includes("e"); //includes 메소드를 이용해 e가 포함된 배열 반환
	})
	return NodeArrWithE;
	
};
console.log ( getArrWithE() );


