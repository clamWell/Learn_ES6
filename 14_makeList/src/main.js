
class Blog {
	constructor(){
		// 영화진흥위원회 오픈 API 홈페이지의 박스오피스 데이터
		const dataURL = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=430156241533f1d058c603178cc3ca0e&targetDt=20120101';
		this.setInitData(dataURL);
	}

	setInitData(dataURL){
		this.getData(dataURL, this.insertPosts);
		//이 메소드에서 뭔가 더 추가해도 좋다. do something...
	}	

	getData(dataURL, fn){
		//ajax 통신용 XHR 객체를 생성해준다.
		const oReq = new XMLHttpRequest();
		//수신이 되면 콘솔에 responseText를 찍어준다.
		oReq.addEventListener("load", ()=>{
			
			//API를 통해 json 형태로 받은 데이터를 원하는 형태로 가공해준다.
			//먼저 JSON.parse() 함수를 사용해주면 data를 객체 형태로 바꿔준다.
			const list = JSON.parse(oReq.responseText).boxOfficeResult.weeklyBoxOfficeList; 
			//받은 객체 중에서 원하는 목록에 해당하는 요소를 찾아서 이를 목록 변수에 할당한다.
			
			//이 목록 객체를 처리하는 소스는 콜백함수에 넘겨준다.
			//getData 메소드의 범용성을 높여주기 위해서다.
			//getData 메소드는 어디까지나 ajax 통신을 하고 데이터를 가져와서
			//json 객체에 담아주는 역할을 수행한다.
			fn(list)

		});

		oReq.open("GET", dataURL);
		oReq.send();
	}

	//list 객체를 받아와 DOM node를 생성하는 메소드를 지정한다.
	insertPosts(list){
		
		//목록을 담고있는 dom 객체 
		const ul = document.querySelector(".postList ul");

		//ES6의 템플릿 리터럴을 이용해서 html node를 추가해준다.
		list.forEach( (v)=>{
			ul.innerHTML += `
				<li><p>${v.movieNm}</p></li>
			`;
		})
	
	}

}

export default Blog;