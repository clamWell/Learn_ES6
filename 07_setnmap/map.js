/*****
Learn ES6: ECMASCRIPT 2015
*****/

//es6의 map 배열
//1. map
//ES6에서 추가된 오브젝트의 새로운 자료구조
//set이 array가 개선된 자료구조였다면 map은 object가 개선된 자료구조 인것.
//Array -> set, weakset
//Object -> map, weakmap
//map은 키와 밸류(key/value), 두가지로 저장되어있다.
//Map 혹은 WeakMap은 객체에 대해 추가적인 정보를 담을 때 유용하다. 
//이 객체(key)의 추가적인 정보(value)를 1대1로 지정

const learnMap = function(){
	let myMap = new Map();
};
//learnMap();


//weak map 은 weak set과 마찬자지로
//값의 참조가 끊어지면 value 가 사라진다.

const learnWeakMap = function(){
	let myWm = new WeakMap();
	let myFunc = function(){};
	//이 함수가 얼마나 실행됐지 알고 싶을 때.
	
	myWm.set(myFunc, 0) // 값을 지정해줌. myfunc => 0 인 값이 하나 들어감
	console.log(myWm);

	let count = 0;
	for(let i =0;i<10;i++){
		//get 메소드는 key 값을 기준으로 value 값을 가져온다.
		count = myWm.get(myFunc); //최초는 디폴트인 0
		count ++; //count 가감
		myWm.set(myFunc, count); // 값을 다시 지정
	}
	
	console.log(myWm.get(myFunc)); //myWm 위크맵의 myFunc 의 값을 가져온다: 10
	console.log(myWm.has(myFunc)); //true

	myFunc = null; //myFunc를 null로 초기화
	console.log(myWm.get(myFunc)); //참조가 사라졌기 때문에: undefined
	console.log(myWm.has(myFunc)); //false
	
};
//learnWeakMap();



const inst = function(){
	
	//Area라는 클래스를 지정
	const Area = function(height, width){
		this.height = height;
		this.width = width;
	}
	//클래스의 메소드 지정
	Area.prototype.getArea = function(){
		return this.height*this.width;
	};

	let myarea = new Area(10,20);
	console.log(myarea.getArea()); //200
	console.log(myarea.width); // 20
	//인스턴스의 변수에 이렇게 쉽게 접근이 가능하다.
	//이걸 접근하지 못하게 하는 방법이 있을까?

};	
//inst();


// 아래의 예는 weak map을 활용한 것
const instUseMap = function(){
	
	//클래스 생성 함수 밖 전역 공간에 weak map 객체 생성
	const wm = new WeakMap();
	
	//클래스 생성 함수에서 기존의 방식이 아닌
	const Area = function(height, width){
		//weakMap에 인스턴스의 값을 key value 로 대신 지정해주는 것!
		wm.set(this, {height, width});
	}
	//클래스의 메소드 지정
	Area.prototype.getArea = function(){
		const {height, width} = wm.get(this); //wm객체 내에 있는 해당 인스턴스의 height,width 값을 가져와서 임시로 width, height 변수에 담아준다.
		return height*width;
	};

	let myarea = new Area(10,20);
	console.log(myarea.getArea()); //200
	console.log(myarea.width); // undefined
	//메소드는 호출이 되지만 
	//myarea라는 인스턴스를 통해서는 변수에 접근이 되지 않는다.

};	
instUseMap();