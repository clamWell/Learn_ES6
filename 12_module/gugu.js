
	function printGuguAll(){
		printGugu(1,9);
	}

	function printGugu(x,y){
		for(var i=x; i <= y; i++)
			for(var j=1; j <= 9; j++)
				console.log(i+'*'+j+'='+i*j);
	}

	
	module.exports = { // 이 모듈은 이 객체를 노출합니다.
		print: printGugu,
		printAll: printGuguAll
	};
	