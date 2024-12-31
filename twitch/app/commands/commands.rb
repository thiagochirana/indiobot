class Commands
  def self.send_message(websocket, channel_name, message)
    websocket.send("PRIVMSG ##{channel_name} :#{message}")
  end
end