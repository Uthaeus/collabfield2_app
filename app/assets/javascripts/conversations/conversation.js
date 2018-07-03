$(document).on('turbolinks:load', function() {
  $('.messages-list').scrollTop(500);

  $(document).on('keydown', '.conversation-window, .conversation', function(event) {
    if (event.keyCode === 13) {
      if ($.trim($('textarea', this).val())) {
        $('.send-message', this).click();
        event.target.value = "";
        event.preventDefault();
      }
    }
  });
});

function calculateUnseenConversations() {
  var unseen_conv_length = $('#conversations-menu').find('.unseen-conv').length;

  if (unseen_conv_length) {
    $('#unseen-conversations').css('visibility', 'visible');
    $('#unseen-conversations').text(unseen_conv_length);
  } else {
    $('#unseen-conversations').css('visibility', 'hidden');
    $('#unseen-conversations').text('');
  }
}