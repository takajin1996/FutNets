json.extract! movie, :id, :url, :created_at, :updated_at
json.url movie_url(movie, format: :json)