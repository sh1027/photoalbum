$(function(){
   $(window).on('load',function(){
     $("#loading").fadeOut('slow');
   });
   function loaderClose(){
     $("#loading").fadeOut('slow');
   }
   setTimeout(loaderClose,10000);
});
