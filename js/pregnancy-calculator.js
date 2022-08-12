let dropdownId = document.getElementById('cycle');
let dateOfPeriod = document.getElementById('date');
let dueDate = document.getElementById('ddate')
let calcBtn = document.getElementById('calculate');
let reCalcBtn = document.getElementById('recalculate');
let dueDateCalcBtn = document.getElementById('ddate-calc');
let dueDateCalcBtn2 = document.getElementById('ddate-calc2');
let pcItems = document.querySelectorAll('.tool-pregnancy-calculator > div')
// var maxCycle = 45;
// for(var x = 21; x <= 45; x++){
//     let option = document.createElement('option');
//     option.value = x;
//     option.innerHTML = x + ' days';
//     dropdownId.appendChild(option)
// }
console.log(pcItems)
console.log(pcItems[0])

/**initialise flatpick date */
dateOfPeriod ? flatpickr(dateOfPeriod, { dateFormat: 'd-m-Y'}) : '';
dueDate ? flatpickr(dueDate, { dateFormat: 'd-m-Y'}) : '';

function attachEvents(){
    /** go to .pc-step-2a (for final step)  */
    calcBtn.addEventListener('click',function(evt){
        evt.preventDefault();
        showCurrentStep(pcItems[1])
    })
    /** go to .pc-step-2b (if mum has due date)  */
    dueDateCalcBtn.addEventListener('click',function(evt){
        evt.preventDefault();
        showCurrentStep(pcItems[2])
    })
    /** go to .pc-step-2a (for final step) */
    dueDateCalcBtn2.addEventListener('click',function(evt){
        evt.preventDefault();
        showCurrentStep(pcItems[1])
    })
    /** go to .pc-step-1 (recalculate)  */
    reCalcBtn.addEventListener('click',function(evt){
        evt.preventDefault();
        showCurrentStep(pcItems[0])
    })
    dropdownId.addEventListener('keypress',function(evt){
        console.log(evt.key)
        console.log(isNaN(evt.key))
    })
    dropdownId.addEventListener('focusout',function(evt){
        console.log(evt.target.value)
        console.log(isNaN(evt.target.value))
        if(isNaN(evt.target.value)) evt.target.value = ''
    })
}


function showCurrentStep(el){
    pcItems.forEach(item => {
        let iItem = item;
        item.style.setProperty('opacity','0')
        setTimeout(function(){
            iItem.classList.remove('active');
        },300)
    })
    setTimeout(function(){ if(el) el.classList.add('active'); el.style.setProperty('opacity','1')},300)
}


attachEvents();
showCurrentStep(pcItems[0]);