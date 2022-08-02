class Xp < ApplicationRecord
	extend DateUtils
	validates :name, uniqueness: true, allow_nil: true

	before_save do
		if self.date != nil
			update_daily_xp(self.date)
			update_weekly_xp(self.date)
			update_high_score("daily_high_score")
			update_high_score("weekly_high_score")
		end
	end

	def self.this_week
		week_number = DateUtils.get_week_number(Date.today)
		record = Xp.find_by(name: week_number)
		if record.nil?
			record = Xp.create(name: week_number, is_weekly: true)
		end
		record
	end

	def weekly
		week_number = DateUtils.get_week_number(Date.today)
		Xp.find_by(name: week_number)
	end

	private

	def update_daily_xp(date)
		activities = Activity.where(date: date)
		loot = Loot.where(date: date)
		self.value = activities.sum(:xp) + loot.sum(:xp)
	end

	def update_weekly_xp(date)
		week_number = DateUtils.get_week_number(date)
		weekly_xp = Xp.find_or_create_by(name: week_number)
		weekly_xp.is_weekly = true

		surrounding_week = DateUtils.surrounding_week(date)
		activities = Activity.where(date: surrounding_week)
		loot = Loot.where(date: surrounding_week)
		weekly_xp.value = activities.sum(:xp) + loot.sum(:xp)

		weekly_xp.save
	end

	def update_high_score(record_name) # record_name should be daily_high_score or weekly_high_score
		record = Xp.find_by(name: record_name)
		current = record_name == "weekly_high_score" ? self.weekly : self
		if current.value > record.value
			record.value = current.value
			record.save
		end
	end
end
