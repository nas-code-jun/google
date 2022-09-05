function closeOpenMenu () {
  var maxWidth = $('.main-content').parent().width(); //1009
  var realWidth = $('.main-content').width();
  if (realWidth == maxWidth) {
    var doIt = $('.main-content').css('width', '75%');
  } else {
    var doIt = $('.main-content').css('width', '100%');
  }
};

$(document).ready(function () {
  $('.btn-menu').on('click', function () {
    closeOpenMenu();
  });
});
