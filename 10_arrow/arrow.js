/*****

ES6 arrow 함수

*****/

function arrowbasic(){
	setTimeout(function(){
		console.log("자바스크립트의 set time out 내장함수");
	}, 500);
	setTimeout(()=>{
		console.log("이렇게 축약해서 표현해보면 어떨까?");
	}, 1500);
};

//arrowbasic()

function arrowWithArr(){
	let newArr = [1,2,3,4,5];

	//기본 es5
	newArr.map(function(value,index,item){
		return value*2;
	});

	//기본 es6
	let v2 = newArr.map((v)=>{
		return v*2;
	});
	console.log(v2);

	// 더 단순한 구문의 경우 아래처럼 표현할 수도 있다.
	let v3 = newArr.map( (v)=> v*3 );
	console.log(v3);
}
//arrowWithArr()

//기존의 콜백 함수들 내부에서는
//콜백함수가 일정 시점 이후에 실행되는 것이기 때문에 this가 window를 가리켰다. 
//그렇기에 만약 callback이 호출되는 객체를 this로 접근하기 위해서는 .bind()가 필요했다.
//그러나 arrow를 이용한 함수 표현식에서는 이 과정이 필요없다.
//콜백함수에서 this를 써주고 별도로 .bind(this)를 해주지 않더라도
//이 this가 콜백이 호출되는 상위 객체를 가리키게 된다.

function arrowAndThis(){
	const obj = { // 객체를 만들어준다
		runTimeout: function(){
			setTimeout(function(){
				console.log(this===window);
			}, 500);
		}	
	}
	
	console.log( obj );
	//obj.runTimeout();

};

//arrowAndThis();

function defaultPara(){

	//이것이 기존의 함수 인자의 기본값 설정 방법
	function sum(value,size){
		var size = size || 1;
		return value*size;
	};

	//ES6가 지원하는 기본값 설정 방법
	function sum2(value,size=1){
		return value*size;
	};

	function sum3(value,size={v:1}){
		return value*size.v;
	};
	console.log( sum3(3, {v:3}) );
};

//defaultPara();



//함수에 인자로 받은 argument는 argument 객체이기 때문에 배열의 메소드는 쓸 수 없다. 
//그래서 from 함수를 사용해서 let arguArr = Array.from(arguments); 이렇게 배열로 바꿔주기도 하는데
//굳이 이렇게 하지 않아도 ES6에서 인자를 '진짜 배열'로 바꿔서 받는 방법이 있다.
//함수를 선언할때 ...arg 라고 쓰게되면 함수로 넘어온 인자들은 배열로 변환되서 사용이 된다.

function checkNum(...arg){
	console.log(toString.call(arg)); //object array 출력
	const result = arg.every( (v) => typeof(v) === "number");
	return result;
};

console.log( checkNum(1,2,3,4,5,"6") ); //false
console.log( checkNum(1,2,3,4) ); //true