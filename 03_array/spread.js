/*****
Learn ES6: ECMASCRIPT 2015
*****/

//es6에서 새로 추가된 문법2
//1. spread operator : 펼침 연산자
//펼침 연산자는 ...로 표현을 한다.
//...의 의미는 뒤에오는 값을 그대로 펼쳐서 보여준다라는 의미. ctrl+c/v의 의미.

function learnSprOp(){
	let preData = ["a", "b", "c"];
	let newData = [...preData]; //preData를 복사
	
	//그렇다면 두 데이터는 같은 걸까?
	console.log(preData == newData); //false
	console.log(preData === newData); //false
};

//learnSprOp();
//데이터의 값은 같더라도, 이 둘은 각각 다른 데이터다.
//newData는 preData 카피본으로, 기존의 참조가 끊어지고 
//메모리상 새로운 공간에 새로운 값으로 할당된다.


//2. spread operator 활용하기
//펼침연산자를 이용하면 다른 배열의 값을 특정 배열의 값 사이에 끼어 넣기가 가능하다
function useSprOp(){
	let preData = ["a", "b", "c"];
	let newData = ["x", "y", ...preData, "d"]; 
	console.log(newData); 
};

//useSprOp();

// 3. 기존의 ES5 문법상 함수에 인자로 배열 값을 차례대로 넘겨주고 싶을 때
function useApply(){
	let preData = [100, 200, 300];
	function sum(a,b,c){
		return a+b+c;
	}
	//apply 함수를 이용해 sum 함수에 배열의 값들을 차례차례 인자로 넘겨준다.
	//apply 함수의 첫번째 인자는 context, 두번째는 배열
	var result = sum.apply(null, preData); //이 경우에는 context는 null
	console.log(result);
}

//useApply();

//위의 apply를 통한 구현 방식을, ES6의 펼침연산자를 활용해 대신 할 수 있다.

function withSpOp(){
	let preData = [100, 200, 300];
	function sum(a,b,c){
		return a+b+c;
	}

	var result = sum(...preData); //...가 말그대로 펼쳐주는 연산자 이기때문에 preData의 배열 값들을 그대로 펼쳐져서 넘겨준다.
	console.log(result);
}
withSpOp();


/// 즉 펼침연산자는 기존의 배열을 변경하지 않으면서 그대로 복사해와 새로운 배열을 만들고 싶을 때,
/// 혹은 함수에 배열의 값들을 인자로 그대로 넘겨주고 싶을 때 유용하게 사용할 수 있다. 