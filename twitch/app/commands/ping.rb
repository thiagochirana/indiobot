# frozen_string_literal: true

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
    websocket.send("PRIVMSG ##{channel_name} :Pong! @#{interaction[:sender]['login']}")
    puts "Message sended!"
  end
end