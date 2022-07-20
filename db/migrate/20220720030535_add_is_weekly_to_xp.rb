class AddIsWeeklyToXp < ActiveRecord::Migration[7.0]
  def change
    add_column :xps, :is_weekly, :boolean, default: false
  end
end
