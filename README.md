This is a clean rebuild on the Streetheart app.

Clear c8 start authorization c9


Users
* Genearl Users
* Artists
* Admins

Gallery for artist
* just a filtered index of users with an true 'Artist' boolean.



----------------------------------------> Carrierwave <----------------------------------------------------

Setting up AWS for Carrierwave

add the following gems
  `gem 'fog'`
and to your dev / test group:
  `gem 'dotenv-rails', :groups => [:development, :test]`

run `bundle`

create `.env` and `.env.example` files in the top level of your tree.

copy everything from your `.env` file into your `.evn.example` file, but delete all the secret values so that the file only has the keys/variables

.env.example:

```
S3_KEY=
S3_SECRET=
S3_BUCKET=''
```

inside config/initializers create a `carrierwave.rb` file in which you will add:

```
CarrierWave.configure do |config|
config.fog_credentials = {
  :provider               => 'AWS',
  :aws_access_key_id      => ENV['S3_KEY'],
  :aws_secret_access_key  => ENV['S3_SECRET'],
}
config.fog_directory  = ENV['S3_BUCKET']
end
```

inside your XXXX_uploader.rb file uncomment the `storage :fog` option

----------------------------------------> Carrierwave <----------------------------------------------------
