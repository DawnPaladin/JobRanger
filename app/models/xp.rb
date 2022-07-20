class Xp < ApplicationRecord

	before_save do
		if self.date != nil
			update_daily_xp
			update_weekly_xp
			update_high_score("daily_high_score")
			update_high_score("weekly_high_score")
		end
	end

	def self.get_week_number(dateString)
		Date.parse(dateString).strftime('%Y-W%V') # example: 2022-W29
	end

	def self.this_week
		Xp.find_by(name: Xp.get_week_number(Date.today.to_s))
	end

	private

	def update_daily_xp
		activities = Activity.where(date: self.date)
		self.value = activities.sum(:xp)
	end

	def update_weekly_xp
		week_number = Xp.get_week_number(self.date)
		weekly_xp = Xp.find_or_create_by(name: week_number)
		weekly_xp.is_weekly = true

		start_of_week = Date.parse(week_number)
		activities = Activity.where(date: start_of_week..start_of_week + 6)
		weekly_xp.value = activities.sum(:xp)

		weekly_xp.save
	end

	def update_high_score(record_name) # record_name should be daily_high_score or weekly_high_score
		record = Xp.find_by(name: record_name)
		if self.value > record.value
			record.value = self.value
			record.save
		end
	end
end
