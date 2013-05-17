<!DOCTYPE>
<html>
<head>
    <title></title>
    <link rel="stylesheet" type="text/css" href="assets/css/libs/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="assets/css/libs/bootstrap-responsive.css">
    <link rel="stylesheet" type="text/css" href="assets/css/style.css">
</head>
<body>
    <div id="wrap">
        <!-- container -->
        <div class="container">
    
            <!--header-->
            <div class="row-fluid" id="header">
                <a href="javascript:location.reload();">
                    <div class="span12">
                        <h1>Api</h1>
						
                    </div>
                </a>
            </div> <!--/header-->
            
            <hr />
            
            <div class="row-fluid" id="content-top">
            
                <div class="span3 box-wrap" id="menu-wrap" style="display:inline-block">
                    <h2>Api list</h2>
					<div id="menu-list" class="span12" style="height:85%;display:inline-block; overflow:auto;">
						<?php echo $aData['menu'];?>
					</div>
					
                </div>
                <div class="span9 box-wrap" id="code-wrap">
                    <h2>Code</h2>
					<iframe src="" id="code-content" style="width:100%;height:80%" frameBorder="0" >
					
					</iframe>
                </div>
            
            
            </div> <!--/content-->
            
             <div class="row-fluid" id="content-bottom">
                <div class="span12 box-wrap" id="output-wrap">
                    <h2>Output</h2>
					
					<iframe src="" id="output-content" style="width:100%;height:80%" frameBorder="0" >
					
					</iframe>
                </div>
            </div> <!--/content-->
            
            
            
            
        </div>
    </div>   
	<script src="assets/js/libs/jquery.min.js"type="text/javascript"></script>
	<script src="assets/js/main.js"type="text/javascript"></script>
</body>
</html>

