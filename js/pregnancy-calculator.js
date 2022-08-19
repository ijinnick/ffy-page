let cycleLength = document.getElementById('cycle');
let dateOfPeriod = document.getElementById('date');
let dueDate = document.getElementById('ddate')
let calcBtn = document.getElementById('calculate');
let reCalcBtn = document.getElementById('recalculate');
let dueDateText = document.getElementById('ddate-text');
let dueDateCalcBtn = document.getElementById('ddate-calc');
let dueDateCalcBtn2 = document.getElementById('ddate-calc2');

let pcItems = document.querySelectorAll('.tool-pregnancy-calculator > div')
let barIndicator = document.querySelector('.pregnancy-timeline .pt-bar-progress');
let dotIndicator = document.querySelector('.pregnancy-timeline .pt-scrub');
let infographic = document.querySelector('.pc-step-2a .infographic');


/**
 * for manual input of due date
 */
let ddateDate = document.getElementById('ddate-date')
let ddateMonth = document.getElementById('ddate-month')
let ddateYear = document.getElementById('ddate-year')
let errorMessage = document.querySelector('.tool-pregnancy-calculator .error-message')

/** months array */
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

console.log(pcItems)
console.log(pcItems[0])

/** create the minimum date  logic for last day of period date */
let dateoflastperiod = new Date();
let newDateOfPeriod = dateoflastperiod.setDate(dateoflastperiod.getDay() - 280);

/** create the max date logic for the due date */
let duedatemax = new Date();
let newduedatemax = duedatemax.setDate(duedatemax.getDay() + 365)

console.log(newDateOfPeriod)
console.log(new Date(newDateOfPeriod))

/**initialise flatpick date */
dateOfPeriod ? flatpickr(dateOfPeriod, { minDate: new Date(newDateOfPeriod), maxDate: new Date(), defaultDate: new Date(), dateFormat: 'd-m-Y'}) : '';
// dueDate ? flatpickr(dueDate, { minDate: new Date(), maxDate: new Date(newduedatemax), dateFormat: 'd-m-Y'}) : '';

function attachEvents(){

    /** go to .pc-step-2a (for final step)  */
    calcBtn.addEventListener('click',function(evt){
        evt.preventDefault();
        console.log(dateOfPeriod.value)
        if(!/\s/g.test(cycleLength.value) && dateOfPeriod.value !== ''){
            /** split the values. array[2] for YYYY, [1] for MM, [0] for DD
             * I subtracted 1 in the MM value as months are zero indexed
            */
            let dateValues = dateOfPeriod.value.split('-')
            // let month = dateValues[1] < 10 ? "0" + dateValues[1] : dateValues[1];
            let lastPeriod = new Date(`${dateValues[1]}/${dateValues[0]}/${dateValues[2]}`)
            let cycleDays = (cycleLength.value === '' ? 28 : cycleLength.value) - 14;
            
            console.log(dateValues)

            /** calculation for Ovulation Day */
            let newDate = new Date(`${dateValues[1]}/${dateValues[0]}/${dateValues[2]}`)
            let dateInMs = newDate.setDate(lastPeriod.getDate() + cycleDays)
            let ovulationDate = new Date(dateInMs)

            console.log(`period ${lastPeriod.getDate()}`)
            console.log(`ovulDate: ${ovulationDate}`)

            /**
             *  calculation for Estimated Date of Birth
             */
            console.log(`${dateValues[1]}/${dateValues[0]}/${dateValues[2]}`)
            let estDOB = new Date(ovulationDate.getTime() + ( 266 * 1000 * 3600 * 24 ))
            console.log(ovulationDate.getDate())

            dueDateText.innerHTML = `${months[estDOB.getMonth()]} ${estDOB.getDate()}, ${estDOB.getFullYear()}`;

            calcTrimester(estDOB)
            showCurrentStep(pcItems[1])
        }
        
    })

    /** go to .pc-step-2b (if mum has due date)  */
    dueDateCalcBtn.addEventListener('click',function(evt){
        evt.preventDefault();
        // sessionStorage.setItem('to-ddate','true')
        showCurrentStep(pcItems[2])
    })
    /** go to .pc-step-2a (for final step From Mum has due date) */
    dueDateCalcBtn2.addEventListener('click',function(evt){
        evt.preventDefault();

        /**
         * check if date values are not empty
         * and is a valid date
         */
        if(!/\s/g.test(ddateDate.value)
        && ddateDate.value !== ''
        && !/\s/g.test(ddateMonth.value)
        && ddateMonth.value !== ''
        && !/\s/g.test(ddateYear.value)
        && ddateMonth.value !== ''){

            let ddateCombined = new Date(`${ddateMonth.value}/${ddateDate.value}/${ddateYear.value}`);
            let todayDate = new Date();
            let newTodayDate = new Date();
            newTodayDate = newTodayDate.setDate(todayDate.getDate() + 280);


            console.log(`${ddateMonth.value}/${ddateDate.value}/${ddateYear.value}`)
            console.log(new Date(ddateCombined))
            console.log(ddateCombined.getDate())
            console.log(ddateCombined.getTime())
            console.log(todayDate.getTime())
            console.log(newTodayDate)

            if(ddateCombined.getTime() > todayDate.getTime() && ddateCombined.getTime() < newTodayDate){
                
                dueDateText.innerHTML = `${months[ddateCombined.getMonth()]} ${ddateCombined.getDate()}, ${ddateCombined.getFullYear()}`
                console.log(`${months[ddateCombined.getMonth()]} ${ddateCombined.getDate()}, ${ddateCombined.getFullYear()}`)
                // dueDateText.innerHTML = `${months[ddateValues[1] > 0 ? ddateValues[1] - 1 : 12]} ${ddateValues[0]}, ${ddateValues[2]}`
                calcTrimester(ddateCombined)
                showCurrentStep(pcItems[1])
            }else{
                errorMessage.classList.add('active')
            }

        }else{
            console.log('errorß')
            errorMessage.classList.add('active')
        }
        // if(dueDate.value !== ''){
        //     let ddateValues = dueDate.value.split('-');
        //     let newDueDate = new Date(`${ddateValues[1]}/${ddateValues[0]}/${ddateValues[2]}`)

        //     console.log(newDueDate)
        //     dueDateText.innerHTML = `${months[ddateValues[1] > 0 ? ddateValues[1] - 1 : 12]} ${ddateValues[0]}, ${ddateValues[2]}`

        //     calcTrimester(newDueDate)
        //     showCurrentStep(pcItems[1])
        // }
    })

    /** go to .pc-step-1 (recalculate)  */
    reCalcBtn.addEventListener('click',function(evt){
        evt.preventDefault();

        setTimeout(function(){
            dotIndicator.style.setProperty('margin-left',`0%`)
            barIndicator.style.setProperty('width',`0%`)
        },300)

        /**
         * clear all values
         */
        cycleLength.value = ''
        dateOfPeriod.value = ''
        ddateDate.value = ''
        ddateMonth.value = ''
        ddateYear.value = ''
        // dueDate.value = ''


        showCurrentStep(pcItems[0])

        // if(sessionStorage.getItem('to-ddate')){
        //     showCurrentStep(pcItems[2])
        //     sessionStorage.removeItem('to-date');
        // }else showCurrentStep(pcItems[0])
    })

    /**
     * keypress event listeners
     */
    cycleLength.addEventListener('keypress',function(evt){
        if(isNaN(evt.key)) evt.preventDefault();
        console.log(evt.key)
        console.log(isNaN(evt.key))
    })
    ddateDate.addEventListener('keypress',function(evt){
        if(isNaN(evt.key)) evt.preventDefault();
        console.log(evt.key)
        console.log(isNaN(evt.key))
    })
    ddateMonth.addEventListener('keypress',function(evt){
        if(isNaN(evt.key)) evt.preventDefault();
        console.log(evt.key)
        console.log(isNaN(evt.key))
    })
    ddateYear.addEventListener('keypress',function(evt){
        if(isNaN(evt.key)) evt.preventDefault();
        console.log(evt.key)
        console.log(isNaN(evt.key))
    })

    /**
     * focusout event listeners
     */
    cycleLength.addEventListener('focusout',function(evt){
        if(isNaN(evt.target.value)) evt.target.value = ''
    })
    ddateDate.addEventListener('focusout',function(evt){
        if(errorMessage.classList.contains('active')) errorMessage.classList.remove('active')
        if(isNaN(evt.target.value)) evt.target.value = ''
    })
    ddateMonth.addEventListener('focusout',function(evt){
        if(errorMessage.classList.contains('active')) errorMessage.classList.remove('active')
        if(isNaN(evt.target.value)) evt.target.value = ''
    })
    ddateYear.addEventListener('focusout',function(evt){
        if(errorMessage.classList.contains('active')) errorMessage.classList.remove('active')
        if(isNaN(evt.target.value)) evt.target.value = ''
    })

}

function calcTrimester(ddate){
    console.log(ddate)
    
    var month = 0
    var todaysDate = new Date();
    var totalWeeks = 40;
    month = ddate.getMonth() > 11 ? 12 : ddate.getMonth() + 1

    console.log(month)
    console.log(`${month < 10 ? "0" + month : month}/${ddate.getDate()}/${ddate.getFullYear()}`)

    /** 
     * compare today's date vs the due date
     */
    var newDate = new Date(`${month < 10 ? "0" + month : month}/${ddate.getDate() < 10 ? "0" + ddate.getDate() : ddate.getDate()}/${ddate.getFullYear()}`);
    var ovulDate = newDate.setDate(ddate.getDate() - 280)
    var timediff = todaysDate.getTime() - ovulDate;
    

    console.log(`duedate: ${parseInt(ddate.getTime() / (1000 * 3600 * 24))}`)
    console.log(`todaysdate: ${parseInt(todaysDate.getTime() / (1000 * 3600 * 24))}`)
    console.log(`timediff: ${timediff}`)
    console.log(`days: ${parseInt(timediff  / (1000 * 3600 * 24)) }`)
    console.log(`weeks: ${parseInt(timediff  / (7 * 1000 * 3600 * 24))} weeks`)

    /**
     * calculate the days to get # of weeks
     * the get it's percentage
     */
    var weeks = parseInt(timediff  / (7 * 1000 * 3600 * 24));
    var percentage = Math.ceil((weeks / totalWeeks) * 100);

    console.log(`perc: ${percentage}`)

    if(percentage > 0)
    infographic.querySelector('.info-copy p').innerHTML = `At ${weeks} week${weeks > 1 ? 's' : ''} pregnant, your baby is the size of cherry.`

    setTimeout(function(){
        /** update the timeinline indicators */
        if(percentage < 1){
            infographic.querySelector('.info-copy p').innerHTML = `Overdue`
            dotIndicator.style.setProperty('margin-left',`98%`)
            barIndicator.style.setProperty('width',`100%`)
        }else{
            dotIndicator.style.setProperty('margin-left',`${percentage > 98 ? 98 : percentage}%`)
            barIndicator.style.setProperty('width',`${percentage < 99 ? percentage + 2 : percentage > 100 ? 100 : percentage}%`)
        }
    },400)
    

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