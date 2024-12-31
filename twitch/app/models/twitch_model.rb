require 'active_record'
require_relative 'database'

class TwitchModel < ActiveRecord::Base
  self.abstract_class = true
end
