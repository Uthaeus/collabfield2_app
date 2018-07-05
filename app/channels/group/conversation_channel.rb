class Group::ConversationChannel < ApplicationCable::Channel
  def subscribed
    if belongs_to_conversation(params[:id])
      stram_from "group_conversation_#{params[:id]}"
    end
  end

  def unsubscribed
    stop_all_streams
  end

  def set_as_seen(data)
    conversation = Group::Conversation.find(data['conv_id'])
    last_message = conversation.messages.last 
    last_message.seen_by << current_user.id 
    last_message.save
  end

  def send_message(data)
    message_params = data['message'].each_with_object({}) do |el, hash|
      hash[el['name']] = el['value']
    end

    message = Group::Message.new(message_params)
    if message.save
      previous_message = message.previous_message
      Group::MessageBroadcastJob.preform_later(message, previous_message, current_user)
    end
  end

  private

    def belongs_to_conversation(id)
      conversations = current_user.group_conversations.ids
      conversations.include?(id)
    end
end
