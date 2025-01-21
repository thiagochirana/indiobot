# frozen_string_literal: true

require 'websocket-client-simple'
require 'event_emitter'
require 'faraday'
require 'json'
require 'colorize'
require 'byebug'

require_relative 'app/commands/ping'
require_relative 'app/commands/register'
require_relative 'app/commands/pix'
require_relative 'util/env'

include Env

TWITCH_IRC_URL = 'wss://irc-ws.chat.twitch.tv:443'
$username = TWITCH_BOT_USERNAME
$oauth_token = TWITCH_BOT_OAUTH
$channel_name = TWITCH_BOT_CHANNEL
$client_id = TWITCH_BOT_CLIENT_ID

# Adicione comandos aqui
$loaded_commands = [
  PingCommand,
  RegisterCommand,
  PixCommand
]

puts "Comandos carregados: #{$loaded_commands.map(&:name).join(', ')}".green

websocket = nil

# Função para se conectar ao WebSocket da Twitch
def connect_to_twitch
  websocket = WebSocket::Client::Simple.connect(TWITCH_IRC_URL)

  websocket.on :open do
    puts "Conectando à Twitch IRC...".cyan
    websocket.send("PASS oauth:#{$oauth_token}")
    websocket.send("NICK #{$username}")
    websocket.send("JOIN ##{$channel_name}")
    puts "Conectado à Twitch!".green
  end

  websocket.on :message do |msg|
    handle_message(websocket, msg.data)
  end

  websocket.on :close do |e|
    puts "Conexão fechada: #{e}"
    handle_disconnect(websocket, e)
  end

  websocket.on :error do |e|
    puts "Erro na conexão: #{e}"
    # send a log to discord here!
    handle_message(websocket, e.message)
  end
end

def handle_message(ws, data)
  if data.start_with?('PING')
    ws.send(data.gsub('PING', 'PONG'))
  elsif data.include?('Welcome') && !data.include?('PRIVMSG')
    puts "Bot autenticado!".green
  elsif data.include?('PRIVMSG')
    parsed_message = parse_message(data)
    process_command(ws, parsed_message) if parsed_message
  else
    puts "Mensagem não tratada recebida: #{data}".yellow
  end
end

# Função para tratar desconexão
def handle_disconnect(ws, e)
  puts "Desconectado da Twitch: #{e}".red
  ws.close if ws
end

# Função para analisar a mensagem e executar o comando
def parse_message(message)
  regex = /:(\w+)!(\w+)@(\w+)\.tmi\.twitch\.tv PRIVMSG #(\w+) :(.+)/
  match = message.match(regex)
  return nil unless match

  { username: match[1], message: match[5] }
end

# Função para processar o comando
def process_command(ws, parsed_message)
  $loaded_commands.each do |com|
    com.usage.each do |usage|
      if parsed_message[:message].downcase.start_with?(usage)
        user_info = get_user_info(parsed_message[:username])
        interaction = { sender: user_info[0], message: { content: parsed_message[:message], args: parsed_message[:message].split(' ') } }
        com.execute(ws, interaction, $channel_name)
      end
    end
  end
end

# Função para obter informações do usuário
def get_user_info(username)
  response = Faraday.get('https://api.twitch.tv/helix/users', { login: username }, {
    'Authorization' => "Bearer #{$oauth_token}",
    'Client-ID' => $client_id
  })

  raise "Failed to get user info: #{response.body}".red unless response.success?

  data = JSON.parse(response.body)
  data['data']
end

# Função para enviar mensagens para o chat
def send_message(ws, content)
  raise 'Cannot send a message while not connected'.yellow unless ws

  ws.send("PRIVMSG ##{$channel_name} :#{content}")
end

# Conectando ao WebSocket
connect_to_twitch

# Aguarda por entradas do WebSocket
loop do
  sleep(1)
end
