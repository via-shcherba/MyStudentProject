<div>

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