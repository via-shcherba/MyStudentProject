<?php 
	$dateaddress = $db->getDataForSellsLocation();
?>
<script>
	var dateaddress = <?php echo json_encode( $dateaddress ); ?>; 	
</script>
<div class="text">
	<h1>Места продаж</h1>
	<img src="img/stripeML.png" alt="полоса"/>
	<img src="img/spikeletML.png" alt="колосок"/>
	<div class="textIn">
		<p>
			На карте обозначены места продаж нашей продукции (продовольственные магазины Минска в которые осуществляется поставка продукции)
		</p>
		<div id="map"></div>
		<p>
			*Кликните по маркеру - узнаете название магазина и дату последнего привоза продукции!
		</p>
		<script src="js/sellsLocationLogic.js"></script>
	</div>
</div>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB2moYuHUrP15MPzvQ8H7JW8KL22PSgPk4&callback=initMap">
</script>
<script>
	if(+screen.width < 650) window.scrollBy(0, 195);
</script>

