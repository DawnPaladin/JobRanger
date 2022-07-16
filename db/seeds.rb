p "Delete stats"
Stat.destroy_all

p "Create stats"
Stat.create(name: "STR")
Stat.create(name: "CON")
Stat.create(name: "WIS")
Stat.create(name: "DEX")
Stat.create(name: "INT")
Stat.create(name: "CHA")

p "Done"