class MakeXpNamesUnique < ActiveRecord::Migration[7.0]
  def change
    change_table :xps do |t|
      t.index :name, unique: true
    end
  end
end
