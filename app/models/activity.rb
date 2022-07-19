class Activity < ApplicationRecord
  belongs_to :stat

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
