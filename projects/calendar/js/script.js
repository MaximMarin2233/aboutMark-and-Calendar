"use strict";

const box = document.querySelector('#show-my-box'),
      iconArrow = document.querySelector('.icon-arrow'),
      inputDate = document.querySelector('input[type="date"]'),
      btnAdd = document.querySelector('[data-add]'),
      btnBack = document.querySelector('[data-back]'),
      btnSave = document.querySelector('[data-save]'),
      select = document.querySelector('#select-type'),
      addDate = document.querySelector('.add-date'),
      addEvent = document.querySelector('.add-event-container'),
      holidays = addEvent.querySelector('[data-name="holidays"]'),
      events = addEvent.querySelector('[data-name="events"]'),
      etc = addEvent.querySelector('[data-name="etc"]'),
      inputName = document.querySelector('#input-name'),
      holidaysInput = holidays.querySelector('input'),
      eventsInputs = events.querySelectorAll('input'),
      etcInput = etc.querySelector('input');

      
      

let DB = {};      


      function elementRotate (element, deg) {

        element.style.transform = `rotate(${deg}deg)`;

      }

      function elForEach (arr, clName) {

        clName.forEach( (item, i) => {

            arr[i].className = `${item}`;

        }); 

      }

      function addClass (elementsArr, classNamesArr, elsArr, condition = true) {

        if (condition) {

            elForEach(elementsArr, classNamesArr);

        } else {
            
            elForEach(elementsArr, elsArr);
            
        }
        

      }

      function addPropertyInObj (obj, propertyArr, inputValueArr) {


        inputValueArr.forEach((item, i) => {

            obj[propertyArr[i]] = item.value;

            item.value = '';

        });



      }

      function condition (condition, action1, action2, arr1, arr2) {

        if (condition) {

            action1(...arr1);

            if (action2) {
                action2(...arr2);
            }
            

        }

      }
      

      function addPropertyInHTML (element, value1 = '', value2 = '') {

        if (value1 && value2) {
            element.innerHTML += `
        
            <div class="event-text">
    
                <div class="side">
    
                    <h1 class="title">${DB.eventName}</h1>
                    <span>${value1} ${DB.value1}</span>
                    <span>${value2} ${DB.value2}</span>
                    
    
                </div>
    
                <div class="icons">
    
                    <img class="icon-pencil" src="img/pencil.png" alt="pencil">
                    <img class="icon-delete" src="img/delete.png" alt="trash">
    
                    <span id="date-text">${DB.date}</span>
    
                </div>
    
            </div>
            
            `;
        } else {

            element.innerHTML += `
        
            <div class="event-text">
    
                <div class="side">
    
                    <h1 class="title">${DB.eventName}</h1>
                    <span>${value1} ${DB.value1}</span>
    
                </div>
    
                <div class="icons">
    
                    <img class="icon-pencil" src="img/pencil.png" alt="pencil">
                    <img class="icon-delete" src="img/delete.png" alt="trash">
    
                    <span id="date-text">${DB.date}</span>
    
                </div>
    
            </div>
            
            `;

        }

        document.querySelectorAll('.icon-delete').forEach(btn => {

            btn.addEventListener('click', e => {

                btn.parentElement.parentElement.remove();

            });

        });

        document.querySelectorAll('.icon-pencil').forEach(btn => {


            btn.addEventListener('click', e => {

                addClass([addDate, addEvent], ['add-date hide', 'add-event-container'], ['add-date hide', 'add-event-container'], addDate.className == 'add-date');

                if (e.target.parentElement.previousElementSibling.querySelector('span').textContent.indexOf('Бюджет') >= 0) {
                    e.target.parentElement.parentElement.remove();
                    condition(e.target.parentElement.previousElementSibling.querySelector('span').textContent.indexOf('Бюджет') >= 0, editElmenet, editBtn, [inputName, holidaysInput, e.target.parentElement.previousElementSibling.querySelector('h1').textContent, e.target.parentElement.previousElementSibling.querySelector('span').textContent], [select, 'Праздничные дни', [holidays, events, etc], ['holidays', 'events hide', 'etc hide']]);
                }


                if (e.target.parentElement.previousElementSibling.querySelector('span').textContent.indexOf('Адрес') >= 0) {
                    e.target.parentElement.parentElement.remove();
                    condition(e.target.parentElement.previousElementSibling.querySelector('span').textContent.indexOf('Адрес') >= 0, editElmenet, editBtn, [inputName, eventsInputs[0], e.target.parentElement.previousElementSibling.querySelector('h1').textContent, e.target.parentElement.previousElementSibling.querySelector('span').textContent, eventsInputs[1], e.target.parentElement.previousElementSibling.querySelectorAll('span')[1].textContent], [select, 'Мероприятия', [holidays, events, etc], ['holidays hide', 'events', 'etc hide']]);
                }

                if (e.target.parentElement.previousElementSibling.querySelector('span').textContent.indexOf('Заметка') >= 0) {
                    e.target.parentElement.parentElement.remove();
                    condition(e.target.parentElement.previousElementSibling.querySelector('span').textContent.indexOf('Заметка') >= 0, editElmenet, editBtn, [inputName, etcInput, e.target.parentElement.previousElementSibling.querySelector('h1').textContent, e.target.parentElement.previousElementSibling.querySelector('span').textContent], [select, 'Пометки / Другое', [holidays, events, etc], ['holidays hide', 'events hide', 'etc']]);
                }

            });

        });



      }

      function editElmenet (input1, input2, value1, value2, input3, value3 = '') {

        input1.value = value1;
        input2.value = value2;

        if (input3) {
            input3.value = value3;
        }
        

      }

      function editBtn (element, value, elArr, clArr) {
          element.value = `${value}`;

          addClass([...elArr], [...clArr], [], true);

      }


document.querySelector('#show-my-btn').addEventListener('click', e => {

    if (box.className == 'box') {
        elementRotate(iconArrow, 270);
    } else {
        elementRotate(iconArrow, 90);
    }

    addClass([box], ['box box-show'], ['box'], box.className == 'box');

});

btnAdd.addEventListener('click', e => {

    addClass([inputDate], ['input error'], ['input'], !inputDate.value);   
    addClass([addDate, addEvent], ['add-date hide', 'add-event-container'], ['add-date', 'add-event-container hide'], inputDate.value);  
    
    DB.date = inputDate.value;
    
});

btnBack.addEventListener('click', e => {

    addClass([addDate, addEvent], ['add-date hide', 'add-event-container'], ['add-date', 'add-event-container hide'], !inputDate.value);   

});

select.addEventListener('click', e => {

    addClass([holidays], ['holidays'], ['holidays hide'], select.selectedOptions[0].textContent.length == 15);

    addClass([events], ['events'], ['events hide'], select.selectedOptions[0].textContent.length == 11);

    addClass([etc], ['etc'], ['etc hide'], select.selectedOptions[0].textContent.length == 16);

});

btnSave.addEventListener('click', e => {

    if (select.selectedOptions[0].textContent.length == 15) {

        addClass([holidaysInput, inputName], ['input error', 'input error'], ['input', 'input'], !holidaysInput.value || !inputName.value);

        addClass([addDate, addEvent, box], ['add-date', 'add-event-container hide', 'box box-show'], ['add-date hide', 'add-event-container', 'box'], holidaysInput.value && inputName.value);

        DB = {'date': inputDate.value};
        condition(holidaysInput.value && inputName.value, addPropertyInObj, addPropertyInHTML, [DB, ['eventName', 'value1'], [inputName, holidaysInput]], [box, 'Бюджет:']);


    } else if (select.selectedOptions[0].textContent.length == 11) {

        addClass([eventsInputs[0], eventsInputs[1], inputName], ['input error', 'input error', 'input error'], ['input', 'input', 'input'], !eventsInputs[0].value || !eventsInputs[1].value || !inputName.value);

        addClass([addDate, addEvent, box], ['add-date', 'add-event-container hide', 'box box-show'], ['add-date hide', 'add-event-container', 'box'], eventsInputs[0].value && eventsInputs[1].value && inputName.value);


        DB = {'date': inputDate.value};
        condition(eventsInputs[0].value && eventsInputs[1].value && inputName.value, addPropertyInObj, addPropertyInHTML, [DB, ['eventName', 'value1', 'value2'], [inputName, eventsInputs[0], eventsInputs[1]]], [box, 'Адрес:', 'Время:']);

    } else if (select.selectedOptions[0].textContent.length == 16) {

        addClass([etcInput, inputName], ['input error', 'input error'], ['input', 'input'], !etcInput.value || !inputName.value);

        addClass([addDate, addEvent, box], ['add-date', 'add-event-container hide', 'box box-show'], ['add-date hide', 'add-event-container', 'box'], etcInput.value && inputName.value);


        DB = {'date': inputDate.value};
        condition(etcInput.value && inputName.value, addPropertyInObj, addPropertyInHTML, [DB, ['eventName', 'value1'], [inputName, etcInput]], [box, 'Заметка:']);

    }

    

});




