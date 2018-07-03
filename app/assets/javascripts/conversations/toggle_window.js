$(document).on('turbolinks:load', function() {
  $('body').on('click',
                '.conversation-heading', '.conversation-heading-full',
                function(e) {
    e.preventDefault();
    var panel = $(this).parent();
    var panel_body = panel.find('.panel-body');
    var messages_list = panel.find('.messages-list');

    panel_body.toggle(100, function() {
        var messages_visible = $('ul', this).has('li').length;

        if (!messages_visible && $('.load-more-messages', this).length) {
            $('.load-more-messages', this)[0].click();
        }
    });
  });
});