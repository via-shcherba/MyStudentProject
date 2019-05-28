var geocoder, map, marker, infowindow, content;
var nodeMap = document.getElementById('map');

function initMap() {				
	var uluru = {lat: 53.9, lng: 27.56659}; //Minsk
	map = new google.maps.Map(nodeMap, {zoom: 11, center: uluru});
	
	geocoder = new google.maps.Geocoder();		

	infowindow = new google.maps.InfoWindow();
	
	for(var i=0;i<dateaddress.length;i++){
		//converting addresses of stores into geocode
		geocoder.geocode({'address' : dateaddress[i]['address'] +'+'+ dateaddress[i]['location']}, function (results,status) {	
			if(status == google.maps.GeocoderStatus.OK) {
				marker = new google.maps.Marker({
				//adding geo position for markers and setting title for each
				map:map, position:results[0].geometry.location, title:results[0].formatted_address});
														
				marker.addListener('click', function(e) {
					//getting address of store from marker					
					let address = this.title.split(',')[0];
					address = address.split(' ');
					address = address[1] + address[2];
					//looking for a dateaddress array 					
					for(var j=0;j<dateaddress.length;j++){
						//if address from marker equals address in dateaddress array - stop
						let addressFromBase = dateaddress[j]['address'].split(' ');
						addressFromBase = addressFromBase[1] + addressFromBase[2];
						
						if(addressFromBase == address){
							infowindow.setContent(
								"<div class='point'><p><span>Магазин:</span> "+dateaddress[j]['name']+"</p><p><span>Адрес:</span> "+dateaddress[j]['address']+"</p><p style='color:red;'><span style='color:#45251C;'>Дата поставки:</span> "+dateaddress[j]['date']+"</p></div>"
							);
							break;
						}
					} 
										
					infowindow.open(map, this);
					
					let lat = results[0].geometry.viewport.na.l;
					let ln = results[0].geometry.viewport.ia.l;
					map.setCenter({lat:lat, lng:ln});
					map.setZoom(16);
				}); 
										
			}else {
				console.log('Not valid address');
			}						
		});  		
	} 												
}
	