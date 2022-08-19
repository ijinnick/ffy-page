$(document).ready(function(){
    let lastWidthPromotions = document.documentElement.clientWidth;


    if(window.matchMedia('screen and (min-device-width: 768px)').matches){
        var showIndicators = false;
        if($('.ffy-promotions-list .ffy-promotion-item').length > 2) showIndicators = true;
        $('.ffy-promotions-list').slick({
            dots: showIndicators,
            arrows: showIndicators,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1
        })
    }
    else{
        $('.ffy-promotions-list').slick({
            dots: true,
            arrows: false,
            infinite: false,
            slidesToShow: 1.1,
            centerMode: true,
            centerPadding: '0'
        })
    }

    window.addEventListener('resize',function(){

        /** prevent resize function trigger */
        if(lastWidthPromotions !== document.documentElement.clientWidth){

            lastWidthPromotions = document.documentElement.clientWidth;
            $('.ffy-promotions-list').slick('unslick');

            if(window.matchMedia('screen and (min-device-width: 768px)').matches){
                var showIndicators = false;
                if($('.ffy-promotions-list .ffy-promotion-item').length > 2) showIndicators = true;
                $('.ffy-promotions-list').slick({
                    dots: showIndicators,
                    arrows: showIndicators,
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                })
            }else{
                $('.ffy-promotions-list').slick({
                    dots: true,
                    arrows: false,
                    infinite: false,
                    slidesToShow: 1.1,
                    centerMode: true,
                    centerPadding: '0'
                })
            }
        }
    })
})