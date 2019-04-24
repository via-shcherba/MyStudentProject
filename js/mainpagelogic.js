"use strict"; 

/* title change */
var titles = {
	produktsiya: 'Продукция',
	prays: 'Прайс',
	usloviya: 'Условия сотрудничества',
	onas: 'О нас',
	mestaprodazh: 'Места продаж',
	kontakty: 'Контакты',
	onlaynzakaz: 'Онлайн-заказ'
};
if(item_menu && titles[item_menu.replace('-', '')]){
	document.title = 'Докшицкий хлебозавод | ' + titles[item_menu.replace('-', '')];
};
/* end title change */

var mainMenuUl = document.getElementById('menu').firstElementChild;

//this is block makes a item of main menu active
let MainMenuControl;
for(var i=0; i<mainMenuUl.childElementCount;i++){
	//mainMenuUl.children[i].firstElementChild.classList.remove('active');	
	let MainMenuA = mainMenuUl.children[i].firstElementChild;
	if(MainMenuA.getAttribute('href').split('.')[0] == item_menu){
		MainMenuA.classList.add('active');		
        MainMenuControl = true;		
	}	
}
if(!MainMenuControl){
	//mobileMenuUl.children[0].firstElementChild.classList.add('active');	
}


/* mobile version */
var mbutton = document.getElementById('bmenu');
var mobileMenu = document.getElementById('mobile-menu');
var mobileMenuUl = document.getElementById('mobile-menu').firstElementChild;
var screen = document.getElementById('screen');

mbutton.onclick = function(e){	
	if(mobileMenu.className.split(' ')[1] == 'close') mobileMenu.classList.remove('close');
	mobileMenu.classList.add('open');
	screen.style.display = 'block';
	screen.style.right = '0%';
	mbutton.classList.remove('icon-menu-1');
	mbutton.classList.add('icon-cancel-circled');
	screen.style.position = 'fixed';
};
screen.onclick = function(e){	
	if(mobileMenu.className.split(' ')[1] == 'open') mobileMenu.classList.remove('open');
	mobileMenu.classList.add('close');
	screen.style.display = 'none';
	screen.style.right = '-50%';
	mbutton.classList.remove('icon-cancel-circled');
	mbutton.classList.add('icon-menu-1');
	screen.style.position = 'absolute';	
}

//this is block makes a item of mobile menu active
let mobileMenuControl;
for(var i=0; i<mobileMenuUl.childElementCount;i++){
	mobileMenuUl.children[i].firstElementChild.classList.remove('mactive');	
	let mobileMenuA = mobileMenuUl.children[i].firstElementChild;
	if(mobileMenuA.getAttribute('href').split('.')[0] == item_menu){
		mobileMenuA.classList.add('mactive');		
        mobileMenuControl = true;		
	}	
}
if(!mobileMenuControl){
	mobileMenuUl.children[0].firstElementChild.classList.add('mactive');	
}
 
 /* end mobile version */
 
 


