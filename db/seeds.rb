p "Delete stats"
Stat.destroy_all

p "Create stats"
Stat.create(name: "STR")

p "Done"