# frozen_string_literal: true
require_relative '../models/user'
require_relative 'commands'

class RegisterCommand < Commands
  def self.name
    'register'
  end

  def self.usage
    ['!register']
  end

  def self.description
    'register the user'
  end

  def self.execute(websocket, user_interactor, channel_name)
    us = User.create!(twitch_id: user_interactor[:sender]['id'], twitch_nickname: user_interactor[:sender]['login'])
    websocket.send("PRIVMSG ##{channel_name} :@#{user_interactor[:sender]['login']} Você foi registrado com o id #{us.id}")
  end
end