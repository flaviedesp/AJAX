<?php
header("Content-Type: text/plain");
header("Access-Control-Allow-Origin: *");
// Tests du web service ws_contacts :
// http://localhost:81/ws_contacts/index.php    : affiche une aide
// http://localhost:81/ws_contacts/index.php?req=contact|versement|secteur&format=csv|xml|json[&wait=]
// http://localhost:81/ws_contacts/index.php?req=versement&numcontact=XXX[&wait=]

	$req="";
	$format="json";
	if (isset($_REQUEST['req'])) {
		$req = $_REQUEST['req'];
	if (isset($_REQUEST['format'])) {
		$format = $_REQUEST['format'];
	}
	require("dataDB.inc.php");
		
	if (isset($_REQUEST['wait'])) sleep(5);  // retard la réponse de 5 secondes
	switch ($req) {
		case 'contact':
			$sql = "SELECT * FROM contact ORDER BY nom ASC";
			$rs = $base->query($sql);
			if (!$rs) {
				//die ("Requete : mysql_query($slq, $base)".mysql_error());
				print("{Erreur de requete} : ".$sql);
				}
			$output = $rs->fetchAll(PDO::FETCH_ASSOC);
			switch ($format) {
				case "json":
					$contacts = json_encode($output);
					break;
				case "csv":
					$contacts = csv_encode($output);
					break;
				case "xml":
					$contacts = xml_encode($output);
					break;
			}
			print($contacts);
			break;
		case 'versement':
			$where = "";
			if(isset($_REQUEST['numcontact'])) $where = " WHERE numero_contact=" . $_REQUEST['numcontact'];
			$sql = "SELECT * FROM versement" . $where . " ORDER BY numero_contact ASC";
			$rs = $base->query($sql);
			if (!$rs) {
				//die ("Requete : mysql_query($slq, $base)".mysql_error());
				print("{Erreur de requete} : ".$sql);
				}
			$output = $rs->fetchAll(PDO::FETCH_ASSOC);
			$versements = json_encode($output);
			print($versements);
			break;
		case 'secteur':
				$sql = "SELECT * FROM secteur ORDER BY code";
				$rs = $base->query($sql);
				if (!$rs) {
					//die ("Requete : mysql_query($slq, $base)".mysql_error());
					print("{Erreur de requete}");
					}
				$output = $rs->fetchAll(PDO::FETCH_ASSOC);
				$secteurs = json_encode($output);
				print($secteurs);
			break;
		default:
			$output = "{erreur de requête}\nSyntaxe :\n";
			$output .= "index.php?req=contact|versement|secteur&format=csv|xml|json[&wait=]\n";
			$output .= "index.php?req=versement&numcontact=XXX[&wait=]";
			echo $output;
			//print("{".$output."}");
	}
	} else {
//http_response_code(404);
header("HTTP/1.0 204 Not Found", true);
}
	
function csv_encode($out) {
	$contactCsv = "";
	for ($i=0; $i<count($out); $i++) {
		$cont = $out[$i];
		$contactCsv .= $cont["numero"].";".$cont["nom"].";".$cont["adresse"].";".$cont["code_postal"].";";
		$contactCsv .= $cont["ville"].";".$cont["code_secteur"];
		if ($i != count($out)-1) $contactCsv .= "\n";
	}
	return $contactCsv;
}	
?>
