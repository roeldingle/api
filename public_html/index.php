<?php


class Index{

    function __construct(){
        $aData['menu'] = self::_getMenuList("modules");
        self::_getDisplay($aData);
    }
    
	private function _getDisplay($aData){
        include("views/v_index.php");
    }
	
	private function _readFilesDir($sDirPath){
		$aFileReturn = array();
		if(is_dir($sDirPath)){
			if ($handle = opendir($sDirPath)) {
				while (false !== ($file = readdir($handle))){
					if (($file != ".") && ($file != "..")){
						array_push($aFileReturn,$file);
					}
				}
				closedir($handle);
			}
		}
		sort($aFileReturn);
		return $aFileReturn;
	}
	
	private function _getMenuList($sDir){
		$sReturn = '';
		$aData = self::_readFilesDir($sDir);
		if(!empty($aData)){  #ul 1
			$sReturn .= '<ul>';
			
			foreach($aData as $val){
				$aData = self::_readFilesDir($sDir."/".$val);
				$sReturn .= '<li>';
				$sReturn .= (!empty($aData)) ? '<a href="javascript:void(0);"><i class="icon-plus-sign"></i></a>' : '<i class="icon-" style="margin-left:5px"></i>';
				$sReturn .= ucwords($val);
				$sReturn .='</li>';
				
				if(!empty($aData)){ #ul 2
					$sReturn .= '<ul>';
					foreach($aData as $va){
						$aData = self::_readFilesDir($sDir."/".$val."/".$va);
						$sReturn .= '<li>';
						$sReturn .= (!empty($aData)) ? '<a href="javascript:void(0);"><i class="icon-plus-sign"></i></a>' : '<i class="icon-" style="margin-left:5px"></i>';
						$sReturn .= ucwords($va);
						$sReturn .='</li>';
						
						if(!empty($aData)){ #ul 3
							$sReturn .= '<ul>';
							foreach($aData as $v){
								$sPath = $sDir."/".$val."/".$va."/".$v;
								$aData = self::_readFilesDir($sPath);
								$info = pathinfo($sPath);
								if($info["extension"] == "php"){
									$sReturn .= '<li><a href="javascript:void(0);" class="selected-api" alt="'.$sPath.'">';
									$sReturn .= ucwords(str_replace(".php","",$v));
									$sReturn .='</a></li>';
								}
								
							}
							$sReturn .= '</ul>';
							
						} #end ul 3
					}
					$sReturn .= '</ul>';
				
				} #end ul 2
			}
			
			$sReturn .= '</ul>';
		} #end ul 1
		
		return $sReturn;
	
	}
    
   
}

new Index;