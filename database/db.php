<?php

class db{	
	var $connect;
	function db(){
		$host = 's06.host-food.ru';
		$login = 'h139830_h1398301';
		$password = '8E9tlnfEV';
		$db = 'h139830_bread';
		
		define("DB_HOST", $host);
		define("DB_LOGIN", $login);
		define("DB_PASSWORD", $password);
		define("DATABASE", $db); 
		
		$link = mysqli_connect(DB_HOST,DB_LOGIN,DB_PASSWORD,DATABASE) or die (mysqli_error());
		mysqli_query($link, "SET NAMES 'utf8'");
		$this->connect = $link; 		 
	} 
	
	function getClient($id){
		$query = "SELECT entity.entity_name AS entity, clients.address_unload AS address FROM `clients` JOIN `entity` ON entity.id = clients.entity_id
		WHERE clients.id='$id'";
		$data = mysqli_query($this->connect, $query);
		$client = mysqli_fetch_assoc($data);
		return $client;
	}
	
	function getDataTableProduction(){
		$query = "SELECT * FROM `product`";
		$data = mysqli_query($this->connect, $query);
		for($all_prod = array(); $row = mysqli_fetch_assoc($data); $all_prod[] = $row);
		return $all_prod;
	}
	
	function getDataForSellsLocation(){
		$query = "SELECT clients.address_unload as address, MAX(order.date_order) as date, entity_name as name, clients.location FROM `order` JOIN `clients` ON clients.id = order.id_client
		JOIN `entity` ON entity.id = clients.entity_id
		GROUP BY order.id_client";
		$data = mysqli_query($this->connect, $query);
		for($dateaddress = array(); $row = mysqli_fetch_assoc($data); $dateaddress[] = $row);
		return $dateaddress;
	}	
	function checkAccess($login, $pass){
		$query = "SELECT COUNT(clients.id) AS co, clients.id AS id, entity.entity_name AS entity, clients.address_unload AS address FROM `clients` 
		JOIN `entity` ON entity.id = clients.entity_id
		WHERE clients.name_user='$login' AND clients.password='$pass'";
		$data = mysqli_query($this->connect, $query);
		return mysqli_fetch_assoc($data);	
	}
	
	function searchDublicate($date){
		$query = "SELECT id FROM `order` WHERE date_order='".$date."'";
		$data = mysqli_query($this->connect, $query);
		for($res = array(); $row = mysqli_fetch_assoc($data); $res[] = $row);
		return $res;
	}
	
	
	function insertOrderIntoDb($client, $date, $arrayIdp, $arrayAmount){
		$sendControl = true;
		for($i=0;$i<count($arrayIdp);$i++){
			$query = "INSERT INTO `order` (id_client, id_production, amount, date_order)
			VALUE(".$client.", ".$arrayIdp[$i].", ".$arrayAmount[$i].", '".$date."')";
			$res = mysqli_query($this->connect, $query);	
			if($res != 1) $sendControl = false;
		}
		return $sendControl;
	}
} 

?>