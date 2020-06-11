/*****

디스트럭튜링과 set을 활용해서 로또 번호 만들기

로또번호는 번호가 중복되면 안되므로 유일한 값만을 갖는 set 객체를 활용한다.

*****/


//로또번호 생성과 관련된 세팅
const SETTING = {
	name : "ZOEYFULL LOTTO",
	count : 6,
	maxNumber: 45
}

//특정 넘버 범위 안에서 랜덤 값을 리턴해주는 사용자 정의 함수
const randomWithRange = function(n1, n2){
	return Math.floor((Math.random() * (n2 - n1 + 1)) + n1);
}	

//로또 번호를 담는 set 객체 생성
let rottoNumb = new Set();

const getRandomNumber = function(){
	
	//디스트럭튜링을 이용해 SETTING 값 가져와 변수에 할당
	let {count, maxNumber} = SETTING;

	//set의 size() 메소드는 set의 값의 갯수를 반환해준다. 배열의 length 와 비슷
	while( rottoNumb.size < count ){ // set의 갯수가 최대갯수를 넘지 않을때까지 루프
		let tempN = randomWithRange(1, maxNumber) //1~45개의 숫자중 랜덤으로 반환
		if( !rottoNumb.has(tempN) ){ //중복이 아니라면
			rottoNumb.add(tempN)
		}
	};
	
	let rottoNumbArr = Array.from(rottoNumb);
	return rottoNumbArr;
}

rottoNumb = getRandomNumber();

console.log("이번 한 주"+SETTING.name+"의 번호는");
rottoNumb.forEach(function(v){
	console.log(v) 
})
