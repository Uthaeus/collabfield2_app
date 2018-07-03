function findConv(conversation_id, type) {
  var messenger_conversation = $('body .conversation');

  if (messenger_conversation.length) {
    return messenger_conversation;
  } else {
    var data_attr = "[data-" + type + "conversation-id='" + conversation_id + "']";
    var conversation = $('body').find(data_attr);
    return conversation 
  }
}

function ConvRendered(conversation_id, type) {
  if ($('body .conversation').length) {
    return true;
  } else {
    var data_attr = "[data-" + type + "conversation-id=" + conversation_id + "']";
    var conversation = $('body').find(data_attr);
    return conversation.is('visible');
  }
}

function ConvMessagesVisibility(conversation) {
  if ($('body .conversation').length) {
    return true;
  } else {
    var visibility = conversation.find('.panel-body').is(':visible');
    return visibility;
  }
}