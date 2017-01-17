class CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)
    @comment.movie = Movie.find(params[:movie_id])
    respond_to do |format|
      if @comment.save
        format.html { redirect_to :back, notice: 'comment was successfully created.' }
        format.json { render json: @comment}
      else
        format.html { render :new }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end
  def comment_params
    params.require(:comment).permit(:text,:movie_id)
  end

end
