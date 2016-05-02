<!DOCTYPE html>
<html>



<head>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js" charset="utf-8"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
	<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
	<script type="text/javascript" src="info.js"></script>
	<script type="text/javascript" src="search.js"></script>
	<link href="style.css" rel="stylesheet" type="text/css" >
	<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
</head>

<body>
	
	
	<div id="sidebarTop">
		<!--
		<div id="menuContainer"> 
			<a href=# class="menuButtons" id="BCF"> BCF </a><span class="slash">/</span>
			<a href=# class="menuButtons" id="S7"> S7 </a><span class="slash">/</span>
			<a href=# class="menuButtons" id="CDCE"> CDCE </a><span class="slash">/</span>
			<a href=# class="menuButtons" id="HOME">H</a>
		</div>
		
		
		<div id="searchContainer">
			<a id="searchLink" href=#>
			<form>
				<input  type="text" id="search" placeholder="" />
			</form>
			</a>
		</div>
		-->
		
		<div class="ui-widget" id="searchContainer">
			<label for="tags"> </label>
			<form>
			<input type="text" id="tags" class="search" />
			</form>
		</div>
		
	</div>
	<div id="sidebarBottom">
		<div id="infoContainer">
			<div id="info">
	
			
			</div>
		</div>
	</div>
	
	
	
	<script type="text/javascript">
	$("#S7").click(function() {
		currentRoom = 185;
		d3.select(".tooltip").remove();
		$(".menuButtons").removeClass("selectedMenuBCF");
		$(".menuButtons").removeClass("selectedMenuCDCE");
		$(this).toggleClass("selectedMenuS7");
		d3.select("svg")
		  .attr("transform", "translate(50,100)"  + " scale(1)");	
		
	});
	
	$("#BCF").click(function() {
		currentRoom = 183;
		d3.select(".tooltip").remove();
		$(".menuButtons").removeClass("selectedMenuS7");
		$(".menuButtons").removeClass("selectedMenuCDCE");
		$(this).toggleClass("selectedMenuBCF");
		d3.select("svg")
		  .attr("transform", "translate(-100,-400)" + " scale(1)");	
	});
		
	$("#CDCE").click(function() {
		currentRoom = 186;
		d3.select(".tooltip").remove();
		$(".menuButtons").removeClass("selectedMenuBCF");
		$(".menuButtons").removeClass("selectedMenuS7");
		$(this).toggleClass("selectedMenuCDCE");
		d3.select("svg")
		  .attr("transform", "translate(-800,-400)" + " scale(1)");	
	});
		
	
	plotLocations();
	</script>
	
	<?php
	
	
	
	$hostname = $_GET['hostname'];
	if($hostname) {	
		echo '<script type="text/javascript">search("'.$hostname.'")</script>';
	}

?>
	

</body>

</html>


