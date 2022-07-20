class Api::XpController < ApplicationController

	def high_scores
		@high_scores = Xp.where(name: ['daily_high_score', 'weekly_high_score'])
		render json: @high_scores
	end

end
