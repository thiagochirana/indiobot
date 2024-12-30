require 'websocket-client-simple'

ws = WebSocket::Client::Simple.connect 'wss://irc-ws.chat.twitch.tv:443'

ws.on :open do
  puts 'Conectado!'
  ws.send "PASS oauth:seu_oauth_token"
  ws.send "NICK seu_bot"
  ws.send "JOIN #seu_canal"
end

ws.on :message do |msg|
  puts "Mensagem recebida: #{msg.data}"
end

ws.on :close do |e|
  puts "Conexão fechada: #{e}"
end

ws.on :error do |e|
  puts "Erro: #{e}"
end

# Mantém a conexão aberta
loop do
  sleep 1
end
