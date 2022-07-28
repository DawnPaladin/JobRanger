class Stat < ApplicationRecord
	has_many :activities
	def get_score
		self.activities.count / 10
	end
end
