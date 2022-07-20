class Api::XpController < ApplicationController

	def high_scores
		@high_scores = Xp.where(name: ['daily_high_score', 'weekly_high_score'])
		render json: @high_scores
	end

	def weekly_xp
		render json: Xp.this_week.value
	end

end
