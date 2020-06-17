
class Blog {
	constructor(){
		// 영화진흥위원회 오픈 API 홈페이지의 박스오피스 데이터
		this.setInitVar();
		this.registerEvents();
		this.likedSet = new Set();
	}
	
	setInitVar(){
		this.blogList =  document.querySelector(".postList ul");
	}

	registerEvents(){
		const startBtn = document.querySelector("#START_BLOG");
		const dataURL = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=430156241533f1d058c603178cc3ca0e&targetDt=20120101';
	
		startBtn.addEventListener("click", ()=>{
			this.setInitData(dataURL);
		})
		//event delegate를 활용한다.
		//이벤트 객체를 전달 할 때 디스트럭튜링이 가능한 점을 이용해 
		//이벤트 객체의 프로퍼티 중 target객체만 인자로 받는다.
		this.blogList.addEventListener("click", ({target})=>{
			const targetClassName = target.className;
			//target이 아니면 바로 return 으로 빠져나오게
			if(targetClassName !== "likeBtn" && targetClassName !== "done") return;
			
			const title = target.previousElementSibling.textContent;
			if(targetClassName == "done"){//이미 찜이 된 목록을 클릭한 경우				
				target.className = "likeBtn"
				target.innerText = "찜하기 +"
				//클릭한 제목을 인스턴스의 데이터 set, 자료구조에 추가.
				this.likedSet.delete(title);
			
			}else if(targetClassName == "likeBtn"){
				const title = target.previousElementSibling.textContent;
				//클릭한 제목을 인스턴스의 데이터 set, 자료구조에 추가.
				this.likedSet.add(title);
				//찜 클릭이 된 div에 class를 추가해줘서 이미 찜이 되었음을 표시해준다.
				target.className = "done"
				target.innerText = "찜 취소 -"
			}

			//찜목록을 업데이트 해주는 메소드를 호출해준다.
			this.updatedLikedList();
		})

	}
		
	//set 데이터 자료로 찜목록뷰 업데이트
	updatedLikedList(){
		const ul = document.querySelector(".likeList > ul");
		
		//추가할 html 노드를 문자열로 모아주고 이를 innerHtml로 한번에 할당
		let likedSum = "";
		this.likedSet.forEach((v)=>{
			likedSum += `<li><p>${v}</p></li>`;
		});
		ul.innerHTML = likedSum;
	};

	setInitData(dataURL){
		this.getData(dataURL, this.insertPosts.bind(this)); 
		//이 메소드에서 뭔가 더 추가해도 좋다. do something...
		//또한 콜백에 해당하는 insertPosts()의 내부에서 this가 Class인 Blog를 가리키도록 
		//.bind(this)를 통해 this를 바인딩 해줬다. 
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
		//const ul = document.querySelector(".postList ul"); > 데이터필드로 대체

		//ES6의 템플릿 리터럴을 이용해서 html node를 추가해준다.
		list.forEach( (v)=>{
			this.blogList.innerHTML += `
				<li><p>${v.movieNm}</p><span class="likeBtn">찜하기 +</span></li>
			`;
		})
	
	}

}

export default Blog;