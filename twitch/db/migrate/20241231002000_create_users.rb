require 'active_record'

class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :discord_id
      t.string :discord_nickname
      t.string :twitch_id
      t.string :twitch_nickname
      t.float :wallet_points
      t.string :role

      t.timestamps
    end
  end
end