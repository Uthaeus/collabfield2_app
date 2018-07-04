module Private::ConversationsHelper
  include Shared::ConversationsHelper

  def unaccepted_contact_request_partial_path(contact)
    if unaccepted_contact_exists(contact)
      if request_sent_by_user(contact)
        "private/conversations/conversation/request_status/sent_by_current_user"
      else
        "private/conversations/conversation/request_status/sent_by_recipient"
      end
    else
      'shared/empty_partial'
    end
  end

  def not_contact_no_request_partial_path(contact)
    if recipient_is_contact? == false && unaccepted_contact_exists(contact) == false
      "private/conversations/conversation/request_status/send_request"
    else
      'shared/empty_partial'
    end
  end 

  def private_conv_recipient(conversation)
    conversation.opposed_user(current_user)
  end

  def get_contact_record(recipient)
    contact = Contact.find_by_users(current_user.id, recipient.id)
  end

  def conv_heading_class(contact)
    if unaccepted_contact_exists(contact)
      'conversation-heading-full'
    else
      'conversation-heading'
    end
  end

  def load_private_messages(conversation)
    if conversation.messages.count > 0
      'private/conversations/conversation/messages_list/link_to_previous_messages'
    else
      'shared/empty_partial'
    end
  end

  def add_to_contacts_partial_path(contact)
    if recipient_is_contact?
      'shared/empty_partial'
    else
      non_contact(contact)
    end
  end

  private 

    def request_sent_by_user(contact)
      contact['user_id'] == current_user.id 
    end

    def recipient_is_contact?
      contacts = current_user.all_active_contacts
      contacts.find { |contact| contact['id'] == @recipient.id }.present?
    end

    def non_contact(contact)
      if unaccepted_contact_exists(contact)
        'shared/empty_partial'
      else
        'private/conversations/conversation/heading/add_user_to_contacts'
      end
    end

    def unaccepted_contact_exists(contact)
      if contact.present?
        contact.accepted ? false : true
      else
        false
      end
    end
end
