require_relative 'twitch_model'

class User < TwitchModel
  enum :role, streamer: "streamer", mod: "mod", viewer: "viewer"

  validates :twitch_id, uniqueness: { message: 'já foi registrado!' }, allow_nil: true
  validates :twitch_nickname, uniqueness: { message: 'já foi registrado!' }, allow_nil: true
  validates :discord_id, uniqueness: { message: 'já foi registrado!' }, allow_nil: true
  validates :discord_nickname, uniqueness: { message: 'já foi registrado!' }, allow_nil: true
end
