$('.message .close')
  .on('click', function () {
    $(this)
      .closest('.message')
      .transition('fade');
  });
$(document).ready(() => { $('.rating').rating(); });
