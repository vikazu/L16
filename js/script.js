window.addEventListener('DOMContentLoaded', function () {

    'use strict';
    //Beginning of tabs
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++){
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);

    function showTabContent(b) {
        if(tabContent[b].classList.contains('hide')){
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event){
        let target = event.target;
        if( target && target.classList.contains('info-header-tab')){
            for(let i = 0; i < tab.length; i++){
                if (target === tab[i]){
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });
    //Ending of tabs
    //Beginning of Timer
     let deadline = '2030-10-15';

     function getTimeRemaining(endTime) {
         let t = Date.parse(endTime) - Date.parse(new Date()),
             seconds = Math.floor((t/1000) % 60),
             minutes = Math.floor((t/1000/60) % 60),
             hours = Math.floor((t/(1000*60*60)) % 24),
             days = Math.floor((t/(1000*60*60*24)));

         return {
             'total' : t,
             'days' : days,
             'hours' : hours,
             'minutes' : minutes,
             'seconds' : seconds
         };
     }
     function setClock (id, endtime) {
         let timer = document.getElementById(id),
             days = timer.querySelector('.days'),
             hours = timer.querySelector('.hours'),
             minutes = timer.querySelector('.minutes'),
             seconds = timer.querySelector('.seconds'),
             timeInterval = setInterval(updateClock, 1000);

         function updateClock () {
             let t = getTimeRemaining(endtime);
             days.textContent = t.days;
             hours.textContent = t.hours;
             minutes.textContent = t.minutes;
             seconds.textContent = t.seconds;

             if(t.total <= 0) {
                 clearInterval(timeInterval);
             }
         }
     }
     setClock('timer', deadline);
    //Ending of Timer
    //Beginning of an modal window
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');
    more.addEventListener('click', function () {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });
    //Ending of an modal window
    //Beginning of a form
    let message = {
        loading: 'Loading...',
        success: 'Thank you! We will call you soon!',
        failure: 'Something is wrong!'
    };
    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');
    statusMessage.classList.add('status');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        let formData = new FormData(form);
        request.send(formData);
        request.addEventListener('readystatechange', function(){
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if(request.readyState === 4 && request.status === 200){
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
            });
    });


    //Ending of a form

});