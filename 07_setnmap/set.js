/*****
Learn ES6: ECMASCRIPT 2015
*****/

//es6의 set 배열
//1. Set: 중복없이 유일한 값(unique value)을 저장하려고 할때 사용하는 클래스 
//일종의 값을 담고 있는 그릇. 이미 해당 값이 존재하는지 체크할 때 유용하다.

const learnSet = function(){
	let mySet = new Set();

	//(1) set의 메소드 중 add()는 값을 추가하는 메소드이나
	//이미 해당 값이 set배열에 있는 경우 추가하지 않는다.
	mySet.add("first");
	mySet.add("second");
	mySet.add("first");

	//console.log(mySet); 
	//(2) set 도 forEach() 를 사용할 수 있다.
	mySet.forEach(function(v){
		console.log(v) // 이 결과 first와 second만 추가되었음을 알 수 있다.
	})

	//(3) set의 메소드중 has()는 인자로 받은 값이 존재하는지 안하는지 체크해줌
	//있으면 true 아니면 false
	console.log(mySet.has("first")) //true
	console.log(mySet.has("third")) //false

	//(4) delete() 메소드는 값을 삭제한다.
	mySet.delete("first");
	console.log(mySet.has("first"))  //false
};

//learnSet();


// 2. WeakSet
// set와 비슷하나 참조를 가지고 있는 객체만 set 저장이 가능하다.
// 만약 값 중에 참조가 끊어져서 garbage collection 이 되는 값은 weak set에서 사라진다.
// 즉 객체 형태를 중복없이 보관하고 싶을때
// 여러가지 객체들을 모아두고 싶을때 사용하면 되는 class

const learnWeakSet = function(){

	let arr = [1,2,3,4];
	let arr2 = [5,6,7,8];
	let obj = {arr, arr2};
	let myfunc = function(){};
	
	let myWs = new WeakSet();

	myWs.add(arr);
	myWs.add(arr2);
	myWs.add(obj);
	//myWs.add(1111); 1111 은 단순 숫자타입(number)이므로 객체가 아니다. add()가 되지 않는다.

	console.log(myWs.has(arr),myWs.has(arr2)); // true, ture

	//weakset 이 참조를 하고 있는 객체를 null 값으로 바꿔버린다.
	//이때 arr는 참조를 잃는다.
	arr = null;

	//arr이 참조를 잃었으므로 myWs은 arr 객체를 갖고 있는 것 처럼 보이지만
	//실제로 has 메소드로 확인을 해보면 아니다.
	//false가 나온다.
	console.log(myWs.has(arr),myWs.has(arr2)); // false, true
};
learnWeakSet();




