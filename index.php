<?php 
	session_start();  //session	
	
	//button exit from online-order
	if(!empty($_GET['exit']) && $_GET['exit'] == 'true'){
		unset($_SESSION['access']);
		session_destroy();
		Header("location: /");		
	}	
	
?>
<!DOCTYPE HTML>
<html lang="ru">	
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	    <title>Докшицкий хлебозавод | Минское представительство</title>
		<link rel="stylesheet" href="fontello/css/fontello.css">
		<link rel="stylesheet" href="css/reset.css">		
		<link rel="stylesheet" href="css/style.css">	
		<link rel="shortcut icon" type="image/x-icon" href="img/favicon.ico">
	</head>
	<body>
		<?php									
			preg_match_all('#.*(/.+?)\.html.*$#',$_SERVER['REQUEST_URI'], $str);
			$item_menu = substr($str[1][0], 1);
			include 'database/db.php';	
			$db = new db();
		?>
		<script>
			var item_menu = <?php echo json_encode( $item_menu ); ?>; 
		</script>
		<div class="wrapper">
			<header>				
				<div class="left-stripe">
					<p>ОАО "Витебскхлебпром"</p>				
				</div>
				<a href="/" class="logo"></a>
				<div class="right-stripe">				
					<p>Минское представительство</p>
				</div>
			</header>
			<!-- mobile menu -->
			<div class="mobile">
				<img src="img/spikelet-left.png" alt="колосок левый"/>
				<img src="img/spikelet-right.png" alt="колосок правый"/>
				<p>Минское представительство</p>				
			</div>
			<div id="bmenu" class="icon-menu-1"></div>
			<a id="orderm" href="onlayn-zakaz.html">Онлайн-заказ</a>
			<div class="clear"></div>
			<div id="mobile-menu" class="mobile-menu">
				<ul>
					<li><a href="/">Главная</a></li>
					<li><a href="produktsiya.html">Продукция</a></li>
					<li><a href="prays.html">Прайс</a></li>
					<li><a href="usloviya.html">Условия</a></li>
					<li><a href="o-nas.html">О нас</a></li>
					<li><a href="mesta-prodazh.html">Места продаж</a></li>
					<li><a href="kontakty.html">Контакты</a></li>
					<li><a href="onlayn-zakaz.html">Онлайн-заказ</a></li>
				</ul>			
			</div>
			<div id="screen"></div>
			<!--end mobile menu-->
			<div id="menu" class="menu">				
				<ul>
					<li><a href="produktsiya.html">Продукция</a></li>
					<li><a href="prays.html">Прайс</a></li>
					<li><a href="usloviya.html">Условия</a></li>
					<li><a href="o-nas.html">О нас</a></li>
					<li><a href="mesta-prodazh.html">Места продаж</a></li>
					<li>
						<a href="kontakty.html">Контакты</a>
						<a href="onlayn-zakaz.html" class="order" id="obutton">Онлайн-заказ</a>
					</li>					
				</ul>				
			</div>
			<div class="content">
				<?php 
					if(file_exists($_SERVER['DOCUMENT_ROOT'].'/pages/'.$item_menu.'.php')){
						include 'pages/'.$item_menu.'.php'; 						
					}else{
						if(!empty($item_menu)) include 'pages/404.php';
					}
					if($item_menu == 'sql') include 'pages/404.php';
					if(empty($item_menu)) include 'pages/main-page.php';					
				?>				
			</div>
			<footer>
				<div class="down-stripe">
					<img src="img/horizontal2.png" alt="линия"/>
					<img src="img/spikelet-left.png" alt="колосок левый"/>
					<img src="img/spikelet-right.png" alt="колосок правый"/>
				</div>
				<ul class="sub-menu">
					<li><a href="o-nas.html">О нас</a></li>
					<li><a href="kontakty.html">Контакты</a></li>
				</ul>
				<div class="mobile">
					<img src="img/spikelet-left.png" alt="колосок левый"/>
					<img src="img/spikelet-right.png" alt="колосок правый"/>
					<p>ОАО "Витебскхлебпром"</p>				
					</div>
				<p class="icon-copyright"> 2019 Вячеслав Щерба пв217ПО</p>
				<img src="img/bread.png" alt=""/>
			</footer>			
		</div>
		<script src="js/mainpagelogic.js"></script>
	</body>
</html>