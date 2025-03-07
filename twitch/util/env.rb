require 'dotenv'
Dotenv.load

module Env
  TWITCH_BOT_USERNAME = ENV['TWITCH_BOT_USERNAME']
  TWITCH_BOT_CLIENT_ID = ENV['TWITCH_BOT_CLIENT_ID']
  TWITCH_BOT_SECRET = ENV['TWITCH_BOT_SECRET']
  TWITCH_BOT_OAUTH = ENV['TWITCH_BOT_OAUTH']
  TWITCH_BOT_CHANNEL = ENV['TWITCH_BOT_CHANNEL']
  TWITCH_CHANNEL_LIVE_NOTIFICATION = ENV['TWITCH_CHANNEL_LIVE_NOTIFICATION']
  TWITCH_BOT_BACKEND_URL = ENV['TWITCH_BOT_BACKEND_URL']
  CRON_EXPRESSION = ENV['CRON_EXPRESSION']

  DB_NAME = ENV['DB_NAME']
  DB_PATH = ENV['DB_PATH']
end