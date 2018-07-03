App.private_conversation = App.cable.subscriptions.create("Private::ConversationChannel", {

  connected: function() {},
  disconnected: function() {},
  received: function(data) {
    var conversation_menu_link = $('#conversations-menu ul').find('#menu-pc' + data['conversation_id']);

    if (conversation_menu_link.length) {
      conversation_menu_link.prependTo('#conversations-menu ul');
    }

    var conversation = findConv(data['conversation_id'], 'p');
    var conversation_rendered = ConvRendered(data['conversation_id'], 'p');
    var messages_visible = ConvMessagesVisibility(conversation);

    if (data['recipient'] == true) {
      $('#menu-pc' + data['conversation_id']).addClass('unseen-conv');

      if (conversation_rendered) {
        if (!messages_visible) {

        }
        conversation.find('.messages-list').find('ul').append(data['message']);
      }
      calculateUnseenConversations();
    } else {
      conversation.find('ul').append(data['message']);
    }

    if (conversation.length) {
      var messages_list = conversation.find('.messages-list');
      var height = messages_list[0].scrollHeight;
      messages_list.scrollTop(height);
    }
  }, 

  send_message: function(message) {
    return this.perform('send_message', {
      message: message 
    });
  }

});

$(document).on('submit', '.send-private-message', function(e) {
  e.preventDefault();
  var values = $(this).serializeArray();
  App.private_conversation.send_message(values);
  $(this).trigger('reset');
});
