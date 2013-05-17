<?php
class News{
	function __construct(){
		self::display();
	}
	
	private function display(){
		$sApi = strtolower(__CLASS__);
		$aData['api'] = $sApi;
		include_once("views/v_".$sApi.".php");
	}

}

new News;