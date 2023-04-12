/* Create Menu Navigation */

const navMenu = document.querySelector('#nav-menu');
let linkArr = [];
let navOutput = "";
createNav(menuItems)
navMenu.innerHTML = navOutput;
function createNav(itemArr){
    navOutput += `<ul>`;
    itemArr.forEach(item => {
        if(item.link){
            linkArr.push(item.link);
            navOutput += `<li data-link="${item.link}">`;
        }else{
            if(item.sub){
                navOutput += `<li>`;
            }else{
                navOutput += `<li class='disabled'>`;
            }
        }
        navOutput += item.name;
        if(item.sub){
            createNav(item.sub);
        }
        navOutput += `</li>`;
    });
    navOutput += `</ul>`;
};

/* Random Topic */

const ul = document.querySelector('nav ul');
const li = document.createElement("li");
li.appendChild(document.createTextNode("Random"));
li.setAttribute("id", "random-btn");
ul.appendChild(li);

/* Navigation */

const menuLists = document.querySelectorAll('nav li');
menuLists.forEach(menuList => {
    if (menuList.querySelector('ul')) {
        menuList.addEventListener('click', (e) => {
            if (!menuList.classList.contains('disabled')) {
                e.stopPropagation();
                hideNav();
                menuList.querySelector('ul').classList.toggle('show');                
            }
        });
    }
});

/* Hide Navigation */

const closeNav = document.getElementById('question');
closeNav.addEventListener('click', function(){
    hideNav();
})

function hideNav(){
    const openMenus = document.querySelectorAll('.show');
    openMenus.forEach(openMenu => {
        openMenu.classList.remove('show');
    });
}

/* Image Zoon */

const container = document.getElementById('image-container');
const width = container.offsetWidth;
const zoomRange = document.getElementById('zoom-range');
zoomRange.addEventListener('input', function() {
    const scale = this.value;
    container.style.width = (width * scale / 100) + 'px';
});

/* Load Question */

const linkBtns = document.querySelectorAll('li[data-link]');
linkBtns.forEach(linkBtn => {
    linkBtn.addEventListener('click', function(){
        linkBtns.forEach(linkBtnsOff => {
            linkBtnsOff.classList.remove('selected');
        });
        linkBtn.classList.add('selected');  
        loadQuestion();    
    });
});

function loadQuestion(){
    linkBtns.forEach((linkBtn, index) => {
        if(linkBtn.classList.contains('selected')){
            // Load Image
            src = `./questions/${linkBtn.dataset.link}.jpeg`;
            if(!UrlExists(src)){src = './error-icon.png';}
            const container = document.getElementById('image-container');
            container.src = src;
            // Previous Image
            const prevElem = linkBtns[index - 1];
            if(prevElem && prevElem.parentElement == linkBtn.parentElement){
                prevBtn.classList.remove('disabled');
            }else{
                prevBtn.classList.add('disabled');
            }
            //Next Image
            const nextElem = linkBtns[index + 1];
            if(nextElem && nextElem.parentElement == linkBtn.parentElement){
                nextBtn.classList.remove('disabled');
            }else{
                nextBtn.classList.add('disabled');
            }
            // Reset Zoom
            zoomRange.value = 100;
            container.style.width = width + 'px';
        }
    });
}

/* Previous Button */

const prevBtn = document.getElementById('left-nav');
prevBtn.addEventListener('click', function(){
    if(!prevBtn.classList.contains('disabled')){
        const selectBtn = document.querySelector('li.selected');
        const prevElem = selectBtn.previousSibling;
        selectBtn.classList.remove('selected');
        prevElem.classList.add('selected');  
        loadQuestion(); 
    }    
});

/* Next Button */

const nextBtn = document.getElementById('right-nav');
nextBtn.addEventListener('click', function(){
    if(!nextBtn.classList.contains('disabled')){
        const selectBtn = document.querySelector('li.selected');
        const nextElem = selectBtn.nextSibling;
        selectBtn.classList.remove('selected');
        nextElem.classList.add('selected');  
        loadQuestion(); 
    }    
});

/* Keypress Events */

window.addEventListener("keyup", (event) => {
    if(event.key == 'ArrowLeft'){
        if(!prevBtn.classList.contains('disabled')){
            const selectBtn = document.querySelector('li.selected');
            const prevElem = selectBtn.previousSibling;
            selectBtn.classList.remove('selected');
            prevElem.classList.add('selected');  
            loadQuestion(); 
        }  
    }
    if(event.key == 'ArrowRight'){
        if(!nextBtn.classList.contains('disabled')){
            const selectBtn = document.querySelector('li.selected');
            const nextElem = selectBtn.nextSibling;
            selectBtn.classList.remove('selected');
            nextElem.classList.add('selected');  
            loadQuestion(); 
        }    
    }
});

/* Random Topic */

let prevLinks = [];
const randomBtn = document.getElementById('random-btn');
randomBtn.addEventListener('click', function(){
    let n = randomIntExcl(0, linkArr.length-1, prevLinks);
    prevLinks.push(n);
    src = `./questions/${linkArr[n]}.jpeg`;
    if(!UrlExists(src)){src = './error-icon.png';}
    const container = document.getElementById('image-container');
    container.src = src;
    prevBtn.classList.add('disabled');
    nextBtn.classList.add('disabled');
    zoomRange.value = 100;
    container.style.width = width + 'px';
});

/* Random Number */

function randomIntExcl(min, max, excl) {
    if (!Array.isArray(excl)) {
      excl = [excl];
    }
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    } while (excl.includes(randomNumber));
    return randomNumber;
}

/* Check Source */

function UrlExists(url){
   var http = new XMLHttpRequest();
   http.open('HEAD', url, false);
   http.send();
   return http.status!=404;
}