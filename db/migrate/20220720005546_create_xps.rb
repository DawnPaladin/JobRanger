class CreateXps < ActiveRecord::Migration[7.0]
  def change
    create_table :xps do |t|
      t.string :name
      t.string :date
      t.integer :value

      t.timestamps
    end
  end
end
