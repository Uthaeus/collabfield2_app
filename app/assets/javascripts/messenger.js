$(document).on('turbolinks:load ajax:complete', function() {
  var messages_visible = $('.conversation .messages-list ul', this)
                              .has('li').length;
  var previous_messages_exist = $('.conversation .messages-list .load-more-messages', this).length;
  if (!messages_visible && previous_messages_exist) {
    $('.load-more-messages', this)[0].click();
    $('.conversation .messages-list .loading-more-messages').hide();
  }
});

$(".messenger .col-sm-2 ul").on("click", "a", function() {
  var col_2_width = $('.messenger .col-sm-2').css('width');
  var window_width = '' + $('.messenger').width() + 'px';

  if (col_2_width == window_width) {
    $('body nav').hide();
    $('.messenger .col-sm-2').hide();
    $('.messenger .col-sm-10').show();
    $('body').css('margin', '0 0 0 0');
    $('.messenger').css('height', '100vh');
  }
});