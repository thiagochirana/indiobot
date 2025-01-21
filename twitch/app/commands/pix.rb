# frozen_string_literal: true

require_relative 'commands'

class PixCommand < Commands
  def self.name
    'pix'
  end

  def self.usage
    ['!pix']
  end

  def self.description
    'Returns pong and args length'
  end

  def self.execute(websocket, interaction, channel_name)
    puts "Sending a response for !pix command"
    puts interaction[:sender]
    websocket.send("PRIVMSG ##{channel_name} : @#{interaction[:sender]['login']} streampix.devcurumin.com.br")
    puts "Message sended!"
  end
end