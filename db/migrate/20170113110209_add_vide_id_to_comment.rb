class AddVideIdToComment < ActiveRecord::Migration[5.0]
  def change
    add_column :comments, :movie_id, :integer
  end
end
