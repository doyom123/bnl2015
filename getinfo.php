<?php
	
	$dbhost = "localhost";
	$dbuser = "glpi";
	$dbpass = "glpi";
	
	$db = "glpi";
	$conn = mysql_connect($dbhost, $dbuser, $dbpass);
	$dbs = mysql_select_db($db) or die(myql_error());

	$id = $_GET['ID'];	
	$id = mysql_real_escape_string($id);
	
	$displayString;
	$rows = array();
	$class;
	$fresult = mysql_query("SELECT
								glpi_plugin_racks_racks.name AS rackname,
								glpi_locations.name AS room,
								glpi_plugin_racks_racks.id AS rackid,
								glpi_plugin_racks_racks.rack_size
							FROM 
								glpi_plugin_racks_racks
							JOIN glpi_locations on glpi_plugin_racks_racks.locations_id = glpi_locations.id
							WHERE
								glpi_plugin_racks_racks.id = $id");
	while($f = mysql_fetch_assoc($fresult)) {
		
		$displayString .= "<div class=".$f['room'].">".
						       "<div class='clickRackRoom'>".$f['room']."</div>".
						       "<div class='clickRackName'>Rack <a href='http://localhost/glpi/plugins/racks/front/rack.form.php?id=".$f['rackid']."'>".$f['rackname']."</a></br></div>".
						       "<div class='clickRackInfo'>Size:".$f['rack_size']."</div>"
						 ; 
							
							
	}


								
	$qresult = mysql_query("SELECT 
								glpi_plugin_racks_racks.name AS rackname,
								glpi_plugin_racks_racks_items.plugin_racks_racks_id,
   								glpi_plugin_racks_racks_items.items_id,
   								glpi_plugin_racks_racks_items.position,
								glpi_computers.name,
								glpi_computers.id AS computerid,
								glpi_computermodels.name AS modelname,
								glpi_users.firstname,
								glpi_users.realname,
								glpi_operatingsystems.name AS osname,
								glpi_plugin_racks_racks.otherserial AS orientation
      
							FROM 
								glpi_plugin_racks_racks,
								glpi_plugin_racks_racks_items,
								glpi_computers
									JOIN glpi_computermodels on glpi_computers.computermodels_id = glpi_computermodels.id
									LEFT JOIN glpi_users on glpi_computers.users_id_tech = glpi_users.id
									JOIN glpi_operatingsystems on glpi_computers.operatingsystems_id = glpi_operatingsystems.id
									
            				WHERE 
								glpi_computers.id = glpi_plugin_racks_racks_items.items_id
							AND 
								glpi_plugin_racks_racks_items.plugin_racks_racks_id = $id
							AND 
								glpi_plugin_racks_racks.id = $id
							
							ORDER BY glpi_plugin_racks_racks_items.position DESC");
							
	while($r = mysql_fetch_assoc($qresult)) {
		array_push($rows, $r);
		$displayString .= "<div class = 'ric'>".
		
						  "<div class='rackposition'>U".$r['position']."</div>".
						  
						  "<ul id='' class='rackinfocontainer'>".
						  	"<a href='http://localhost/glpi/front/computer.form.php?id=".$r['computerid']."'><li class='rackinfo'>".$r['name']."</li></a>".
						  	
						  	"<li class='rackinfo'>".$r['modelname']."</li>".
						  	"<li class='rackinfo'>".$r['firstname']." ".$r['realname']."</li>".
						  	"<li class='rackinfo'>".$r['osname']."</li>".
						  "</ul></div>";
		
	}
	$displayString .= "</div>";

	echo mysql_fetch_assoc($qresult)[0]['rackname'];
	echo $displayString;
	
		


?>
