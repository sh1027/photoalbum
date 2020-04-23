$(function(){
   $(window).on('load',function(){
     $("#loading").fadeOut('slow');
   });
   function loaderClose(){
     $("#loading").fadeOut('slow');
   }
   setTimeout(loaderClose,1500);
});
//
// let vh = window.innerHeight * 0.01;
// document.documentElement.style.setProperty('--vh', `${vh}px`);
$(document).ready(function(){
  var hSize = $(window).height();
  $('.window-height').height(hSize); // アドレスバーを除いたサイズを付与
});
$(window).resize(function(){ // ページをリサイズした時の処理
  var hSize = $(window).height();
  $('.window-height').height(hSize); // アドレスバーを除いたサイズを付与
});
