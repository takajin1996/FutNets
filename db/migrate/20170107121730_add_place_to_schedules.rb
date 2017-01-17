class AddPlaceToSchedules < ActiveRecord::Migration[5.0]
  def change
    add_column :schedules, :place, :string
    add_column :schedules, :what, :string
  end
end
