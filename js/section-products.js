$(document).ready(function(){
    let lastWidthProducts = document.documentElement.clientWidth;


    if(window.matchMedia('screen and (min-device-width: 768px)').matches){
        var showIndicators = false;
        if($('.ffy-products-list .ffy-product-item').length > 2) showIndicators = true;
        $('.ffy-products-list').slick({
            dots: showIndicators,
            arrows: showIndicators,
            infinite: false,
            slidesToShow: 2.3,
            slidesToScroll: 1
        })
    }
    else{
        $('.ffy-products-list').slick({
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
        if(lastWidthProducts !== document.documentElement.clientWidth){

            lastWidthProducts = document.documentElement.clientWidth;
            $('.ffy-products-list').slick('unslick');

            if(window.matchMedia('screen and (min-device-width: 768px)').matches){
                var showIndicators = false;
                if($('.ffy-products-list .ffy-product-item').length > 2) showIndicators = true;
                $('.ffy-products-list').slick({
                    dots: showIndicators,
                    arrows: showIndicators,
                    infinite: false,
                    slidesToShow: 2.3,
                    slidesToScroll: 1
                })
            }else{
                $('.ffy-products-list').slick({
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