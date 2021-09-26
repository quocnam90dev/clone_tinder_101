class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  def like
    p '[bug]..............'
    p 'like'
    p '.............. [bug]'
  end

  def pass
    p '[bug]..............'
    p 'Pass'
    p '.............. [bug]'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:first_name, :last_name, :description, :image_url)
    end
end
