class Api::ActivitiesController < ApplicationController
	before_action :set_activity, only: [:show, :update, :destroy]

	def index
		@activities = Activity.all
		render json: @activities
	end

	def show
		render json: @activity
	end

	def create
		@activity = Activity.new(activity_params)

		# assign stat
		if activity_params.has_key?(:stat_name)
			stat = Stat.find_by_name(@activity.stat_name)
			@activity.stat_id = stat.id
		end

		if @activity.save
			render json: @activity, status: :created
		else
			render json: @activity.errors,
			status: :unprocessable_entity
		end
	end

	def update
		if @activity.update(activity_params)
			render json: @activity, status: :ok
		else
			render json: @activity.errors,
			status: :unprocessable_entity
		end
	end

	def destroy
		@activity.destroy
	end

	private

	def set_activity
		@activity = Activity.find(params[:id])
	end

	def activity_params
		params.require(:activity).permit(
			:id,
			:name,
			:date,
			:xp,
			:stat_name,
			:stat_id,
			:created_at,
			:updated_at
		)
	end
end