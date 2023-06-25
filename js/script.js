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
ul.appendChild(li);
const liContent = `Random
    <ul>
        <li>Mathematics
            <ul>
                <li data-rand='maths/found' class='disabled'>Foundation</li>
                <li data-rand='maths/int'>Intermediate</li>
                <li data-rand='maths/high' class='disabled'>Higher</li>
            </ul>
        </li>
        <li>Numeracy
            <ul>
                <li data-rand='num/found' class='disabled'>Foundation</li>
                <li data-rand='num/int'>Intermediate</li>
                <li data-rand='num/high' class='disabled'>Higher</li>
            </ul>
        </li>
    </ul>`;
li.innerHTML = liContent;


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
    container.style.maxHeight = "none";
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
            // Image Container
            const container = document.getElementById('image-container');
            // Reset Zoom
            zoomRange.value = 100;
            container.style.width = width + 'px';
            container.style.maxHeight = "100%";
            // Load Image
            src = `./questions/${linkBtn.dataset.link}.jpeg`;
            if(!UrlExists(src)){src = './img/error-icon.png';}
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
const randBtns = document.querySelectorAll('li[data-rand]');
randBtns.forEach(randBtn => {
    randBtn.addEventListener('click', function(){
        const container = document.getElementById('image-container');
        const tempArr = filterArray(linkArr, randBtn.dataset.rand)
        let n = randomIntExcl(0, tempArr.length-1, prevLinks);
        prevLinks.push(n);
        src = `./questions/${tempArr[n]}.jpeg`;
        zoomRange.value = 100;
        container.style.width = width + 'px';
        container.style.maxHeight = "100%";
        if(!UrlExists(src)){src = './img/error-icon.png';}
        container.src = src;
        prevBtn.classList.add('disabled');
        nextBtn.classList.add('disabled');
    });
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

/* Filter Array */

function filterArray(arr, query) {
    return arr.filter((el) => el.toLowerCase().includes(query.toLowerCase()));
}

/* Color Background */

var colorPicker = document.getElementById('color-picker');
if(colorPicker){
    colorPicker.addEventListener('change', function(){
        document.body.style.background = colorPicker.value;
    });
}