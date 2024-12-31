require 'active_record'
require 'sqlite3'
require_relative '../util/env'
include Env

ActiveRecord::Base.establish_connection(
  adapter: 'sqlite3',         # Alterado para SQLite
  database: DB_PATH,          # Caminho do arquivo do banco de dados
  pool: 5,                    # Tamanho do pool de conexões (opcional)
  timeout: 5000               # Timeout em milissegundos (opcional)
)
