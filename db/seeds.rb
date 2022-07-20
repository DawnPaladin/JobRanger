p "Delete stats"
Stat.destroy_all

p "Create stats"
Stat.create(name: "STR")
Stat.create(name: "CON")
Stat.create(name: "WIS")
Stat.create(name: "DEX")
Stat.create(name: "INT")
Stat.create(name: "CHA")

p "Delete XP records"
Xp.destroy_all

p "Create XP records"
Xp.create(name: "daily_high_score", value: 0)
Xp.create(name: "weekly_high_score", value: 0)

p "Done"