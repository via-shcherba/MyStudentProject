<div class="text">
	<h1>Места продаж</h1>
	<img src="img/stripeML.png" alt="полоса"/>
	<img src="img/spikeletML.png" alt="колосок"/>
	<div class="textIn">
		<p>
			Идет разработка...
		</p>
		<div id="map" style="width:100%;height:400px;"></div>
		<script>
			// Initialize and add the map
			function initMap() {
				geo = new google.maps.Geocoder();
				// The location of Uluru
				var uluru = {lat: 53.9, lng: 27.56659};
				// The map, centered at Uluru
				var map = new google.maps.Map(
				document.getElementById('map'), {zoom: 11, center: uluru});
				// The marker, positioned at Uluru
				//var marker = new google.maps.Marker({position: uluru, map: map});
			
				var address = "улица Московская, д.5+Минск,+обл. Минская,+Беларусь";
				geo.geocode({'address' : address}, function (results,status) {
					if(status == google.maps.GeocoderStatus.OK) {
						map.setCenter(results[0].geometry.location);
						var marker =  new google.maps.Marker({
						map:map,
						position:results[0].geometry.location
						});
					}else {
						alert('Not valid address');
					}
				});
			}
		</script>
	</div>
</div>
<!--API AIzaSyB2moYuHUrP15MPzvQ8H7JW8KL22PSgPk4 -->

<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB2moYuHUrP15MPzvQ8H7JW8KL22PSgPk4&callback=initMap">
</script>


