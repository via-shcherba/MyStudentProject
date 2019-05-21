<div class="area_own">
	<div class="right_part">
		<div class="info" id="info">
			<p class="icon-attention-circled">Выберите дату заказа!</p>
		</div>
		<form action="/onlayn-zakaz.html" method="POST" class="order_form">
			<input id="clientId" type="text" name="client" value="<?php echo $_SESSION['clientId']; ?>" hidden>
			<div class="date_order">
				<p>Дата заказа:</p>
				<select id="dateSelect" name="date" required>
					<option value="">--</option>
				</select>
				<div class="clear"></div>
			</div>
			<div class="headings">
				<table>
					<head>
						<tr>
							<th>X</th>
							<th>№</th>
							<th>Наименование</th>
							<th>Цена c НДС, руб.</th>
							<th>Количество, шт</th>
							<th>Стоимость c НДС, руб</th>
						</tr>
					</head>
				</table>
			</div>				
			<div id="demand">
			</div>				
			<div class="total" id="total">
				<table>
					<head>
						<tr>
							<th>Количество позиций, шт</th>
							<th>Количество единиц, шт</th>
							<th>Вес, кг</th>
							<th>Общая стоимость с НДС, руб.</th>					
						</tr>
					</head>
					<tbody>
						<tr>
							<td>0</td>
							<td>0</td>
							<td>0.00</td>
							<td>0.00</td>									
						</tr>
					</tbody>
				</table>
			</div>
			<div class="send">
				<input id="sendbutton" type="submit" value="Отправить заявку" disabled>
			</div>
			<p style="font-size:11px;">
				<span>*Минимальная заявка составляет 30 единиц любой продукции!</span>
			</p>
		</form>
	</div>	
	<div class="left_part"> 
		<div class="describe_part" id="describe_part">
			<a target="_blank" href="/"><div class="image_order" id="image_order"></div></a>				
			<p></p>
			<p></p>	
			<p></p>
			<p></p>
			<p></p>
			<div class="triangle" id="triangle">
			</div>
		</div>	
		<div class="list_own" id="list_own">
			<ul>
				<?php		
					
					$counter = 0;
					foreach($all_prod as $el){
						echo '
						<li><p data-list='.$counter.' data-id='.$el['id'].'>'.$el['name_prod'].'</p></li>';	
						$counter++;
					}
				?>						
			</ul>
		</div>	
	</div>	
	<!--<div id="thanks" class="popup">
		<h3>Заказ успешно получен!</h3>
		<p><span>Спасибо Вам большое!</span></p>
	</div> -->
</div>
<script>		
		var type_ordermenu = <?php echo json_encode( $type_ordermenu );?>;
		var button_addorder = document.getElementById('button_addorder');
		if(type_ordermenu == 'add'){
			button_addorder.style.opacity = '0.4';
			button_addorder.style.cursor = 'default';
		}else{
			button_addorder.style.opacity = '1';
			button_addorder.style.cursor = 'pointer';
		}
</script>
<script src="js/orderLogic.js"></script>