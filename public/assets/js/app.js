$('.message .close')
  .on('click', function () {
    $(this)
      .closest('.message')
      .transition('fade');
  });
$(document).ready(() => { $('.rating').rating(); });
$('.tabular.menu .item').tab();
$('.pointing.secondary.menu .item').tab();
$('.ui.checkbox')
  .checkbox();

$('#success').hide();
$('#warning-favorite').hide();
$('#error-favorite').hide();

// function for action administrator, delete,update...
function confirmAction(link, message) {
  if (confirm(message)) {
    $.ajax({

      url: link,
      success(data) {
        if (!data.error) {
          $('#success').transition('fly up');
        }

        if (data.favorite) {
          $('#warning-favorite').show();
        }
      },
      error() {
        alert('echec');
      },
    });
  }
}
function actionUser(link, message){

  if(confirm(message)){
    window.location.href=link;
  }
}

function favoriteAction(link, message){
  if(confirm(message)){
    window.location.href= link;
  }
}
