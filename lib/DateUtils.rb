module DateUtils
	def self.get_week_number(date)
		date = Date.parse(date) if date.is_a? String
		date.strftime('%Y-W%V')
	end
	def self.surrounding_week(date)
		date = Date.parse(date) if date.is_a? String
		start_of_week = Date.parse(get_week_number(date))
		date..date + 6
	end
end