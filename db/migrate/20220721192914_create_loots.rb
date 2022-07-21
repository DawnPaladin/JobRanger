class CreateLoots < ActiveRecord::Migration[7.0]
  def change
    create_table :loots do |t|
      t.string :rarity
      t.integer :xp, default: 0
      t.text :note
      t.string :description
      t.date :date, default: -> { 'CURRENT_DATE' }

      t.timestamps
    end
  end
end
