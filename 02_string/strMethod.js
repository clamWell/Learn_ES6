/*****
Learn ES6: ECMASCRIPT 2015
*****/

//es6에서 새로 추가된 문자열 메소드
// .startsWith(), .endsWith(), .includes()

let str = "hello world, nice to meet you" 
// 이런 기본적인 문자열이 있을때,
// 이 문자열이 'hello'로 시작하는 문자열인지 아닌지를 알고 싶으면?

// 정규표현식 사용 할 수 있음.
let matchstr = "hello"; //이렇게 비교하고자 하는 문자열을 따로 선언해주고, 정규표현식 활용.

// 1. ES6의 startsWith() 메소드.
// 인자로 비교하고자 하는 문자열을 넣어주면, 그 문자열로 시작하는 아닌지를 알려줌.
console.log(str.startsWith(matchstr)); //true 찍힘
let matchstr2 = "hellooo";
console.log(str.startsWith(matchstr2)); //false 찍힘

// 2. ES6의 endsWith() 메소드.
// 인자로 비교하고자 하는 문자열을 넣어주면, 그 문자열로 끝나는지 아닌지를 알려줌.
let endMatchstr = "meet you";
console.log(str.endsWith(endMatchstr));//true 찍힘

// 2. ES6의 includes() 메소드.
// 인자로 비교하고자 하는 문자열을 넣어주면, 그 문자열을 포함하고 있는지 알려줌.
let incloudestr = "world";
console.log(str.includes(incloudestr));//true 찍힘