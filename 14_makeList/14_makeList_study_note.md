# ES6를 bable과 webpack을 활용해 찜하기 목록 만들기

## 1. 개발환경 구축

• 개발에 앞서 먼저 개발환경을 구축해준다. 
npm에서 제공하는 데브 서버 기능을 이용해서
바로바로 데이터의 변화를 반영시켜주는 서버를 구현한다.

>$ npm install --save-dev webpack-dev-server

• package.json에서 모듈이 잘 설치되었는지 확인한다. 
설치가 되었다면 npm 스크립트에 devser를 추가해준다.

>"devserver": "webpack-dev-server --inline"

deserver를 실행하기에 앞서 webpack 번들러를 사용해 bundle.js가 생성이 잘 되는지 확인해준다.
npm 스크립트를 사용해 bundle.js를 생성해준다.
>$ npm run build 

• 생성이 되었다면 터널에서 `weppack-dev-server`를 실행해준다.
>$ npm run devserver 
>multi (webpack)-dev-server/client?http://localhost:8080 

정상적으로 서버가 실행됐다.
이제 8080포트에서 서버가 응답을 기다리고 있다.

• 여기서 주의해야 할 점!
devserver를 설치하고 public path를 config 에서 꼭 지정해줘야한다.
최종적으로 bundle.js가 위치해 있는 디렉토리를 public path로 지정해줘야, 
devserver는 변화를 감지하고 이 public path 에 위치한 js를 참조해 브라우저에 반영해준다.
만약 bundle.js 가 `root/dist/js/` 아래 있다고 한다면 public path는 다음과 같이 지정해준다.
>publicPath: '/dist/js'

새로고침 후 콘솔에 아래 로그가 찍히면, 정상적으로 라이브 모드로 dev server가 동작중이다.
>[WDS] Live Reloading enabled.


## 2. 모듈 구현

• 설정한 개발환경에서 모듈 시스템이 구현되는지 확인하기 위해서 `index.js` 외에
`main.js` 파일을 같은 디렉토리에 만들고, 여기서 Blog 클래스를 생성해서 export 해준다.
다시 `index.js`로 돌아와 blog를 import 해주고, 
모듈로 가져온 클래스를 사용해 인스턴스를 생성한다.

[main.js]
```javascript
class Blog {
	constructor(){
		console.log("blog is started")
	}
}

export default Blog;
```

[index.js]
```javascript
import blog from './main.js'; 
const myBlog = new blog();
```

==> console에 'blog is started' 로그가 찍힌다면 ES6의 모듈 기능이 
정상적으로 구현되는 개발환경이 작동하고 있음을 알 수 있다.


## 3. XHR(XMLHttpRequest) 통신

• `main.js` 에서 blog 클래스를 수정해준다. 
blog 클래스 내부에서 ajax 통신을 이용해 외부 API의 데이터를 받아오고 이를 객체로 변환해주려 한다.

• 클래스에서 데이터 가져오기를 init하는 메소드 `setInitData()`, 실제 가져오는 작동을하는 메소드 `getData()`를 만든다. 생성자 함수는 데이터 가져오기를 init하는 메소드를 실행시키고 API 링크를 넘겨준다.
이제 blog 인스턴스가 생성되면` getData()` 메소드가 호출되면서 ajax 통신이 이뤄진다.

[main.js]
```javascript
class Blog {
	constructor(){
		const dataURL = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=430156241533f1d058c603178cc3ca0e&targetDt=20120101';
		this.setInitData(dataURL);
	}
	setInitData(dataURL){
		this.getData(dataURL, this.insertPosts);
	}	

	getData(dataURL, fn){
		const oReq = new XMLHttpRequest();
		oReq.addEventListener("load", ()=>{
			const list = JSON.parse(oReq.responseText).boxOfficeResult.weeklyBoxOfficeList; 
			fn(list)

		});
		oReq.open("GET", dataURL);
		oReq.send();
	}
	insertPosts(list){
		.....
	}
}

export default Blog;
```

결과: 박스오피스의 영화제목들만 콘솔에 찍한다.

>미션임파서블:고스트프로토콜
>셜록홈즈 : 그림자 게임
>마이 웨이
>퍼펙트 게임
>프렌즈: 몬스터섬의비밀 
>오싹한 연애
>라이온 킹
>극장판 포켓몬스터 베스트 위시「비크티니와 백의 영웅 레시라무」
>앨빈과 슈퍼밴드3
>극장판 포켓몬스터 베스트 위시 「비크티니와 흑의 영웅 제크로무」


•list 객체를 받아와 HTML 태그를 생성하는 메소드를 작성해준다.
ES6의 템플릿 리터럴을 이용해서 HTML 태그를 추가해준다.

[main.js]
```javascript
insertPosts(list){
	const ul = document.querySelector(".postList ul");
	list.forEach( (v)=>{
		ul.innerHTML += `
			<li><p>${v.movieNm}</p></li>
		`;
	})
}
```

## 4. init, set 자료에 데이터 추가

•init 구현
바로 데이터를 불러오는 것이 아니라 이벤트리스너를 추가해,
버튼을 클릭하면 블로그가 init 되도록 클래스의 구조를 변경한다. 
생성자 함수에서 이벤트리스너 추가 메소드들, 데이터필드를 `registerEvents()`로 이동 및 분리시켜준다.

[main.js]
```javascript
constructor(){
	const dataURL = 'blahblah'
	this.registerEvents(); 
}

registerEvents(){
	const startBtn = document.querySelector("#START_BLOG");
	const dataURL = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=430156241533f1d058c603178cc3ca0e&targetDt=20120101';
	startBtn.addEventListener("click", ()=>{
		this.setInitData(dataURL);
	})
}
```

이제 페이지 로딩 즉시 init이 구현되지 않고, 버튼을 클릭하면 ajax 통신이 실행되어 목록이 불러와진다.

•찜하기 기능 추가
목록에 찜하기 버튼을 만들고, 이 버튼을 클릭하면 이벤트가 실행되도록 eventListener를 추가해준다.
이때 일일히 li, span에 이벤트를 걸지 않고 부모 요소에 이벤트를 대신 걸어주는 '이벤트 위임: event delegation'을 활용한다.
또한 이벤트 객체를 전달 할 때 디스트럭튜링이 가능한 점을 이용해 
이벤트 객체의 프로퍼티 중 target객체만 인자로 받는다.
[main.js]
```javascript
registerEvents(){
	....
	blogList.addEventListener("click", ({target})=>{
		const targetClassName = target.className;
		if(targetClassName === "likeBtn"){
			//등록 관련 코드들이 여기에 들어간다.
		}

	})
}
```

•찜한 목록을 담는 set 객체 추가
`Set`은 ES6에서 추가된 중복없이 유일한 값(unique value)을 저장하려고 할때 사용하는 객체다. 일종의 배열.
`.add()` 메소드와 `.has()` 메소드를 통해 이미 해당 값이 존재하는지 체크할 때 유용하다.
[main.js]
```javascript
constructor(){
	this.registerEvents();
	this.likedSet = new Set();
}

registerEvents(){
	....
	blogList.addEventListener("click", ({target})=>{
		const targetClassName = target.className;
		if(targetClassName === "likeBtn"){
			const title = target.previousElementSibling.textContent;
			this.likedSet.add(title);
		}

	})
}
```

•중복으로 선언되는 변수는 피해준다. 생성자 함수에 `setInitVar()` 메소드를 선언해주고,
이 메소드에서 해당 클래스에서 공통적으로 사용하신 변수들을 선언해준다.
[main.js]
```javascript
constructor(){
	// 영화진흥위원회 오픈 API 홈페이지의 박스오피스 데이터
	this.setInitVar();
	this.registerEvents();
	this.likedSet = new Set();
}

setInitVar(){
	this.blogList =  document.querySelector(".postList ul");
}
```

•this 바인딩 문제 해결
Class blog의 데이터 필드로써 blogList를 선언해주고 다른 메소드들 에서 `this.blogList`로 호출하려하자
getData의 콜백함수였던 `insertPosts()`에서 오류가 발생한다. 
`this`가 blog 인스턴스를 정상적으로 가리켜야 `this.blogList`가 호출이 되는데,
this의 참조가 소실되어 undefined 가 떠버리는 것.
이럴 경우 `.bind(this)`를 이용해 this의 참조값을 바인딩 해준다.

[main.js]
```javascript
setInitData(dataURL){
	this.getData(dataURL, this.insertPosts.bind(this)); 
}	

...

insertPosts(list){	
	list.forEach( (v)=>{
		this.blogList.innerHTML += `
			<li><p>${v.movieNm}</p><span class="likeBtn">찜하기</span></li>
		`;
	})

}
```

==> 이제 this.blogList가 정상적으로 호출된다.


## 4. set 데이터 자료로 목록뷰 업데이트 해주기
•목록dom을 업데이트 해주는 메소드 추가
class에 set 데이터 자료로 찜목록뷰를 업데이트해주는 메소드를 추가한다.
이 메소드는 `set`에 `add()`를 해준 이후 호출해주도록 한다.
[main.js]
```javascript
registerEvents(){
	....
	blogList.addEventListener("click", ({target})=>{
		const targetClassName = target.className;
		if(targetClassName === "likeBtn"){
			const title = target.previousElementSibling.textContent;
			this.likedSet.add(title);
			this.updatedLikedList();
		}

	})
}

updatedLikedList(){
	const ul = document.querySelector(".likeList > ul");
	
	let likedSum = "";
	this.likedSet.forEach((v)=>{
		likedSum += `<li><p>${v}</p></li>`;
	});

	ul.innerHTML = likedSum;
};

```
==> 이제 찜하기 버튼이 클릭되면 .likeList ul 태그에 목록이 추가된다.


•찜 완료 표시 및 찜 취소 기능 구현
`if else문`을 추가하여서 클릭했을 때 최초 클릭이면 done 클래스를 추가해줘서 찜이 되었음을 표시하고
만약 이미 찜이된 div라면 done 클래스를 해지시켜준다.
[main.js]
```javascript
registerEvents(){
	....
	blogList.addEventListener("click", ({target})=>{
		const targetClassName = target.className;
		
		if(targetClassName !== "likeBtn" && targetClassName !== "done") return;
		if(targetClassName == "done"){
			...
		}else if(targetClassName == "likeBtn"){
			...
		}

	})
}
```