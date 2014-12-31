Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter, ENV['TWITTER_KEY'], ENV['TWITTER_SECRET']
  provider :instagram, ENV['INSTAGRAM_ID'], ENV['INSTAGRAM_SECRET']
end
