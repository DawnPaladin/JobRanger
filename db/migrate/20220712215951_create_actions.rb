class CreateActions < ActiveRecord::Migration[7.0]
  def change
    create_table :actions do |t|
      t.date :date
      t.string :name
      t.references :stat, null: false, foreign_key: true
      t.integer :xp

      t.timestamps
    end
  end
end
