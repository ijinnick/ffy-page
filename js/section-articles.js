$(document).ready(function(){
    let lastWidth = document.documentElement.clientWidth;

    if(window.matchMedia('screen and (min-device-width: 768px)').matches){
        var showIndicators = false;
        if($('.ffy-articles-carousel .article-item').length > 2) showIndicators = true;
        $('.ffy-articles-carousel').slick({
            dots: showIndicators,
            arrows: showIndicators,
            infinite: false,
            slidesToShow: 2.5,
            slidesToScroll: 1,
        })
    }else{
        $('.ffy-articles-carousel').slick({
            dots: true,
            arrows: false,
            infinite: false,
            slidesToShow: 1,
            centerMode: true,
            centerPadding: '20px'
        })
    }

    window.addEventListener('resize',function(){

        /** prevent resize function trigger */
        if(lastWidth !== document.documentElement.clientWidth){

            lastWidth = document.documentElement.clientWidth;
            $('.ffy-articles-carousel').slick('unslick');

            if(window.matchMedia('screen and (min-device-width: 768px)').matches){
                var showIndicators = false;
                if($('.ffy-articles-carousel .article-item').length > 2) showIndicators = true;
                $('.ffy-articles-carousel').slick({
                    dots: showIndicators,
                    arrows: showIndicators,
                    infinite: false,
                    slidesToShow: 2.5,
                    slidesToScroll: 1,
                })
            }else{
                $('.ffy-articles-carousel').slick({
                    dots: true,
                    arrows: false,
                    infinite: false,
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '20px'
                })
            }
        }
    })
})