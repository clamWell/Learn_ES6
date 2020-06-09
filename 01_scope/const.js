/***** const 변수 *****/

function homeWithVar(){
	var homename = "my house";
	homename = "not my house";
	console.log(homename);
};

function homeWithConst(){
	const homename = "my house";
	homename = "not my house";
	console.log(homename);
};

homeWithVar();
//var 변수의 경우 새로 변수의 값을 할당 및 지정할 경우 바로 변수의 값이 변경된다. 
//ES5까지 만약 변수의 값이 변경되면 안되는 경우,
//변수의 명을 'var NEVER_CHANGE' 식의 대문자로 써주는 컨벤션을 이용해
//'이 변수의 값은 상수이므로 바꾸지 말자'는 약속을 하는 방식으로 변수의 값을 지켰다.

//homeWithConst();
//ES6의 const를 사용해 변수를 선언하면,
//이 변수는 constant variable이 되어서 새로운 값이 할당이 되지 않는다.
//할당 하려고 하면 오류가 난다. 
//변수의 값이 객체, 배열 등이어도 마찬가지.

//ES6 베이스의 코드를 짜는 경우
//const를 기본으로 사용하고
//변경이 될 수 있는 변수의 경우 let을 사용해준다.
//var는 사용하지 않는다.



/****** 그러나 const를 사용하더라도 배열이나 오브젝트의 값을 수정하는 것이 불가능하는 것은 아니다******/
// 즉 불변한 것이 아니라, 재 할당을 막아둔 것
function printList(){
	const list = ["a", "o", "w"];
	list.push("b"); //추가나, 삭제하는 것은 가능하다.
	console.log(list);
}
printList();
// 정상적으로 "a", "o", "w","b" 가 찍힌다.

// 그렇다면 변경이 되지 않는, 불변의 배열(immutable array)을 만들고 싶으면 어떡해야하나?
const list1 = ["a", "o", "w"];
list2 = [].concat(list1, "b"); // .concat()는 배열 합치는 메소드
console.log(list1==list2); //list1의 값은 변경되지 않았고 두개의 값이 다르므로 false가 나온다.

