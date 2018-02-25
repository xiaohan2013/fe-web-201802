import $ from 'jquery';
import 'bootstrap';
import Swiper from 'swiper';
import "./base";
import "bootstrap/scss/bootstrap.scss";
import "swiper/dist/css/swiper.min.css";
import "../sass/main.scss";

$('.carousel').carousel();

new Swiper('.clients, .partners', {
    spaceBetween: 30,
    loop: true,
    autoplay: {
        stopOnLastSlide:true,
    },
    pageination:{
        el:'.swiper-pagination',
        clickable: true
    },
    slidesPerView: 3,
    spaceBetween: 30,
    freeMode: true,
    // virtualSize: 100,
});


