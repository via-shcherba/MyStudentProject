"use strict"; 

var list_own = document.getElementById('list_own').firstElementChild;
var describe_part = document.getElementById('describe_part');
var triangle = document.getElementById('triangle');
var demand = document.getElementById('demand');
var imageOrder = document.getElementById('image_order');
var info = document.getElementById('info');
var sendbutton = document.getElementById('sendbutton');

let dateSelect = document.getElementById('dateSelect');
let date = new Date();
let newdate = new Date();
let days = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
for(var i=1;i<15;i++){
	newdate.setDate(date.getDate() + i);
	let day = +newdate.getDate();
	if(day < 10) day = '0'+day;
	let month = +newdate.getMonth()+1;
	if(month < 10) month = '0'+month;
	let year = newdate.getFullYear();
	let option = document.createElement('option');
	option.value = year+'-'+month+'-'+day;
	if(newdate.getDay() == '6') option.style.color = '#FBBA00';
	if(newdate.getDay() == '0') option.style.color = '#B11015';
	option.innerHTML = day+'.'+month+' ('+days[+newdate.getDay()]+')';
	dateSelect.appendChild(option);
}
//total block
var total = document.getElementById('total');
var AmountPositions = total.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.children[0];
var numberOfUnits = total.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.children[1];
var weight = total.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.children[2];
var totalCost = total.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.children[3];
//
var dateControl = false;
var controlAddRow = true;
var controlSend = true;
dateSelect.addEventListener('input', function(e){
	let value = this.value;
	if(value){
		dateControl = true; 
		dateSelect.style.borderColor = '#14AD65';
	}else{
		dateControl = false;
		dateSelect.style.borderColor = '#B11015';
	}
	if(dateControl){
		info.children[0].innerHTML = 'Кликнув по позиции слева, добавьте ее в заказ!';
	}else{
		info.children[0].innerHTML = 'Выберите дату заказа!';
	}
});
fillDescribe();
list_own.onmouseover = function(e){
	if(e.target.tagName == 'P'){
		let id = +e.target.getAttribute('data-list');
		fillDescribe(id);
	}	
}
function fillDescribe(id=0){
	if(!id) id = 0;
	imageOrder.style.backgroundImage = "url('../fotoprod/"+data[id]['image']+"')";
	imageOrder.addEventListener('click', function(e){
		this.parentElement.setAttribute('href', '/produktsiya.html?data-id='+data[id]['id']+'#'+data[id]['id']);
	});
	describe_part.children[1].innerHTML = '<span>'+data[id]['name_prod']+'</span>';	
	describe_part.children[2].innerHTML = '<span>Цена без НДС: </span>'+data[id]['cost']+'р.';
	describe_part.children[3].innerHTML = '<span>НДС: </span>'+data[id]['tax']+'%';
	describe_part.children[4].innerHTML = '<span>Срок годности: </span>'+data[id]['expiration']+'с.';
	describe_part.children[5].innerHTML = '<span>Штрих-код: </span>'+data[id]['code'];
}
list_own.onclick = function(e){
	var target = e.target;		
	while(target != list_own){		
		if(target.tagName == 'LI'){
			let label = target.getAttribute('data-label');
			if(!label && dateControl){								
				if(amountrows == 0 || (amountrows > 0 && controlAddRow)){
					setactive(target);
					addrow(target);
					target.style.opacity = '0.3';
					target.setAttribute('data-label', 'true');	
					moveTriangle();						
				}
			}
			return;
		}
		target = target.parentNode;
	}
}
function moveTriangle(){
	triangle.style.right = '0';
	setTimeout(function(){
		triangle.style.right = '10px';
	},300);		
}
var selectedLi;
function setactive(node){
	let firstEl = list_own.className;
	if(firstEl == 'active'){
		list.firstElementChild.classList.remove('active');
	}
	if(selectedLi){
		selectedLi.classList.remove('active');
	}
	selectedLi = node;
	selectedLi.classList.add('active');
}
//var storageNumberOfUnits = 0;		
var amountrows = 0;
var counter = 0;	
function addrow(target){
	counter ++;
	let idPos = target.firstChild.getAttribute('data-id');
	let id = target.firstChild.getAttribute('data-list');
		
	let div = document.createElement('div');
	div.className = "order_row";
	div.setAttribute('data-list', id);
	
	let cost = +(+data[id]['cost'] + (+data[id]['cost'] * (+data[id]['tax'] / 100))).toFixed(2);	
	div.innerHTML = "<input type='text' name='idp[]' value='"+data[id]['id']+"' hidden><input type='text' value='"+data[id]['weight']+"' hidden><input type='text' value='0' hidden><table><tbody><tr><td id='del_row'><icon class='icon-cancel-circled'></icon></td><td>"+counter+"</td><td><a target='_blank' href='/produktsiya.html?data-id="+idPos+"#"+idPos+"'>"+data[id]['name_prod']+"</a></td><td>"+cost+"</td><td><input name='amountp[]' type='number' id='inputAmount' class='inputAmount' value='5' min='0' max='300' step='1'></td><td>0.00</td></tr></tbody></table>";
	demand.appendChild(div);
	
	amountrows = demand.childElementCount;
	let num = amountrows-1;	
	let inputAmount = demand.children[num].children[3].firstElementChild.firstElementChild.children[4].firstElementChild;
		
	inputAmount.style.borderColor = '#14AD65';
	//set initial cost of row
	inputAmount.parentElement.nextElementSibling.innerHTML = ((+inputAmount.value) * (+inputAmount.parentElement.previousElementSibling.innerHTML)).toFixed(2);
	//set initial weight of row
	inputAmount.parentElement.parentElement.parentElement.parentElement.previousElementSibling.setAttribute('value', (+inputAmount.value) * (+inputAmount.parentElement.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.value));
	
	numberOfUnits.innerHTML =  (+numberOfUnits.innerHTML) + (+inputAmount.value);
	weight.innerHTML = ((+weight.innerHTML) + (+inputAmount.parentElement.parentElement.parentElement.parentElement.previousElementSibling.value)).toFixed(2);
	
	totalCost.innerHTML = ((+totalCost.innerHTML) + (+inputAmount.parentElement.nextElementSibling.innerHTML)).toFixed(2);
	
	info.children[0].innerHTML = 'Добавьте еще позицию, увеличте количество штук!';
	//able send button
	abbleSend(+numberOfUnits.innerHTML);
		
	let delrow = div.children[3].firstElementChild.firstElementChild.firstElementChild;
	//delete row
	delrow.addEventListener('click', function(e){
		if(e.target.tagName == 'ICON'){
			let id = +e.target.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute('data-list');
			let row = list_own.querySelector('[data-list="'+id+'"]');
			row.parentElement.style.opacity = '1';
			row.parentElement.classList.remove('active');
			row.parentElement.removeAttribute('data-label');
			
			numberOfUnits.innerHTML -= +delrow.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.value;
			
			weight.innerHTML = ((+weight.innerHTML) - (+delrow.parentElement.parentElement.parentElement.previousElementSibling.value)).toFixed(2);
			
			totalCost.innerHTML = ((+totalCost.innerHTML) - (+delrow.parentElement.children[5].innerHTML)).toFixed(2);
			
			e.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
				
			changeTriangle();			
			amountrows = demand.childElementCount;
			AmountPositions.innerHTML = amountrows;
			
			controlSend = true;
			controlAddRow = true;
			
			//able send button
			abbleSend(+numberOfUnits.innerHTML);	

			info.children[0].innerHTML = 'Кликнув по позиции слева, добавьте ее в заказ!';
		}
	});
	let amountProd = 0;	
	//input amount of product
	inputAmount.addEventListener('input', function(e){		
		if (inputControl(this.value) > 0) {
			this.style.borderColor = '#14AD65';
			controlAddRow = true;
			info.children[0].innerHTML = 'Добавьте еще позицию, пожалуйста!';
			info.style.borderColor = '#69A4DE';
			controlSend = true;
		}else{
			this.style.borderColor = '#FF0000';
			controlAddRow = false;
			info.children[0].innerHTML = 'Введите количество продукции!!!';
			info.style.borderColor = 'white';
			controlSend = false;
		}
		let price = +this.parentElement.previousElementSibling.innerHTML;	
		let inputSum = this.parentElement.nextElementSibling;
		amountProd = inputControl(this.value);
		inputSum.innerHTML = (amountProd * price).toFixed(2);
		
		let inputWeightOfProduct = this.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling;
		let weightOfRow = this.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.parentElement.parentElement.parentElement.previousElementSibling;
		weightOfRow.setAttribute('value', (+inputWeightOfProduct.value) * inputControl(this.value));
		
		numberOfUnits.innerHTML = 0;
		weight.innerHTML = 0;
		totalCost.innerHTML = 0;
		for(var i=0; i<amountrows;i++){
			numberOfUnits.innerHTML = (+numberOfUnits.innerHTML) +(+demand.children[i].children[3].firstElementChild.firstElementChild.children[4].firstElementChild.value);
			weight.innerHTML = ((+weight.innerHTML) + (+demand.children[i].children[2].value)).toFixed(2);
			totalCost.innerHTML = ((+totalCost.innerHTML) + (+demand.children[i].children[3].firstElementChild.firstElementChild.children[5].innerHTML)).toFixed(2);
		}
		//able send button
		abbleSend(+numberOfUnits.innerHTML);	
	});	
	AmountPositions.innerHTML = amountrows;	
}
function changeTriangle(){
	triangle.classList.remove('triangle');
	triangle.classList.add('delete');
	setTimeout(function(){
		triangle.classList.remove('delete');
		triangle.classList.add('triangle');
	},300);	
}
function inputControl(value){
	if(value.match(/^\d+$/)){
		if(+value >= 5 && +value <= 300){
			return +value;
		}
	    if(+value > 300){
			info.children[0].innerHTML = 'Превышен лимит количества продукции!!! (300шт)';
			return 0;
		}
		if(+value < 5){
			info.children[0].innerHTML = 'Слишком малое количество штук в строке!!!';
			return 0;
		}
	}else{
		info.children[0].innerHTML = 'Введите целое число!!!';
		return 0;
	}
}
function isInt(n) {
   return n % 1 === 0;
}
function abbleSend(amount){
	if(+numberOfUnits.innerHTML >= 30 && controlSend){
		sendbutton.removeAttribute('disabled');
		sendbutton.style.backgroundColor = '#14AD65';
		sendbutton.style.opacity = '1';
	}else{
		sendbutton.setAttribute('disabled','disabled');
		sendbutton.style.backgroundColor = '#B11015';
		sendbutton.style.opacity = '0.5';
	}
}