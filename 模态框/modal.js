let aBtn = document.querySelectorAll('.btn');
let aModal = document.querySelectorAll('.modal');
let oMask = document.getElementById('backdrop');

for (let index = 0; index < aBtn.length; index++) {
    aBtn[index].addEventListener('click',function(){
        oMask.style.display = 'block';
        aModal[0].style.display = 'block';
    },false); 
}