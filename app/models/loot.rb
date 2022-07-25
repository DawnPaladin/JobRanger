class Loot < ApplicationRecord

	before_create do
		self.date = Date.today unless self.date
	end

	after_create do |loot|
		date_record = Xp.find_or_create_by(date: loot.date)
		date_record.save
	  end
	
end
