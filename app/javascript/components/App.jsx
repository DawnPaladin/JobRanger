import React, { useState, useEffect } from 'react';
import axios from 'axios';

import store from './store';

import ActivityButton from './ActivityButton';
import PointCounter from './PointCounter';
import StatTriplet from './StatTriplet';
import LootSection from './LootSection';

import { statData } from './slices/statsSlice';
import { 
	useGetActivitiesQuery,
	useGetLootQuery,
	useGetStatsQuery 
} from './slices/apiSlice';

const App = (props) => {
	const [thisWeeksXp, setThisWeeksXP] = useState(0);
	const [dailyHighScore, setDailyHighScore] = useState(0);
	const [weeklyHighScore, setWeeklyHighScore] = useState(0);

	const { data: activities = [], isSuccess: activitiesLoaded } = useGetActivitiesQuery();
	const { data: loot = [], isSuccess: lootLoaded } = useGetLootQuery();
	const { data: stats = {}, isSuccess: statsLoaded } = useGetStatsQuery();

	const activityButtons = statData.map((stat, index) => <ActivityButton statName={stat.name} activityName={stat.activity} color={stat.color} xp={stat.xp} isContinuous={stat.isContinuous} key={index} />);

	const statTriplets = statData.map((stat, index) => <StatTriplet name={stat.name} color={stat.color} value={statsLoaded ? stats[stat.name] : "..."} key={index} />)

	const getTodaysXP = () => {
		const today = new Date().toISOString().slice(0, 10);
		const activitiesXP = activities.reduce((prev, current) => prev + current.xp, 0);
		const lootXP = loot
			.filter(loot => loot.date == today)
			.reduce((prev, current) => prev + current.xp, 0)
		;
		const totalXP = activitiesXP + lootXP;
		return (activitiesLoaded && lootLoaded ? totalXP : null);
	}

	useEffect(() => {
		axios.get('/api/high-scores')
		.then(res => {
			try { // catch error if these haven't been seeded
				const dailyHighScore = res.data.filter(item => item.name == "daily_high_score")[0].value;
				const weeklyHighScore = res.data.filter(item => item.name == "weekly_high_score")[0].value;
				setDailyHighScore(dailyHighScore);
				setWeeklyHighScore(weeklyHighScore);
			} catch (error) {
				console.warn(error);
			}
		})
	})

	useEffect(() => {
		axios.get('/api/weekly-xp')
		.then(res => { setThisWeeksXP(res.data) })
	})

	return <main>
		{store.getState().network.isError && <div className='error-message'>Error: {store.getState().network.errorMessage}</div> }

		<div className="activity-buttons">
			{activityButtons}
		</div>
		<div className="point-counters">
			<PointCounter name="Today's XP:" points={getTodaysXP()} highScore={dailyHighScore}/>
			<PointCounter name="XP this week:" points={thisWeeksXp} highScore={weeklyHighScore}/>
		</div>
		<LootSection/>
		<div className="last row">
			{statTriplets}
		</div>
	</main>
}

export default App;
