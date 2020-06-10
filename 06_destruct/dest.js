/*****
Learn ES6: ECMASCRIPT 2015
*****/

//es6의 destructuring 디스트럭튜링


// 1. 배열 디스트럭튜링
function destArr(){
	let data = ["10","20","30","40","50"];

	// 만약 배열의 값들을 일부 가져와서 참조하기 위해서는 ES5에서 다음의 문법을 사용한다.
	//let math = data[0];
	//let eng = data[4];
	
	// ES6에서는 다음과 같이 작성할 수 있다.
	let [math, , , ,eng] = data;
	console.log(math, eng);
	// 이렇게 작성해도 math 변수에 data의 배열의 첫번째 값이,
	// eng 변수에 data 배열의 다섯번째 값이 할당된다.
}

//destArr();


// 2. 객체 디스트럭튜링
// 이러한 방식은 객체에서도 적용된다.
function destObj(){
	let obj = {
		name: "zoey",
		address: "Winterfall",
		age: 28
	}

	let {name, age} = obj;
	//console.log(name); //zoey 출력
	//console.log(age); //28 출력
	// obj의 같은 key의 값들이 그대로 새로운 변수의 값으로 할당되었다.

	let {name: myName, age: myAge} = obj;
	console.log(myName);
	console.log(myAge);
	// 이렇게 새로운 변수의 명을 다르게 지정해줄 수도 있다.
	// 이 방법으로도 myName 이라는 새로운 변수의 값이 obj 객체의 name 키의 값으로,
	// myAge라는 새로운 변수의 값이 obj 객체의 age 키의 값을 할당된다.
}
//destObj();



// 3. 디스트럭튜링을 활용해 json 

 // 아래의 json을 파싱받았다고 가정
var geoData = [ 
  {
    "geo": "종로구",
    "code": "11010",
    "geo_code": "11110",
    "rent_apart": "1304",
    "pop": "140959",
  },
  {
    "geo": "중구",
    "code": "11020",
    "geo_code": "11140",
    "rent_apart": "4728",
    "pop": "115128",
  }
];

//여기서 내가 특정 json 데이터 값만을 추출하여서 새롭게 변수로 지정해주고 싶으면?
function destJson(){
	let [ ,jonglo] = geoData; //goeData json의 두번째 객체가 jonglo라는 변수에 지정된다.
	let {geo, geo_code} = jonglo; //jonglo 객체에서도 또 원하는 key만 뽑아서 변수로 지정해준다.
	console.log(jonglo)
	console.log(geo, geo_code)
}
//destJson();

function destJsonMore(){
	let [ , {geo, geo_code}] = geoData; //위의 두번에 걸친 문법을 더 축약해서 이렇게 작성이 가능하다.
	console.log(geo, geo_code)
}

//destJsonMore();




// 4. 디스트럭튜링을 활용해 이벤트 객체 전달

function getGeoList( [ ,geoList] ){ // 여기서 디스트럭튜링이 가능하다. 이렇게 되면 전달받은 배열의 두번째 인덱스.
	console.log(geoList);

};

function getGeoList2( [ ,{geo, geo_code}] ){ // 전달받은 배열의 두번째 인덱스, 그중에서 geo key의 값.
	console.log(geo, geo_code);

};

//이렇게 json 형태의 배열 전체를 전달하고
getGeoList(geoData); 
getGeoList2(geoData); 

//이벤트 객체도 전달 및 디스트럭튜링이 가능하다. 아래의 html div node가 있다고 가정하고
function sendEvOb(){
	document.querySelector("div").addEventListener("click", function(e){
		console.log(e); // 이벤트 객체가 출력된다.
	});

	document.querySelector("div").addEventListener("click", function(e){
		console.log(e.target); // 이벤트 객체 중 target 값이 출력된다.
	});

	// 디스트럭튜링이 적용되면?
	document.querySelector("div").addEventListener("click", function({target}){ //전달 받은 이벤틑 객체중 target만
		console.log(target.innterText); // target객체의 innerText 값이 출력된다.
	});

};


