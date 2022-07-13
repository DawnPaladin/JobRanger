class Activity < ApplicationRecord
  belongs_to :stat

  # inspired by https://web.archive.org/web/20140216210541/https://quickleft.com/blog/keeping-your-json-response-lean-in-rails/
  def as_json options={}
    {
      id: id,
      name: name,
      date: date,
      stat: stat.name
    }
  end
end
