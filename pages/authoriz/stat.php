<?php
	$dateOrders = $db->getDateOrderFor14days($_SESSION['clientId']);
	//echo md5('svyaz').' '. md5('111');
?>
<div class="stat">
	<h3>Статистика заказов за последние 14 дней</h3>
	<div class="innerStat">
		<div>
			<table>
				<thead>
					<tr>
						<th>Дата доставки</th>
						<th>День недели</th>
						<th>Количество позиций, шт</th>
						<th>Количество, шт.</th>
						<th>Вес, кг.</th>
						<th>Сумма заказа, руб.</th>
					</tr>
				</thead>
			</table>	
		</div>
		<?php
			$totalAmountPositions = 0;
			$totalAmount = 0;
			$totalWeight = 0;
			$totalCost = 0;
			for($i=0;$i<count($dateOrders);$i++){
				$getOrder = $db->getOrder($_SESSION['clientId'], $dateOrders[$i]['date']);
				$amount = 0;
				$sumCost = 0;
				$weight = 0;		
				
				
				for($j=0;$j<count($getOrder);$j++){
					$amount += $getOrder[$j]['amount'];
					$CostWeightTax = $db->getCostWeightTaxProd($getOrder[$j]['id_production']);
					$priceWithTax;
					if(isset($discont) && $discont > 0){
						$priceDiscont = $CostWeightTax['cost'] - ($CostWeightTax['cost'] * ($discont / 100));
						$priceWithTax = $priceDiscont + ($priceDiscont * ($CostWeightTax['tax'] / 100));
					}else{
						$priceWithTax = $CostWeightTax['cost'] + ($CostWeightTax['cost'] * ($CostWeightTax['tax'] / 100));
					}
					
					$sumCost += round($priceWithTax, 2) * $getOrder[$j]['amount'];
					$weight += round($CostWeightTax['weight'] * $getOrder[$j]['amount'], 2);
				}
				echo '<a href="onlayn-zakaz.html?getorder='.$dateOrders[$i]['date'].'"
				title="Добавить в заказ?"><div><table><tbody><tr><td>'.$dateOrders[$i]['date'].'</td><td>'.$db->getDayOfWeek($dateOrders[$i]['date']).'</td><td>'.count($getOrder).'</td><td>'.$amount.'</td><td>'.$weight.'</td><td>'.
				round($sumCost, 2).'</td></tr></tbody></table></div></a>';
				
				$totalAmountPositions += count($getOrder);
				$totalAmount += $amount;
				$totalWeight += $weight;
				$totalCost += $sumCost;
			}
			
		?>
		<div>
			<table>
				<tfoot>
					<tr>
						<th>-></th>
						<th>Итого:</th>
						<th><?php echo $totalAmountPositions; ?></th>
						<th><?php echo $totalAmount; ?></th>
						<th><?php echo round($totalWeight, 2); ?></th>
						<th><?php echo round($totalCost, 2); ?></th>
					</tr>
				</tfoot>
			</table>
		</div>
		<p>
			<span>*Заявку можно вновь добавить в заказ чтобы повторить или изменить!</span>
		</p>
	</div>
	<div class="mobileInnerStat">		
		<div>
			<table>
				<thead>
					<tr>
						<th>Дата доставки</th>
						<th>Кол-во позиций, шт</th>
						<th>Штуки</th>
						<th>Сумма заказа, руб.</th>
					</tr>
				</thead>
			</table>	
		</div>
		<div id="listStat">
		<?php
			$totalAmountPositions = 0;
			$totalAmount = 0;
			$totalWeight = 0;
			$totalCost = 0;
			for($i=0;$i<count($dateOrders);$i++){
				$getOrder = $db->getOrder($_SESSION['clientId'], $dateOrders[$i]['date']);
				$amount = 0;
				$sumCost = 0;
				$weight = 0;		
				
				
				for($j=0;$j<count($getOrder);$j++){
					$amount += $getOrder[$j]['amount'];
					$CostWeightTax = $db->getCostWeightTaxProd($getOrder[$j]['id_production']);
					$priceWithTax;
					if(isset($discont) && $discont > 0){
						$priceDiscont = $CostWeightTax['cost'] - ($CostWeightTax['cost'] * ($discont / 100));
						$priceWithTax = $priceDiscont + ($priceDiscont * ($CostWeightTax['tax'] / 100));
					}else{
						$priceWithTax = $CostWeightTax['cost'] + ($CostWeightTax['cost'] * ($CostWeightTax['tax'] / 100));
					}
					
					$sumCost += round($priceWithTax, 2) * $getOrder[$j]['amount'];
					$weight += round($CostWeightTax['weight'] * $getOrder[$j]['amount'], 2);
				}
				echo '<a href="onlayn-zakaz.html?getorder='.$dateOrders[$i]['date'].'"
				title="Добавить в заказ?"><div><table><tbody><tr><td>'.$dateOrders[$i]['date'].'</td><td>'.count($getOrder).'</td><td>'.$amount.'</td><td>'.
				round($sumCost, 2).'</td></tr></tbody></table></div></a>';
				
				$totalAmountPositions += count($getOrder);
				$totalAmount += $amount;
				$totalCost += $sumCost;
			}
			
		?>
		</div>
		<div>
			<table>
				<tfoot>
					<tr>
						<th>Итого:</th>
						<th><?php echo $totalAmountPositions; ?></th>
						<th><?php echo $totalAmount; ?></th>
						<th><?php echo round($totalCost, 2); ?></th>
					</tr>
				</tfoot>
			</table>
		</div>
		<p style="font-size:11px;">
			<span>*Заявку можно вновь добавить в заказ чтобы повторить или изменить!</span>
		</p>
		<script>
			let listStat = document.getElementById('listStat');
			
			function printNumbersInterval() {
				var i = 0;
				var timerId = setInterval(function() {					
					switcher(i);					
					if (i == listStat.childElementCount-1) clearInterval(timerId);
					i++;
				}, 600);				
			}
			function switcher(i){
				listStat.children[i].firstElementChild.style.marginLeft = '5px';
				listStat.children[i].firstElementChild.style.backgroundColor = '#FB9F00';
				setTimeout(function(){
					listStat.children[i].firstElementChild.style.marginLeft = '0';		listStat.children[i].firstElementChild.style.backgroundColor = '#8C836F';
					listStat.children[i].firstElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild.style.color = '#fff';
				}, 700);
			}
			printNumbersInterval();					
		</script>
	</div>
</div>
<script>
	var type_ordermenu = <?php echo json_encode( $type_ordermenu );?>;
	var button_stat = document.getElementById('button_stat');
	if(type_ordermenu == 'stat'){
		button_stat.style.opacity = '0.4';
		button_stat.style.cursor = 'default';
	}else{
		button_stat.style.opacity = '1';
		button_stat.style.cursor = 'pointer';
	}
</script>