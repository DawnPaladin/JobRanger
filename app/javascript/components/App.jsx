import React, { useState, useEffect } from 'react';
import axios from 'axios';

import store from './store';

import ActivityButton from './ActivityButton';
import PointCounter from './PointCounter';
import StatTriplet from './StatTriplet';
import LootSection from './LootSection';

import { statData } from './slices/statsSlice';

const App = (props) => {
	const [todaysXP, setTodaysXP] = useState(0);
	const [thisWeeksXp, setThisWeeksXP] = useState(0);
	const [dailyHighScore, setDailyHighScore] = useState(0);
	const [weeklyHighScore, setWeeklyHighScore] = useState(0);

	const activityButtons = statData.map((stat, index) => <ActivityButton statName={stat.name} activityName={stat.activity} color={stat.color} xp={stat.xp} isContinuous={stat.isContinuous} key={index} />);

	const statTriplets = statData.map((stat, index) => <StatTriplet name={stat.name} color={stat.color} value={10} key={index} />)

	const getTodaysXP = () => {
		var totalXP = 0;
		totalXP = store.getState().activities.reduce(
			(prev, current) => prev + current.xp,
			0
		);
		setTodaysXP(totalXP);
	}
	store.subscribe(getTodaysXP)

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
			<PointCounter name="Today's XP:" points={todaysXP} highScore={dailyHighScore}/>
			<PointCounter name="XP this week:" points={thisWeeksXp} highScore={weeklyHighScore}/>
		</div>
		<LootSection/>
		<div className="last row">
			{statTriplets}
			<div className="buttons column">
				<button disabled>Undo</button>
				<button disabled>Settings</button>
			</div>
		</div>
	</main>
}

export default App;
