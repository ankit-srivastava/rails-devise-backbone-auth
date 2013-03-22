class User 
  include Mongoid::Document
  include Mongoid::Timestamps	

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :token_authenticatable, :omniauthable

  attr_accessible :email, :password, :password_confirmation, :remember_me, :encrypted_password, :name, :provider, :uid, :role

  # has_many :collaborations
  # has_many :repositories, :through => :collaborations

   ## Database Authenticatable
  field :name,              type: String, default: ''
  field :role,              type: String, default: ''
  field :encrypted_password,    type: String

  # OmniAuth
  field :provider,    type: String
  field :uid,    type: String

  ## Recoverable
  field :reset_password_token,   type: String
  field :reset_password_sent_at, type: Time

  ## Rememberable
  field :remember_created_at, type: Time

  ## Trackable
  field :sign_in_count,      type:Integer, default: 0
  field :current_sign_in_at, type: Time
  field :last_sign_in_at,    type: Time
  field :current_sign_in_ip, type: String
  field :last_sign_in_ip,    type: String


  def self.find_for_facebook_oauth(auth, signed_in_resource=nil)
    user = User.where(:provider => auth.provider, :uid => auth.uid).first
    unless user
      user = User.create(name:auth.extra.raw_info.name,
                           provider:auth.provider,
                           uid:auth.uid,
                           email:auth.info.email,
                           password:Devise.friendly_token[0,20]
                           )
    end
    user
  end

  

end