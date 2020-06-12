/*****

ES6 
Class를 이용한 object 생성

자바스크립트는 프로토타입 기반(prototype-based) 객체지향 언어(Object-Oriented Programming).
클래스가 아닌 생성자 함수와 프로토타입, 클로저를 사용하여 객체 지향 프로그래밍을 구현하였다.

생성자 함수로 가짜 클래스를 선언하고,
생성자 함수를 통해 인스턴스들을 찍어내고,
포로토타입 체인을 통해 상속을 구현하는 등...

ES6에서는 기존의 프로토타입 기반 뿐 아니라 클래스 기반으로도 동일한 작업을 수행 할 수 있도록
class라는 키워드를 도입했다. 
이때의 클래스는 생성자 함수보다 더 엄격하게 동작한다.(덜 자바스크립트스럽다 ㅎㅎ)

*****/


// 1. 기존의 prototype-based 객체지향 표현식
function protoBased(){
	
	function Health(name){
		this.name = name;	
	}

	Health.prototype.showHealth = function(){
		console.log("Have a good day, "+ this.name);
	};
		
	const inst_zoey = new Health("zoey");
	inst_zoey.showHealth();

};
//protoBased();



// 2. 새로 도입된 Class based 객체지향 표현식
function classBased(){

	// 클래스 이름은 성성자 함수와 마찬가지로 파스칼 케이스를 사용하는 것이 일반적
	// 물론 파크칼케이스를 사용하지 않는다고 에러가 나는건 아니다!
	class Health {
		
		//생성자 함수 정의는 constructor 메소드를 사용한다.
		//constructor는 클래스 내에 한 개만 존재할 수 있다. 2개 이상의 constructor가 있으면 에러 발생
		//constructor 정의를 생략하기도 하는데, 그러면 ES6가 자동으로 빈 객체를 생성해준다.
		constructor(name, lastTime){
			//클래스필드 지정
			//*클래스 필드는 기존 프로토베이스 표현식에서 this에 추가된 프로퍼티를 가리키는 이름
			//*클래스의 내부에서 지정된 변수를 가리킨다. 데이터 멤버 혹은 멤버변수라고 부르기도 한다.
			this._name = name;
			this._lastTime = lastTime;
		}
	
		//클래스의 메소드 선언
		//클래스의 내부에는 메소드만 선언이 가능하다. 클래스 필드 선언은 constructor 내부에서만.
		showHealth(){
			console.log(`Have a good day, ${this._name} :)`);
		}
	}

	const inst_zoey = new Health("zoey");
	inst_zoey.showHealth();


	//여기서 그럼 인스터스인 inst_zoey 와 클래스인 health의 변수형은 무엇일까?
	//.toString.call()을 사용해서 알아보면
	console.log(toString.call(inst_zoey)); //[object Object]
	console.log(toString.call(Health)); //[object Function] 

	//그렇다. 사실 클래스는 함수였다.
	//즉 실제로 클래스가 생긴 것이라기 보다는 겉모습만 Class의 흉내를 낸것.


};
//classBased();

//2.2 클래스의 접근자 프로퍼티 get, set(getter, setter)
function getSet(){

	class Spec {
		constructor(arr=[], name){
			this._specList = arr;
			this._name = name;
		}
	
		showSpec(){
			console.log(`${this._name} is ${this._specList}`);
		}

		// get을 이용해 getter 접근자 지정
		// array 프로퍼티의 첫번째 요소를 반환해주는 함수 
		get firstSpec() {
			return this._specList.length ? this._specList[0] : null;
		}

		// set을 이용해 setter 접근자 지정
		// array 프로퍼티의 첫번째 요소를 추가, 지정하는 함수
		set firstSpec(elem) {
			this._specList = [elem, ...this._specList];
		}
	
	}
	
	const zoeySpec = new Spec(["thinking", "coding", "design"], "my spec list");

	//zoeySpec.showSpec();
	console.log( zoeySpec.firstSpec ); //thingking

	//클래스 필드에 값을 할당하면 setter가 호출된다
	zoeySpec.firstSpec = "running";
	console.log( zoeySpec.firstSpec ); //running
	zoeySpec.showSpec(); // my spec list is running,thinking,coding,design

};
//getSet();

//2.2 클래스의 정적 메소드
function staticMethod(){

	class Spec {
		constructor(arr=[], name){
			this._specList = arr;
			this._name = name;
		}
	
		static staticMethod(){
			console.log(`이것은 클래스 고유의 정적 메소드. 인스턴스를 통해서는 호출할 수 없다`);
		}

		prototypeMethod(){
			console.log(`이것은 ${this._name}의 메소드!`)
		}
	}
	
	const zoeySpec = new Spec(["thinking", "coding", "design"], "zoey");

	Spec.staticMethod();
	zoeySpec.prototypeMethod();
	//인스턴스는 클래스의 정적 메소드를 사용할 수 없다
	//zoeySpec.staticMethod(); 


};
staticMethod();


// 3. object create 메소드로 부모의 프로퍼티를 상속받은 객체 생성
function objectCreate(){
	
	//객체 선언
	const lunchObj = {
		showLunchTime : function(){
			console.log("Today's lunch Time is " + this._lunchTime );
		}
	};

	// object create 메소드로 객체를 만든다
	const myLunch = Object.create(lunchObj);
	
	myLunch._lunchTime = "11:45";
	myLunch._name = "zoey";

	//콘솔에 찍어보면 myLunch 객체 안에는 showLunchTime 함수가 없지만,
	//프로토타입에 해당 함수가 들어있음을 알 수 있다.
	console.log(myLunch);
	//그래서 함수를 호출시키면 프로토타입 체인에 따라서 상위 프로토에 있는 함수를 가져와 실행한다. 
	myLunch.showLunchTime();


};
//objectCreate();

// 4. ES6에서 개선된 object assign 기능
function objectAssign(){
	
	//객체 선언
	const lunchObj = {
		showLunchTime : function(){
			console.log("Today's lunch Time is " + this.lunchTime );
		}
	};

	// object assign 메소드를 사용하면,
	//프로토타입 객체를 상속받으면서 새로운 프로퍼티도 할당이 동시에 가능하다.
	const myLunch = Object.assign(Object.create(lunchObj), { 
		lunchTime : "12:10",
		name : "zoey"
	});

	console.log(myLunch);
	myLunch.showLunchTime();
};

//objectAssign();


// 5. object assign 기능을 이용해 immutable 객체 만들기
function makeimobj(){
	const preObj = {
		name: "hungry-zoey",
		lunchTime: "11:30"
	};
	
	//object asssign 을 통해서 일반 객체를 프로토로 상속받고
	//preObj의 프로퍼티를 그대로 할당 받을 수 있다.
	//추가적으로 인자로 넘겨 또다른 프로퍼티의 할당, 재할당이 가능하다.
	const myLunch = Object.assign({}, preObj, { "name":"not-hungry-zoey", "lunchTime" : "12:30" });
	//console.log(myLunch)

	const myLunchHungry = Object.assign({}, preObj, {});
	// myLunchHungry 는 preObj와 프로퍼티의 값이 완벽하게 동일하지만,
	// 메모리상에 별개로 저장되어 있기때문에 서로 완벽하게 다른 객체이다. 
	console.log(myLunchHungry === preObj) 
	
	// 이런 object assign 의 특징을 활용하면
	// 객체를 카피해서 새로운 객체를 반환할 때 유용하다.

};

//makeimobj();