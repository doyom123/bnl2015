<?php
	$dbhost = "localhost";
	$dbuser = "glpi";
	$dbpass = "glpi";
	
	$db = "glpi";
	$conn = mysql_connect($dbhost, $dbuser, $dbpass);
	$dbs = mysql_select_db($db) or die(myql_error());
	
	$room = $_POST['data'];
	$result = mysql_query("SELECT * 
						   FROM glpi_plugin_racks_racks
						   WHERE locations_id = $room") or die(mysql_error());
	$rows = array();
	while($r = mysql_fetch_assoc($result)) {
		array_push($rows, $r);
	}
			
	echo json_encode($rows);
	
?>
