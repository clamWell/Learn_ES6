# ES6를 bable과 webpack을 활용해 찜하기 목록 만들기

## 1. 개발환경 구축

• 개발에 앞서 먼저 개발환경을 구축해준다. 
npm에서 제공하는 데브 서버 기능을 이용해서
바로바로 데이터의 변화를 반영시켜주는 서버를 구현한다.

>$ npm install --save-dev webpack-dev-server

• package.json에서 모듈이 잘 설치되었는지 확인한다. 
설치가 되었다면 npm 스크립트에 devser를 추가해준다.

>"devserver": "webpack-dev-server --inline"

** deserver를 실행하기에 앞서 webpack 번들러를 사용해 bundle.js가 생성되어있는지 확인한다.
아직 생성이 되지 않아다면, npm 스크립트를 사용해 bundle.js를 생성해준다.
$ npm run build **

• 생성이 되었다면 터널에서 weppack-dev-server를 실행해준다.
>$ npm run devserver 

[0] multi (webpack)-dev-server/client?http://localhost:8080 
==> 정상적으로 서버가 실행됐다. 이제 8080포트에서 서버가 응답을 기다리고 있다.

•여기서 주의해야 할 점! devserver를 설치하고 public path를 config 에서 꼭 지정해줘야한다.
최종적으로 bundle.js가 위치해 있는 디렉토리를 public path로 지정해줘야, 
devserver는 변화를 감지하고 이 public path 에 위치한 js를 참조해 브라우저에 반영해준다.
만약 bundle.js 가 최상의/dist/js/ 아래 있다고 한다면 public path는 다음과 같이 지정해준다.
>publicPath: '/dist/js'

새로고침 후 콘솔에 아래 로그가 찍히면, 정상적으로 라이브 모드로 dev server가 동작중이다.
[WDS] Live Reloading enabled.


## 2. 모듈 구현

•설정한 개발환경에서 모듈 시스템이 구현되는지 확인하기 위해서 index.js 외에
main.js 파일을 같은 디렉토리에 만들고, 여기서 Blog 클래스를 생성해서 export 해준다.
다시 index.js로 돌아와 blog를 import 해주고, 
모듈로 가져온 클래스를 사용해 인스턴스를 생성한다.

[main.js]
```class Blog {
	constructor(){
		console.log("blog is started")
	}
}

export default Blog;
```

[index.js]
```import blog from './main.js'; 
const myBlog = new blog();
```

==> console에 'blog is started' 로그가 찍힌다면 ES6의 모듈 기능이 
정상적으로 구현되는 개발환경이 작동하고 있음을 알고 있다.


## 3. XHR(XMLHttpRequest) 통신

•main.js 에서 blog 클래스를 수정해준다.
blog 클래스 내부에서 ajax 통신을 이용해 외부 API의 데이터를 받아오고 이를 객체로 변환해주려 한다.

•클래스에서 데이터 가져오기를 init하는 메소드(setInitData), 실제 가져오는 작동을하는 메소드(getData)를 만든다. 생성자 함수는 데이터 가져오기를 init하는 메소드를 실행시키고 API 링크를 넘겨준다.
이제 blog 인스턴스가 생성되면 getData() 메소드가 호출되면서 ajax 통신이 이뤄진다.

[main.js]
```class Blog {
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

==> 결과: 박스오피스의 영화제목들만 콘솔에 찍한다.
미션임파서블:고스트프로토콜
셜록홈즈 : 그림자 게임
마이 웨이
퍼펙트 게임
프렌즈: 몬스터섬의비밀 
오싹한 연애
라이온 킹
극장판 포켓몬스터 베스트 위시「비크티니와 백의 영웅 레시라무」
앨빈과 슈퍼밴드3
극장판 포켓몬스터 베스트 위시 「비크티니와 흑의 영웅 제크로무」


•list 객체를 받아와 DOM node를 생성하는 메소드를 작성해준다.
ES6의 템플릿 리터럴을 이용해서 html node를 추가해준다.

[main.js]
```insertPosts(list){
	const ul = document.querySelector(".postList ul");
	list.forEach( (v)=>{
		ul.innerHTML += `
			<li><p>${v.movieNm}</p></li>
		`;
	})
}
```