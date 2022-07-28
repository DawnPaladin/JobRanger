class Api::StatController < ApplicationController

	def get_scores
		stats = {}
		Stat.all.each do |stat|
			stats[stat.name] = stat.get_score
		end
		render json: stats
	end
end