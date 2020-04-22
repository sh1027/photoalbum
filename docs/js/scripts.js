$(function(){
   $(window).on('load',function(){
     $("#loading").fadeOut('slow');
   });
   function loaderClose(){
     $("#loading").fadeOut('slow');
   }
   setTimeout(loaderClose,10000);
});

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
