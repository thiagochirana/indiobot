# frozen_string_literal: true

require 'byebug'

require_relative 'commands'

class PingCommand < Commands
  def self.name
    'ping'
  end

  def self.usage
    ['!ping']
  end

  def self.description
    'Returns pong and args length'
  end

  def self.execute(websocket, interaction, channel_name)
    puts "Sending a response for !ping command"
    puts interaction[:sender]
    websocket.send("PRIVMSG ##{channel_name} :Pong! @#{interaction[:sender]['login']}, your message has #{interaction[:message][:args].length} args")
    puts "Message sended!"
  end
end