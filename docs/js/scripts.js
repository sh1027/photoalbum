$('hover')
  .on('mouseenter touchstart', function(){
     $(this).addClass('hover');
}).on('mouseleave touchend', function(){
     $(this).removeClass('hover');
});
