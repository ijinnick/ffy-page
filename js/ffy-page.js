$(document).ready(function(){
    let toolsWrapper = document.getElementById('ffy-tools-wrapper')
    let toolsList = toolsWrapper.querySelectorAll('.tools-list > li');
    let toolsContentList = toolsWrapper.querySelectorAll('.tools-content > div')

    init();
    updateTool(toolsList[2]);

    function init(){
        for(var x=0;x<toolsList.length;x++){
        
            toolsList[x].addEventListener('click',function(evt){
                
                let parentEl = evt.target.parentNode.tagName === 'PICTURE' ? evt.target.parentNode.parentNode : evt.target.parentNode;
                if(parentEl.tagName === 'LI') updateTool(parentEl);
            })
        }
    }

    function updateTool(el){
        clearActiveClass(toolsList);
        clearContent(toolsContentList);

        console.log(el)
        console.log(el.dataset)

        el.classList.add('active')
        toolsWrapper.dataset['theme'] = el.dataset.theme;
        
        let toolContent = toolsWrapper.querySelector(`.tools-content .tool-${el.dataset.theme}`)
        
        switch(el.dataset.theme){
            case 'immunisation':{
                immunisation(toolContent,el.dataset.theme)
                break;
            }
            case 'poo-meter':{
                pooMeter(toolContent,el.dataset.theme)
                break;
            }
            case 'pregnancy-calculator':{
                pregnancyCalculator(toolContent,el.dataset.theme)
                break;
            }
            case 'baby-reality':{
                babyReality(toolContent,el.dataset.theme)
                break;
            }
        }
        
        if(toolContent) toolContent.classList.remove('hidden')
    }

    function immunisation(toolContent,theme){
        let data = `<p>${theme}: <br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>`
        toolContent.innerHTML = '';
        toolContent.innerHTML = data
    }

    function pooMeter(toolContent,theme){
        let data = `<p>${theme}: <br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque urna dolor, tempor non ultrices a, elementum vitae nisi. Aenean ullamcorper at mauris a vulputate.</p>`
        toolContent.innerHTML = '';
        toolContent.innerHTML = data
    }

    function pregnancyCalculator(toolContent,theme){
        // let data = `<p>${theme}: <br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque urna dolor, tempor non ultrices a, elementum vitae nisi. Aenean ullamcorper at mauris a vulputate.</p>`
        // toolContent.innerHTML = '';
        // toolContent.innerHTML = data
        
    }

    function clearActiveClass(els){
        for(var i=0; i < els.length; i++){
            els[i].classList.remove('active');
        }
    }

    function clearContent(el){
        for(var i=0; i < el.length; i++){
            el[i].classList.add('hidden');
        }
    }
})