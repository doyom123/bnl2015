<?php
	
	$dbhost = "localhost";
	$dbuser = "glpi";
	$dbpass = "glpi";
	
	$db = "glpi";
	$conn = mysql_connect($dbhost, $dbuser, $dbpass);
	$dbs = mysql_select_db($db) or die(myql_error());
	
	$searchString = $_GET['data'];	
	$searchString = mysql_real_escape_string($searchString);
	
	$result = mysql_query("
	SELECT 
		glpi_locations.name AS room,
		glpi_plugin_racks_racks.name AS rackname,
		glpi_plugin_racks_racks.id AS rackid,
		glpi_plugin_racks_racks_items.items_id,
		glpi_plugin_racks_racks_items.position,
		glpi_computers.name AS computername,
		glpi_computers.id AS computerid,
		glpi_computermodels.name AS modelname,
		glpi_users.firstname,
		glpi_users.realname,
		glpi_operatingsystems.name AS osname
	FROM
		glpi_plugin_racks_racks
		JOIN glpi_plugin_racks_racks_items on glpi_plugin_racks_racks.id = glpi_plugin_racks_racks_items.plugin_racks_racks_id
		JOIN glpi_computers on glpi_plugin_racks_racks_items.items_id = glpi_computers.id
		JOIN glpi_computermodels on glpi_computers.computermodels_id = glpi_computermodels.id
		LEFT JOIN glpi_users on glpi_computers.users_id_tech = glpi_users.id
		JOIN glpi_operatingsystems on glpi_computers.operatingsystems_id = glpi_operatingsystems.id
		JOIN glpi_locations on glpi_plugin_racks_racks.locations_id = glpi_locations.id
	WHERE 
	
		glpi_computers.name LIKE '$searchString%'
		OR glpi_computers.name LIKE '%$searchString%'
		OR glpi_computermodels.name LIKE '$searchString%'
		OR glpi_computermodels.name LIKE '%$searchString%'
		OR glpi_plugin_racks_racks.name LIKE '$searchString%'
		OR glpi_plugin_racks_racks.name LIKE '%$searchString%'
		OR glpi_users.realname LIKE '$searchString%'
		OR glpi_users.realname LIKE '%$searchString%'
		OR glpi_users.firstname LIKE '$searchString%'
		OR glpi_users.firstname LIKE '%$searchString%'
		OR glpi_operatingsystems.name LIKE '$searchString%'
		OR glpi_operatingsystems.name LIKE '%$searchString%'
		OR glpi_locations.name LIKE '$searchString%'
		OR glpi_operatingsystems.name LIKE '%$searchString%'")  or die(mysql_error());
	$searchArray = array();
	while($r = mysql_fetch_assoc($result)) {
		array_push($searchArray, $r);
	}
			
	echo json_encode($searchArray);
	
	
	
	
?>

