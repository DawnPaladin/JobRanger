class Loot < ApplicationRecord

	before_create do
		self.date = Date.today unless self.date
	end

	after_create do |loot|
		update_xp(loot.date)
	end

	after_destroy do |loot|
		update_xp(loot.date)
	end

	def update_xp(date)
		date_record = Xp.find_or_create_by(date: date)
		date_record.save
	end

	def as_json options={}
		{
			rarity: rarity,
			xp: xp,
			date: date,
			id: id,
			note: note,
			description: description
		}
	end
	
end
