/*****
Learn ES6: ECMASCRIPT 2015
*****/

//es6에서 새로운 객체 만들기

// 기존의 ES5의 객체를 만드는 문법은 다음과 같다. 
function getObj(){
	const name = "zoey";
	const getName = function(){
		return name; 
	}
	const setName = function(newname){
		naem = newname;
	}
	const printName = function(){
		console.log(name);
	}
	
	return {
		getName: getName,
		setName: setName
	}
}

var new_obj = getObj();
//console.log(new_obj.getName());


// 그런데 이때 생성된 객체를 return 해주는 문법을 
// ES6에서는 굳이 getName: getName 이렇게 반복해주지 않아도 된다.

function getObjES6(){
	const name = "zoey";
	const getName = function(){
		return name; 
	}
	const setName = function(newname){
		naem = newname;
	}
	const printName = function(){
		console.log(name);
	}
	
	return {getName,setName, name} // 그냥 이렇게 value값 만 작성해줘도 알아서 객체의 key와 value로 구성해서 반환해준다.
}

var sec_obj = getObjES6();
console.log(sec_obj);
