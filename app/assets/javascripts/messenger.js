$(document).on('turbolinks:load ajax:complete', function() {
  var messages_visible = $('.conversation .messages-list ul', this)
                              .has('li').length;
  var previous_messages_exist = $('.conversation .messages-list .load-more-messages', this).length;
  if (!messages_visible && previous_messages_exist) {
    $('.load-more-messages', this)[0].click();
    $('.conversation .messages-list .loading-more-messages').hide();
  }
});