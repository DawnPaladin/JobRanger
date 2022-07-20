class SetDefaultXpValueTo0 < ActiveRecord::Migration[7.0]
  def change
    change_column :xps, :value, :integer, default: 0
  end
end
