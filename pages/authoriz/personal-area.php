<?php
	
	$all_prod = $db->getDataTableProduction();
	
	if(!empty($_SESSION['clientId'])){
		$client = $db->getClient($_SESSION['clientId']);
	}
?>
<script>
	var data = <?php echo json_encode( $all_prod ); ?>;	
</script>
<div class="text">
	<h1>Кабинет онлайн-заказа</h1>
	<img src="img/stripeML.png" alt="полоса"/>
	<img src="img/spikeletML.png" alt="колосок"/>
	<div class="textIn">
		<p id="welcome">Здравствуйте, <span><?php echo $client['entity'].' '.$client['address'];?></span> !</p>
		<ul class="menu_personal">
			<li><a id="button_addorder" href="/onlayn-zakaz.html" class="stat">Добавить заказ</a></li>
			<li>
				<a id="button_stat" href="/onlayn-zakaz.html?stat" class="retract">Статистика заказов</a>
				<!--<div id="footnote" class="footnote">1</div>-->
			</li>
			<li><a href="/onlayn-zakaz.html?exit=true" class="logout">Выйти</a></li>
		</ul>
		<div class="clear"></div>
		<?php 
		    $type_ordermenu = '';
			if(!isset($_GET['stat'])){
				if(isset($_GET['send'])){
					$type_ordermenu = '';
					if($_GET['send'] == 'true'){
						include 'pages/authoriz/thanks.php';
					}else{
						include 'pages/authoriz/nosend.php';
					}
				}else{
					$type_ordermenu = 'add';
					include 'pages/authoriz/order.php';
				}			
			}else{
				$type_ordermenu = 'stat';
				include 'pages/authoriz/stat.php';
			}
		?>		
	</div>
</div>