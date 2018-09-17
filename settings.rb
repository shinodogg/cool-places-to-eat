require 'dotenv'
require 'rubygems'
require 'algoliasearch'
require 'json'

Dotenv.load

Algolia.init(application_id: ENV['APPLICATION_ID'],
             api_key:        ENV['API_KEY'])

index = Algolia::Index.new('restaurants')
settings = JSON.pretty_generate(index.get_settings)

File.open("settings.json", "w") do |f| 
    f.puts(settings)
end
