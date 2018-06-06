/**
 * Created by Administrator on 2018-01-25.
 */


$(function(){
    var mySwiper = new Swiper('#swiper-container1',{
        pagination:{
            el: '.swiper-pagination',
            bulletActiveClass: 'my-bullet-active',
        },
        autoplay: {disableOnInteraction: false,},
        loop : true
    });

    var mySwiper = new Swiper('#swiper-container2',{
        direction : 'vertical',
        autoplay: {disableOnInteraction: false,},
        loop : true
    })
    var mySwiper = new Swiper('#swiper-container3',{
        pagination:{
            el: '.swiper-pagination',
            bulletActiveClass: 'my-bullet-active',
        },
        //autoplay: {disableOnInteraction: false,},
        loop : true,
        roundLengths : true,
    });
});