<?php	
	$order = null;
	$dateOrder = null;
	if(isset($_GET['getorder']) && !empty($_GET['getorder'])){
		$order = $db->getOrder($_SESSION['clientId'], $_GET['getorder']);
		$dateOrder = $_GET['getorder'];
	}
	if(!empty($_POST['client']) && !empty($_POST['date']) && !empty($_POST['idp']) && !empty($_POST['amountp'])){
		$client = $_POST['client'];
		$date = $_POST['date'];
		$arrayIdp = $_POST['idp'];
		$arrayAmount = $_POST['amountp'];
		
		$dublicate = array();
		$dublicate = $db->searchDublicate($date);
		
		if(!empty($dublicate)){			
			$db->deleterows($dublicate);								 
		}
			
		$sendControl = $db->insertOrderIntoDb($client, $date, $arrayIdp, $arrayAmount);
				
		if($sendControl){
			echo("<script>location.href='/onlayn-zakaz.html?send=true'</script>");
		}else{
			echo("<script>location.href='/onlayn-zakaz.html?send=false'</script>");
		}
	}

	if(!empty($_POST['login']) && !empty($_POST['password'])){
		$login = md5($_POST['login']);
		//$login = $_POST['login'];
		$pass = md5($_POST['password']);
		//$pass = $_POST['password'];
		
		$check = $db->checkAccess($login, $pass);
						
		if($check['co'] == 1){				
			$_SESSION['access'] = 'true';
			$_SESSION['clientId'] = $check['id'];
		}else{
			include 'pages/authoriz/error.php';
		}		
	}
	// if empty all - show athorization page
	if(empty($_POST['login']) && empty($_POST['password']) && empty($_SESSION['access'])){
		include 'pages/authoriz/protection.php';
	}
	
	// if session isset
	if(!empty($_SESSION['access']) && $_SESSION['access'] == 'true'){
		include 'pages/authoriz/personal-area.php';		
	}	
	
?>
<script>	
	let active_item_order = <?php echo json_encode($_SESSION['access']);?>;
	let obutton = document.getElementById('obutton');
	if(active_item_order) obutton.classList.add('oactive'); 
	if(+screen.width < 650) window.scrollBy(0, 195);
</script>
