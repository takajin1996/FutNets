class AddMovieTimeToComment < ActiveRecord::Migration[5.0]
  def change
    add_column :comments, :time, :string
  end
end
