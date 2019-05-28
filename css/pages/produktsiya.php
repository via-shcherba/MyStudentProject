<?php
	include 'database/getDataTableProduction.php';	
	$directory_img = 'fotoprod';			
?>
<!-- put data from PHP into JS -->
<script>
	var all_prod = <?php echo json_encode( $all_prod ); ?>; 
</script>
<!-- -->
<div class="carousel">					
	<div class="sidebar" id="sidebar">
		<h1>Продукция</h1>
		<img src="img/stripeML.png" alt="колосок"/>
		<img src="img/spikeletML.png" alt="полоса"/>
		<div id="prodBox">
			<div class="foto-frame">
				<img src="" alt="" class="bigFoto" id="bigFoto" />
				<div class="cost"></div>
				<div class="weight"></div>
				<div class="expiration"></div>
				<div class="code icon-barcode"></div>
				<div class="icon-zoom-in-1"></div>
				<div class="loupe" id="loupe" ></div>
			</div>
			<h2></h2>
			<p></p>
			<p></p>
			<p></p>
			<p></p>	
			<p class="recommend"></p>
		</div>
	</div>
	<div class="show">
		<ul class="list" id="list">
		
			<?php
				foreach($all_prod as $el){
					$rub = explode(".",$el['cost'])[0];
					$pen = explode(".",$el['cost'])[1];  
					echo '
					<li data-id="'.$el['id'].'">
						<img src="'.$directory_img.'/'.$el['image'].'" alt="'.explode(" ",$el['name_prod'])[0].'"/>
						<p>'.$el['name_prod'].'</p>
						<div class="cost">'.$rub.'р.<sup>'.$pen.'к.</sup></div>
						<img class="stripe" src="img/horizontalDS.png" alt="линия"/>
					</li>
					';					
				}
			?>
																			
		</ul>
	</div>
	<div class="clear"></div>
</div>
<!-- modile version -->
<div class="carousel-mobile" id="carousel-mobile">
	<h1>Продукция</h1>
	<img src="img/stripeML.png" alt="колосок"/>
	<img src="img/spikeletML.png" alt="полоса"/>
	<div id="prodBoxM">									
		<div class="mfoto foto-frame">
			<img src="" alt="" />
			<div class="cost"></div>
			<div class="weight"></div>
			<div class="expiration"></div>
			<div class="code icon-barcode"></div>						
			<div class="triangle-left"></div>
			<div class="triangle-right"></div>
			<div id="count" class="icon-right-big">1</div>
		</div>		
		<h2></h2>
		<p></p>
		<p></p>
		<p></p>
		<p></p>
		<p class="recommend"></p>				
	</div>	
</div>
<!-- end modile version -->
<script src="js/productlogic.js"></script>
			