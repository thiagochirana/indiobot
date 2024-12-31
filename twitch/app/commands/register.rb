# frozen_string_literal: true

class RegisterCommand
  def self.name
    'register'
  end

  def self.usage
    ['!register']
  end

  def self.description
    'register the user'
  end

  def self.execute(websocket, interaction, channel_name)
    websocket.send("PRIVMSG ##{channel_name} :Pong! @#{interaction[:sender]['login']}, your message has #{interaction[:message][:args].length} args")
  end
end