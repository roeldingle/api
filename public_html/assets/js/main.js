var methods = getMethods();
var events = getEvents(methods);
events.load();
	

/*events*/
function getEvents(method){
	
	return {
		
		load: function(){
			var self = this;
			self.initialized();
			self.events();
		},
		
		initialized: function(){
			methods.initMenuList();
		},
		
		events: function(){
		
			$("#menu-list a").click(function(){
				var elem = this;
				methods.menuClicked(elem);
			});
			
			$(".selected-api").click(function(){
				var elem = this;
				var elem_alt = $(elem).attr('alt');
				methods.selectApi(elem_alt);
			});
		
		}
		
		
		
	}
}

/*methods*/
function getMethods(){

	return {
		initMenuList: function(){
			var parentUl = $("#menu-list").children("ul");
			parentUl.show();
			parentUl.children("ul:first").show();
			$("#menu-list ul li:first i").removeClass("icon-plus-sign").addClass("icon-minus-sign");
		},
		
		menuClicked: function(elem){
			if($(elem).children("i").attr("class") === "icon-plus-sign"){
				$(elem).children("i").removeClass("icon-plus-sign").addClass("icon-minus-sign");
			}else{
				$(elem).children("i").removeClass("icon-minus-sign").addClass("icon-plus-sign");
			}
			$(elem).parent("li").next("ul").slideToggle(100);
		},
		
		selectApi: function(api_path){
			var api_arr = api_path.split("/");
			var codePath =  api_arr[0]+"/"+api_arr[1]+"/"+api_arr[2]+"/assets/js/"+api_arr[3].replace(".php",".js");
			var outputPath =  api_path;
			
			$("#code-content").attr("src",codePath);
			$("#output-content").attr("src",outputPath);
			
		}
	
	}



}