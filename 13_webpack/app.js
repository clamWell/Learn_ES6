/*****

ES6 : npm webpack 과 babel 을 사용해 개발환경 구축하기

1. node.js, npm 설치한후 터널을 실행해 babel을 설치할 프로젝트 파일 디렉토리로 간다. 

2.기본 package.json를 생성해준다.
$ npm init -y

3. npm을 이용해 babel-core, babel-cli 을 설치해준다.
$ npm install --save-dev @babel/core @babel/cli

4. 필요한 플러그인을 자동으로 제공해주는 preset 을 설정해준다.
바벨에서 제공ㅇ하는 preset-env을 설치해주면 필요한 플러그인 들을
프로젝트 지원 환경에 맞춰서 동적으로 결정해 준다. 
$ npm install --save-dev @babel/preset-env

5. '.babelrc' 파일을 생성해서 설치한 preset을 사용하겠다고 알려준다.
{
  "presets": ["@babel/preset-env"]
}

6. package.json 을 보면 패키지들이 모두 잘 설치된 것을 볼 수 있다.
이제 package.json 내부에 npm script 를 추가해준다.

  "scripts": {
    "build": "babel src/js -w -d dist/js"
  }

*** 명령문 해석
==> babel 명령을 입력할것이다 
==> src/js 경로에 있는 ES6 스크립트 파일들을 감시하여 자동으로 트랜스파일(-w)
==> ES5로 트랜스파일링된 결과물을 dist/js 경로에 저장하라(-d)

7. 명령을 제대로 입력했으면 터널에서 아래 명령어를 입력해 npm 으로 실행을 해준다
$ npm run build 

Successfully compiled 3 files with Babel (1146ms).
==> 성공적으로 3개의 스크립트 파일들이 트랜스파일링 되었다!

8. 트랜스파일링된 파일이 정상적으로 작동하는지 테스트해본다
node.js를 이용해 경로로 이동한 후 main.js 실행
$ node dist/js/main.js

9. 여기서 문제는 이러한 모듈 기능은 node.js 환경에서 동작한 것이며
브라우저에서는 제대로 동작하지 않는다. 
왜냐면 바벨이 트랜스파일링한 결과물인 require 함수는 commonJS 이고
commonJS는 브라우저에서 지원되지 않기 때문.

실제로 html 문서를 만들어 트랜스파일링된 script를 가져와 브라우저에서 실행해보면
제대로 실행이 되지 않고 콘솔에 에러로그가 찍힌다.
lib.js:3 Uncaught ReferenceError: exports is not defined
    at lib.js:3
main.js:3 Uncaught ReferenceError: require is not defined
    at main.js:3


===> 이를 해결하기 위해서 webpack 기능이 필요하다!

10. webpack 은 모듈들을 하나의 자바스크립트 파일로 번들링 해주는 번듈러다.
webpack을 사용하면 여러 모듈 파일이 하나의 파일이 되므로 별도의 모듈 로더가 필요없고,
html 파엘에서 하나의 sciprt 태그만 로더하면 되므로 간편해진다는 장점이 있다.


11. webpack과 webpack cli를 설치해보자. npm 명령어를 입력해준다.
$ npm install --save-dev webpack webpack-cli 

12. webpack을 실행하기전에 babel을 실행해서 es6 를 es5르 트랜스파일링하게 해야한다.
이를 실행해주는 babel-loader도 설치해준다.
성공적으로 설치되었다면 package.json에서 확인이 가능하다.

13. 이제 package.json에서 npm 스크립트를 수정해서
build 시 babel 이 아니라 webpack이 실행되도록 수정해준다.

"scripts": {
    "build": "webpack -w"
 }


14. webpack을 실행하기에 앞서 webpack 실행에 필요한 설정값을 설정해줘야한다.
webpack.config.js 이름의 js 파일을 생성해서 설정값을 입력해준다.

15. config 파일까지 생성이 완료되면 다시 npm 스크립트를 실행해준다.
$ npm run build

16. 이제 dist/js 디렉토리에 bundle.js 가 생성됐다.
기존의 모듈화된 스크립트를 지우고, 번들링된 스크립트 파일을 html 파일에서 로딩해준다.
<script src="dist/js/bundle.js"></script>

17. 다시 html 문서를 브라우저에서 실행해보면 콘솔에 정상적으로 메소드의 결과물들이 찍히는걸 볼 수 있다. 
3.141592653589793
36.4621596072079
Object
10



*****/



