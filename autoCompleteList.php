<?php

	$dbhost = "localhost";
	$dbuser = "glpi";
	$dbpass = "glpi";
	
	$db = "glpi";
	$conn = mysql_connect($dbhost, $dbuser, $dbpass);
	$dbs = mysql_select_db($db) or die(myql_error());
	
	$result = mysql_query("
	SELECT glpi_locations.name AS room
	FROM glpi_locations
	WHERE glpi_locations.name IS NOT NULL

	UNION ALL
	SELECT glpi_computermodels.name
	FROM glpi_computermodels
	WHERE glpi_computermodels.name IS NOT NULL
	
	UNION ALL
	SELECT glpi_users.firstname AS firstname
	FROM glpi_users
	WHERE glpi_users.firstname IS NOT NULL
	
	UNION ALL
	SELECT glpi_users.realname AS lastname
	FROM glpi_users
	WHERE glpi_users.realname IS NOT NULL
	
	UNION ALL
	SELECT glpi_computers.name AS computername
	FROM glpi_computers
	WHERE glpi_computers.name IS NOT NULL
	
	UNION ALL
	SELECT glpi_plugin_racks_racks.name AS rackname
	FROM glpi_plugin_racks_racks
	WHERE glpi_plugin_racks_racks.name IS NOT NULL")  or die(mysql_error());
	$autoCompleteArray = array();
	while($r = mysql_fetch_row($result)) {
		array_push($autoCompleteArray, $r[0]);
	}
			
	echo json_encode($autoCompleteArray);
?>

