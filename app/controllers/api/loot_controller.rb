class Api::LootController < ApplicationController
	before_action :set_loot, only: [:show, :update, :destroy]
	extend DateUtils

	def index
		@loots = Loot.all
		render json: @loots
	end

	def weekly_loot
		@weekly_loot = Loot.where(date: DateUtils.surrounding_week(Date.today)).order(:created_at)
		render json: @weekly_loot
	end

	def total_loot_counts

	end

	def show
		render json: @loot
	end

	def create
		@loot = Loot.new(loot_params)

		@loot.date = Date.today

		if @loot.save
			render json: @loot, status: :created
		else
			render json: @loot.errors, status: :unprocessable_entity
		end
	end

	def update
		if @loot.update(loot_params)
			render json: @loot, status: :ok
		else
			render json: @loot.errors, status: :unprocessable_entity
		end
	end

	def destroy
		@loot.destroy
	end

	private

	def set_loot
		@loot = Loot.find(params[:id])
	end

	def loot_params
		params.require(:loot).permit(
			:id,
			:rarity,
			:xp,
			:note,
			:description,
			:date
		)
	end

end
