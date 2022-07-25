class Activity < ApplicationRecord
  belongs_to :stat

  before_create do
		self.date = Date.today unless self.date
	end

  after_save do |activity|
    date_record = Xp.find_or_create_by(date: activity.date)
    date_record.save
  end

  # inspired by https://web.archive.org/web/20140216210541/https://quickleft.com/blog/keeping-your-json-response-lean-in-rails/
  def as_json options={}
    {
      stat: stat.name,
      xp: xp,
      name: name,
      id: id,
      date: date,
    }
  end
end
