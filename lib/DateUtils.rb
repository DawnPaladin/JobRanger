module DateUtils
	def self.get_week_number(date)
		date = Date.parse(date) if date.is_a? String
		date.strftime('%Y-W%V') # example: 2022-W29
	end
	def self.surrounding_week(date)
		date = Date.parse(date) if date.is_a? String
		start_of_week = Date.parse(get_week_number(date))
		start_of_week..start_of_week + 6
	end
end
