"use strict"; 

var list_own = document.getElementById('list_own').firstElementChild;
var describe_part = document.getElementById('describe_part');
var triangle = document.getElementById('triangle');
var demand = document.getElementById('demand');
var imageOrder = document.getElementById('image_order');
var info = document.getElementById('info');
var sendbutton = document.getElementById('sendbutton');

var infoArray = [
'Кликнув по позиции слева, добавьте ее в заказ!',
'Выберите дату заказа!',
'Добавьте еще позицию, увеличте количество штук!',
'Добавьте еще позицию, увеличте количество штук!', 
'Добавьте еще позицию, пожалуйста!',
'Введите количество продукции!!!', 
'Превышен лимит количества продукции!!! (300шт)',
'Слишком малое количество штук в строке!!!',
'Введите целое число!!!',
'Обязательно выберите дату заказа!',
'Кликайте по зеленому блоку и позиция добавиться в заказ!',
'Эта позиция есть в заказе!'
];

//label date
var dateSelect = document.getElementById('dateSelect'); //date select
setDateSelect(dateSelect);
//
function setDateSelect(elem){
	let date = new Date();
	let days = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
	for(var i=0;i<14;i++){
		date.setDate(date.getDate() + 1);
		let day = +date.getDate();
		if(day < 10) day = '0'+day;
		let month = +date.getMonth()+1;
		if(month < 10) month = '0'+month;
		let year = date.getFullYear();
		let option = document.createElement('option');
		option.value = year+'-'+month+'-'+day;
		if(date.getDay() == '6') option.style.color = '#FBBA00';
		if(date.getDay() == '0') option.style.color = '#B11015';
		option.innerHTML = day+'.'+month+' ('+days[+date.getDay()]+')';
		elem.appendChild(option);
	}
}
//
//label discont
let discontLabel = document.getElementById('discont'); 
setDiscont(discontLabel);
function setDiscont(elem){
	if(discont > 0){
		elem.style.display = 'block';
		elem.innerHTML = 'Вам скидка '+discont+' <sub>%</sub>';
	}else{
		elem.style.display = 'none';
	}
}
//
//label total block
var total = document.getElementById('total');
var AmountPositions = total.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.children[0];
var numberOfUnits = total.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.children[1];
var weight = total.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.children[2];
var totalCost = total.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.children[3];
//
var dateControl = false;
var controlAddRow = true;
var controlSend = true;
var amountrows = 0;
settingsSendButton(dateSelect, info, infoArray[0],infoArray[1], +numberOfUnits.innerHTML);
function settingsSendButton(elem, infoBlock, text1, text2, sum){
	elem.addEventListener('input', function(e){
		let value = this.value;
		if(value){
			dateControl = true; 
			elem.style.borderColor = '#14AD65';
			infoBlock.children[0].innerHTML = text1;
			controlSend = true;
			if(dateControl) abbleSend(sum, sendbutton);
		}else{
			dateControl = false;
			elem.style.borderColor = '#B11015';
			infoBlock.children[0].innerHTML = text2;
			controlSend = false;
			if(dateControl) abbleSend(sum, sendbutton);
		}	
	});
}
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
	if(discont > 0){
		let costWithDiscont = calculateCostWithDiscont(+data[id]['cost']);
		describe_part.children[2].innerHTML = '<span>Цена без НДС: </span><s style="color:#F16B6F;">'+data[id]['cost']+'р.</s><span> со скидкой: </span>'+costWithDiscont.toFixed(2)+'р.';
	}else{
		describe_part.children[2].innerHTML = '<span>Цена без НДС: </span>'+data[id]['cost']+'р.';
	}
	describe_part.children[3].innerHTML = '<span>НДС: </span>'+data[id]['tax']+'%';
	describe_part.children[4].innerHTML = '<span>Срок годности: </span>'+data[id]['expiration']+'с.';
	describe_part.children[5].innerHTML = '<span>Штрих-код: </span>'+data[id]['code'];
}
function calculateCostWithDiscont(cost){
	return cost - (cost * (discont / 100))
}
list_own.onclick = function(e){
	var target = e.target;		
	while(target != list_own){		
		if(target.tagName == 'LI'){
			let label = target.getAttribute('data-label');
			if(!label && dateControl){				
				if(controlAddRow){
					setactive(target);
					manualAdd(target);
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
var counter = 0;	
function manualAdd(target){
	let idPos = target.firstChild.getAttribute('data-id');
	let id = target.firstChild.getAttribute('data-list');
	addrow(idPos, id);
}
function addrow(idPos, id, amount=5){
	counter ++;
	
	var div = document.createElement('div');		
	div.className = "order_row";
	div.setAttribute('data-list', id);
	let cost;
	if(discont > 0){
		let costWithDiscont = calculateCostWithDiscont(+data[id]['cost']);
		cost = +(+costWithDiscont + (+costWithDiscont *
		(+data[id]['tax'] / 100))).toFixed(2);
	}else{
		cost = +(+data[id]['cost'] + (+data[id]['cost'] *
		(+data[id]['tax'] / 100))).toFixed(2);	
	}
	div.innerHTML = "<input type='text' name='idp[]' value='"+data[id]['id']+"' hidden><input type='text' value='"+data[id]['weight']+"' hidden><input type='text' value='0' hidden><table><tbody><tr><td id='del_row'><icon class='icon-cancel-circled'></icon></td><td>"+counter+"</td><td><a target='_blank' href='/produktsiya.html?data-id="+idPos+"#"+idPos+"'>"+data[id]['name_prod']+"</a></td><td>"+cost+"</td><td><input name='amountp[]' type='number' id='inputAmount' class='inputAmount' value='"+amount+"' min='0' max='300' step='1'></td><td>0.00</td></tr></tbody></table>";
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
	if(dateControl) abbleSend(+numberOfUnits.innerHTML, sendbutton);
		
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
						
			if(dateControl){
				//able send button
				abbleSend(+numberOfUnits.innerHTML, sendbutton);	
				info.children[0].innerHTML = 'Кликнув по позиции слева, добавьте ее в заказ!';
			}
			//setting number of position
			for(var i=0;i<amountrows;i++){
				demand.children[i].children[3].firstElementChild.firstElementChild.children[1].innerHTML = i+1;
			}
		}
	});
	let amountProd = 0;	
	//input amount of product
	inputAmount.addEventListener('input', function(e){		
		if (inputControl(this.value) > 0) {
			this.style.borderColor = '#14AD65';
			controlAddRow = true;
			if(dateControl) info.children[0].innerHTML = 'Добавьте еще позицию, пожалуйста!';
			info.style.borderColor = '#69A4DE';
			controlSend = true;
		}else{
			this.style.borderColor = '#FF0000';
			controlAddRow = false;
			if(dateControl) info.children[0].innerHTML = 'Введите количество продукции!!!';
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
		if(dateControl) abbleSend(+numberOfUnits.innerHTML, sendbutton);	
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
			if(dateControl) info.children[0].innerHTML = 'Превышен лимит количества продукции!!! (300шт)';
			return 0;
		}
		if(+value < 5){
			if(dateControl) info.children[0].innerHTML = 'Слишком малое количество штук в строке!!!';
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
function abbleSend(amount, button){
	if(amount >= 30 && controlSend){
		button.removeAttribute('disabled');
		button.style.backgroundColor = '#14AD65';
		button.style.opacity = '1';
	}else{
		button.setAttribute('disabled','disabled');
		button.style.backgroundColor = '#B11015';
		button.style.opacity = '0.5';
	}
}
//
if(order && dateOrder){
	dateSelect.firstElementChild.innerHTML = dateOrder;
	dateSelect.firstElementChild.style.color = '#FF0000';	
	for(var i=0;i<order.length;i++){
		autoAdd(+order[i]['id_production'], order[i]['amount']);		
	}
	info.children[0].innerHTML = 'Обязательно выберите дату заказа!';
}

function autoAdd(id, amount){
	let idlist = getNumberFromList(id);
	addrow(id, idlist, amount);	
	sendbutton.setAttribute('disabled','disabled');
	sendbutton.style.backgroundColor = '#B11015';
	sendbutton.style.opacity = '0.5';
}

function getNumberFromList(id){
	let size = list_own.childElementCount;
	let res;
	for(var i=0;i<size;i++){
		if(list_own.children[i].firstElementChild.getAttribute('data-id') == id){
			res = +list_own.children[i].firstElementChild.getAttribute('data-list');
			list_own.children[i].style.opacity = '0.3';
			break;
		}
	}	
	return res;
}

function getProd(id){
	for(var i=0;i<data.length;i++){
		if(data[i]['id'] == id){
			return data[i];
			break;
		}
	}
}

//Mobile version
//label date
var mobileInfo = document.getElementById('mobileInfo'); //info dilog window
var dateSelectm = document.getElementById('dateSelectm'); //date select
var demandm = document.getElementById('demandm');
var totalm = document.getElementById('totalm');
var totalSumPos = totalm.firstElementChild.children[1].firstElementChild.children[0];
var totalAmount = totalm.firstElementChild.children[1].firstElementChild.children[1];
var totalCost = totalm.firstElementChild.children[1].firstElementChild.children[2];
var sendbuttonm = document.getElementById('sendbuttonm'); //button send

setDateSelect(dateSelectm);
settingsSendButton(dateSelectm, mobileInfo, infoArray[10],infoArray[1], +totalAmount.innerHTML);
//
//label discont
let discontm = document.getElementById('discontm'); 
setDiscont(discontm);
//
//Present Product Block
var present = document.getElementById('present');
var counter = 0;
var initialPoint;
var finalPoint;
setPresentBlock(); 
present.addEventListener('touchstart', function(event) {		
	event.preventDefault();
	event.stopPropagation();
	initialPoint=event.changedTouches[0];	
}, false);
present.addEventListener('touchend', function(event) {		
	event.preventDefault();
	event.stopPropagation();
	finalPoint = event.changedTouches[0];
	var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
	var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
	if (xAbs > 20 || yAbs > 20) {
		if (xAbs > yAbs) {
			if (finalPoint.pageX < initialPoint.pageX){
				/*swipe left*/				
				if(data.length > counter) counter ++;
				if(data.length == counter) counter = 0;				
			}else{
				/* swipe right */									
				counter --;
				if(counter < 0) counter = data.length - 1;			
			}
			setPresentBlock(counter);			
		}
	}else{
		//touch
		let byp = bypass(this.getAttribute('data-key'));
		if(dateControl && controlAddRow && !byp) addRowMobile(this);
		if(!byp) mobileInfo.children[0].innerHTML = infoArray[5];
	}
}, false);
function setPresentBlock(number=0){
	let name = present.firstElementChild.firstElementChild.firstElementChild.children[0];
	let price = present.firstElementChild.firstElementChild.firstElementChild.children[1];
	name.innerHTML = data[number]['name_prod'];
	if(discont>0){
		price.innerHTML = (calculateCostWithDiscont(data[number]['cost'])).toFixed(2);
	}else{
		price.innerHTML = (data[number]['cost']).toFixed(2);
	}
	present.setAttribute('data-mid', data[number]['id'])
	present.setAttribute('data-key', number);
}

function addRowMobile(elem){
	let idBD = elem.getAttribute('data-mid');
	let key = elem.getAttribute('data-key');
	var div = document.createElement('div');
	
	div.setAttribute('data-key', key);
	let cost;
	if(discont > 0){
		let costWithDiscont = calculateCostWithDiscont(+data[key]['cost']);
		cost = +(+costWithDiscont + (+costWithDiscont *
		(+data[key]['tax'] / 100))).toFixed(2);
	}else{
		cost = +(+data[key]['cost'] + (+data[key]['cost'] *
		(+data[key]['tax'] / 100))).toFixed(2);	
	}
	div.innerHTML = '<input type="text" name="idp[]" value="'+data[key]['id']+'" hidden><input type="text" value="0" hidden><table><tbody><tr><td id="delrowM"><icon class="icon-cancel-circled"></icon></td><td><a target="_blank" href="/produktsiya.html?data-id='+idBD+'#'+idBD+'">'+data[key]['name_prod']+'</a></td><td>'+cost+'</td><td><input name="amountp[]" type="number" id="inputAmountM" value="5"></td></tr></tbody></table>';
	demandm.appendChild(div);
	
	
	div.children[1].setAttribute('value', ((+div.children[2].firstElementChild.firstElementChild.children[3].firstElementChild.value) * (+div.children[2].firstElementChild.firstElementChild.children[2].innerHTML)).toFixed(2));
	
	let inputAmount = div.children[2].firstElementChild.firstElementChild.children[3].firstElementChild;
	
	inputAmount.style.borderColor = 'rgb(20, 173, 101)'; //green
	
	var value = inputAmount.value;
	var size = +value.length;
	inputAmount.addEventListener('input', function(e) {	
		
		let str = e.data;		
		if(str){
			if(str.search(/\d/) >= 0){
				value += str;	
				size++;
			}else{
				value = '0';
				size = 0;
				this.value='';
			}		
		}else{	
			if(size > 0){
				size--;
				value = value.substr(0, +size);
			}else{
				size = 0;
				value = '';
			}
		}
		if(+value < 5 || +value > 300){
			this.style.borderColor = 'rgb(255, 0, 0)'; //red
			controlAddRow = false;
			if(+value < 5) mobileInfo.children[0].innerHTML = infoArray[7];
			if(+value > 300) mobileInfo.children[0].innerHTML = infoArray[6];
		}else{			
			this.style.borderColor = 'rgb(20, 173, 101)'; //green
			controlAddRow = true;
			mobileInfo.children[0].innerHTML = infoArray[4];
		}
		let price = +this.parentElement.previousElementSibling.innerHTML;
		let sum = (value * price).toFixed(2);
		this.parentElement.parentElement.parentElement.parentElement.previousElementSibling.setAttribute('value', sum);
		calculateTotalM();	
		if(dateControl) abbleSend(+totalAmount.innerHTML, sendbuttonm);
	});	
	let pushdel = div.children[2].firstElementChild.firstElementChild.children[0];
	pushdel.addEventListener('touchend', function(event) {
		event.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
		calculateTotalM();
		if(dateControl) abbleSend(+totalAmount.innerHTML, sendbuttonm);
	});
	calculateTotalM();
	if(dateControl) abbleSend(+totalAmount.innerHTML, sendbuttonm);
}
function bypass(key){
	let size = demandm.childElementCount;
	let result = false;
	for(var i=0;i<size;i++){
		if(key == demandm.children[i].getAttribute('data-key')){			
			result = true;
			mobileInfo.children[0].innerHTML = infoArray[11];
			break;
		}
	}
	return result;
}
function calculateTotalM(){		
	let size = demandm.childElementCount;
	let amout = 0;
	let sum = 0;
	for(var i=0;i<size;i++){
		amout += (+demandm.children[i].children[2].firstElementChild.firstElementChild.children[3].firstElementChild.value);	
		sum += (+demandm.children[i].children[1].value);		
	}
	totalSumPos.innerHTML = size;
	totalAmount.innerHTML = amout;
	totalCost.innerHTML = sum.toFixed(2);
}