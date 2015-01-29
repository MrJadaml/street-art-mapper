ActiveRecord::Schema.define(version: 20150129155920) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "authentications", force: :cascade do |t|
    t.integer "user_id"
    t.string  "provider"
    t.string  "uid"
  end

  create_table "images", force: :cascade do |t|
    t.string   "source"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "mural_id"
  end

  create_table "murals", force: :cascade do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.float    "latitude"
    t.float    "longitude"
  end

  create_table "ownerships", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "mural_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.string   "avatar"
    t.string   "twitter"
    t.string   "instagram"
    t.boolean  "admin",           default: false, null: false
    t.boolean  "artist",          default: false, null: false
    t.string   "website"
    t.boolean  "artist_approval", default: false
  end

end
