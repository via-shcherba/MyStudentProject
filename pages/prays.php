<div class="text">
	<h1>Прайс Докшицкого хлебозавода</h1>
	<img src="img/stripeML.png" alt="полоса"/>
	<img src="img/spikeletML.png" alt="колосок"/>
	<table class="main-table">
		<thead>
			<tr>
				<th>№</th>
				<th>Штрих-код</th>
				<th>Наименование</th>
				<th>Вес, гр.</th>
				<th>Цена без НДС, руб.</th>
				<th>НДС,%</th>
				<th>Цена с НДС, руб.</th>
				<th>Срок годности, сут.</th>
			</tr>
		</thead>
		<tbody>
			<?php
				include 'database/getDataTableProduction.php';
				
				for($i=0; $i<count($all_prod); $i++){
					$full_cost = $all_prod[$i]['cost'] + ($all_prod[$i]['cost'] / 100 * $all_prod[$i]['tax']);
					echo '<tr>
					<td>'.($i+1).'</td>
					<td>'.$all_prod[$i]["code"].'</td>
					<td>'.$all_prod[$i]['name_prod'].'</td>
					<td>'.$all_prod[$i]['weight'].'</td>
					<td>'.$all_prod[$i]['cost'].'</td>
					<td>'.$all_prod[$i]['tax'].'</td>
					<td>'.round($full_cost, 2).'</td>
					<td>'.$all_prod[$i]['expiration'].'</td>
					</tr>';
				} 
			?>
		</tbody>
	</table>
	<table class="mobile-table">
		<thead>
			<tr>
				<th>№</th>
				<th>Наименование</th>
				<th>Вес, гр.</th>
				<th>Цена без НДС, руб.</th>
				<th>НДС,%</th>
				<th>Срок годности, сут.</th>
			</tr>
		</thead>
		<tbody>
			<?php
				include 'database/getDataTableProduction.php';
				
				for($i=0; $i<count($all_prod); $i++){
					$full_cost = $all_prod[$i]['cost'] + ($all_prod[$i]['cost'] / 100 * $all_prod[$i]['tax']);
					echo '<tr>
					<td>'.($i+1).'</td>
					<td>'.$all_prod[$i]['name_prod'].'</td>
					<td>'.$all_prod[$i]['weight'].'</td>
					<td>'.$all_prod[$i]['cost'].'</td>
					<td>'.$all_prod[$i]['tax'].'</td>
					<td>'.$all_prod[$i]['expiration'].'</td>
					</tr>';
				} 
			?>
		</tbody>
	</table>
	<p class="last">Будем рады сотрудничеству с Вами!</p>
</div>