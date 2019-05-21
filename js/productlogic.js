"use strict"; 

var directory_image = 'fotoprod/';

var list = document.getElementById('list');    //ul of li
var prodBox = document.getElementById('prodBox'); //production box
var foto = document.getElementById('bigFoto');
var loupe = document.getElementById('loupe');  //magnifier

list.firstElementChild.classList.add('active'); //added class for a first li

let id = list.firstElementChild.getAttribute('data-id'); //get id of a first li
let data = getall(id); //get data for id
setProdBox(data, prodBox); //set data

var carouselMobile = document.getElementById('carousel-mobile');
var prodBoxM = document.getElementById('prodBoxM');
setProdBox(all_prod[0], prodBoxM);

//transition from online-order page
if(certainProd){
	let node = document.querySelector('[data-id="'+certainProd+'"]');
	getsetdata(node);		
}
//
list.onclick = function(e){
	var target = e.target;		
	while(target != list){		
		if(target.tagName == 'LI'){
			getsetdata(target);			 			
			return;
		}
		target = target.parentNode;
	}
}
var selectedLi;
function getsetdata(node){
	let firstEl = list.firstElementChild.className;
	if(firstEl == 'active'){
		list.firstElementChild.classList.remove('active');
	}
	if(selectedLi){
		selectedLi.classList.remove('active');
	}
	selectedLi = node;
	selectedLi.classList.add('active');
	
	let id = node.getAttribute('data-id');
	let data = getall(id);
	setProdBox(data, prodBox);	
}
function setProdBox(data, node){	
	node.children[0].children[0].setAttribute('src', directory_image + data['image']);
	node.children[0].children[0].setAttribute('alt', data['name_prod'].split(' ')[0]);
	node.children[1].innerHTML = data['name_prod'];
	node.children[2].innerHTML = '<span>Состав: </span>' + data['composition'];
	node.children[3].innerHTML = '<span>Срок годности: ' + data['expiration'] + ' суток</span>';
	node.children[4].innerHTML = '<span>Пищевая ценность в 100г продукции: </span> ' + data['food'];
	node.children[5].innerHTML = '<span>Энергетическая ценность: </span>' + data['energy'];
	node.children[6].innerHTML = data['recommend'];
	let rub = data['cost'].toString().split('.')[0];
	let pen = data['cost'].toString().split('.')[1];
	node.children[0].children[1].innerHTML = rub + 'р.<sup>' + pen + 'к.<sup>';
	let weight = data['weight'] * 1000;
	node.children[0].children[2].innerHTML = weight + '<sub>г.</sub>';
	node.children[0].children[3].innerHTML = data['expiration'] + '<sub>суток</sub>';
	node.children[0].children[4].innerHTML = data['code'];	
}
function getall(id){
	for(let i=0; i<all_prod.length;i++){
		if(all_prod[i]['id'] == id){
			return all_prod[i];
		}
	}
}

 //methods for loupe
loupe.addEventListener('mouseover', function(e){
  	loupe.style.opacity = "1"; 	
	let path = foto.getAttribute('src');
	loupe.style.backgroundImage = "url(" + path + ")";
	loupe.style.backgroundRepeat = "no-repeat";	
});
loupe.addEventListener("mousemove", function(e){
  	var zoomer = e.currentTarget;
	var x = e.offsetX/3;
	var y = e.offsetY/3;
	zoomer.style.backgroundPosition = x + '% ' + y + '%';
});
loupe.addEventListener("mouseout", function(e){
  	loupe.style.opacity = "0"; 
}); 

// mobile version
    
var counter = 0;
var initialPoint;
var finalPoint;
var count = document.getElementById('count');

carouselMobile.addEventListener('touchstart', function(event) {		
	event.preventDefault();
	event.stopPropagation();
	initialPoint=event.changedTouches[0];	
}, false);
carouselMobile.addEventListener('touchend', function(event) {		
	event.preventDefault();
	event.stopPropagation();
	finalPoint=event.changedTouches[0];
	var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
	var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
	if (xAbs > 20 || yAbs > 20) {
		if (xAbs > yAbs) {
			if (finalPoint.pageX < initialPoint.pageX){
				/*swipe left*/				
				if(all_prod.length > counter) counter ++;
				if(all_prod.length == counter) counter = 0;				
			}else{
				/* swipe right */									
				 counter --;
				if(counter < 0) counter = all_prod.length - 1;				
			}
			count.innerHTML = counter + 1;
			setProdBox(all_prod[counter], prodBoxM);						
		}else{
			if (finalPoint.pageY < initialPoint.pageY){
				/* swipe top */
				window.scrollBy(0, 235);
			}else{
				/* swipe bottom */
				window.scrollTo(0, 0);
			}
		}
	}
}, false);

