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

        if (panel_body.css('display') == 'none') {
            panel.find('.add-people-to-chat,\
                        .add-user-to-contacts,\
                        .contact-request-sent').hide();
            conversation_heading = panel.find('.conversation-heading');
            conversation_heading.css('width', '360px');
        } else {
            conversation_heading = panel.find('.conversation-heading');
            conversation_heading.css('width', '320px');
            panel.find('.add-people-to-chat,\
                        .add-user-to-contacts,\
                        .contact-request-sent').show();
            
            $('form textarea', this).focus();
        }

        if (!messages_visible && $('.load-more-messages', this).length) {
            $('.load-more-messages', this)[0].click();
        }
    });
  });
  $('#conversations-menu').on('click', 'li', function(e) {
    var conv_id = $(this).attr('data-id');

    if ($(this).attr('data-type') == 'private') {
        var conv_type = '#pc';
    } else {
        var conv_type = '#gc';
    }
    var conversation_window = $(conv_type + conv_id);

    if (conversation_window.length) {
        if (conversation_window.find('.panel-body').css('display') == 'none') {
            conversation_window.find('.conversation-heading').click();
        }
        conversation_window.find('form textarea').click().focus();
    }
  });
});