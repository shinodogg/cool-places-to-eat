require 'json'
require 'csv'

restaurants_list = open('dataset/restaurants_list.json') do |io|
    JSON.load(io)
end
restaurants_info = CSV.read('dataset/restaurants_info.csv', headers: true, col_sep: ";")

restaurant_array = []

restaurants_list.each do |restaurant|
    list_objectID = restaurant['objectID'].to_s

    payment_options = []
    restaurant['payment_options'].each do |payment|
        case payment
        # we should only have: AMEX/American Express, Visa, Discover, and MasterCard
        when "AMEX", "Visa", "Discover", "MasterCard"
            payment_options.push(payment)
        # Diners Club and Carte Blanche are Discover cards
        when "Diners Club", "Carte Blanche"
            payment_options.push("Discover")
        else
            puts payment # JCB, Pay with OpenTable, Cash Only,,,
        end
    end
    # Discover should be shown only once
    restaurant['payment_options'] = payment_options.uniq

    restaurants_info.each do |info|
        info_objectID = info['objectID'].to_s
        if list_objectID == info_objectID then
            restaurant["food_type"] = info['food_type']
            restaurant["stars_count"] = info['stars_count']
            restaurant["reviews_count"] = info['reviews_count']
            restaurant["neighborhood"] = info['neighborhood']
            restaurant["phone_number"] = info['phone_number']
            restaurant["price_range"] = info['price_range']
            restaurant["dining_style"] = info['dining_style']
            restaurant_array.push(restaurant)
            break
        end
    end    
end

open('dataset/restaurants_data.json', 'w') do |io|
    JSON.dump(restaurant_array, io)
end
