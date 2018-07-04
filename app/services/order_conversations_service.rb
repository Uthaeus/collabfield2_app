class OrderConversationsService

  def initialize(params)
    @user = params[:user]
  end

  def call
    all_private_conversations = Private::Conversation.all_by_user(@user.id).includes(:messages)
    all_group_conversations = @user.all_group_conversations.includes(:messages)
    all_conversations = all_private_conversations + all_group_conversations

    return all_conversations = all_private_conversations.sort { |a, b| b.messages.last.created_at <=> a.messages.last.created_at }
  end
end