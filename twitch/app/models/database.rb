require 'active_record'
require_relative '../../util/env'  # Caso use esse arquivo para carregar variáveis de ambiente
include Env

# Configuração da conexão com o banco de dados
ActiveRecord::Base.establish_connection(
  adapter: 'sqlite3',               # Ou o adaptador que você estiver usando
  database: "#{DB_PATH}/#{DB_NAME}",  # Caminho do banco de dados
  pool: 5,                          # Tamanho do pool de conexões
  timeout: 5000                      # Timeout da conexão
)
