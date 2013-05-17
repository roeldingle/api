google.load('search', '1'); 

var method = getMethod();
google.setOnLoadCallback(method.load);


function getMethod(){

	var elemHolderId = "content";
	
	function _initApi(api_name){
		return new google.search.VideoSearch();
	}
	
	function _initSearch(){
		return new google.search.SearchControl();
	}
	
	return {
		load: function(){
			var apiObject = _initApi();
			var searchControl = _initSearch();
			var initSearch = document.getElementById(elemHolderId).title;
			searchControl.addSearcher(apiObject);
			searchControl.draw(document.getElementById(elemHolderId));
			if(initSearch !== ""){searchControl.execute(initSearch);}
		}
	}
}

