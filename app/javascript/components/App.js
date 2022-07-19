import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import ActivityButton from './ActivityButton';
import PointCounter from './PointCounter';
import StatTriplet from './StatTriplet';
import LootIcon from './LootIcon';

import activitiesSlice, { addActivity } from './slices/activitiesSlice';
import statsSlice, { statData } from './slices/statsSlice';
import networkSlice, { doneLoading, throwError } from './slices/networkSlice';

const store = configureStore({
	reducer: {
		activities: activitiesSlice,
		stats: statsSlice,
		network: networkSlice,
	},
});

const fetchData = async () => {
	try {
		const response = await window.fetch('/api/todays-activities');
		if (!response.ok) {
			console.log(response)
			store.dispatch(throwError(response.statusText));
		}
		const data = await response.json();
		data.forEach(activity => {
			store.dispatch(addActivity(activity))
		})
		store.dispatch(doneLoading());
	} catch (error) {
		store.dispatch(throwError(error));
		console.error(error);
	}
}
fetchData();

const App = (props) => {
	const [todaysXP, setTodaysXP] = useState(0);

	const activityButtons = statData.map((stat, index) => <ActivityButton statName={stat.name} activityName={stat.activity} color={stat.color} xp={stat.xp} isContinuous={stat.isContinuous} key={index} />);

	const statTriplets = statData.map((stat, index) => <StatTriplet name={stat.name} color={stat.color} value={10} key={index} />)

	const weeklyLoot = [
		<LootIcon rarity='common' />,
		<LootIcon rarity='common' />,
		<LootIcon rarity='common' />,
		<LootIcon rarity='common' />,
		<LootIcon rarity='common' />,
		<LootIcon rarity='common' />,
		<LootIcon rarity='common' />,
		<LootIcon rarity='common' />,
		<LootIcon rarity='rare' />,
		<LootIcon rarity='rare' />,
		<LootIcon rarity='rare' />,
		<LootIcon rarity='rare' />,
		<LootIcon rarity='rare' />,
		<LootIcon rarity='rare' />,
		<LootIcon rarity='rare' />,
		<LootIcon rarity='rare' />,
		<LootIcon rarity='rare' />,
		<LootIcon rarity='rare' />,
		<LootIcon rarity='epic' />,
		<LootIcon rarity='legendary' />,
	]

	const getTodaysXP = () => {
		var totalXP = 0;
		totalXP = store.getState().activities.reduce(
			(prev, current) => prev + current.xp,
			0
		);
		setTodaysXP(totalXP);
	}
	store.subscribe(getTodaysXP)

	return <Provider store={store}>
		<main>
			{store.getState().network.isError && <div className='error-message'>Error: {store.getState().network.errorMessage}</div> }

			<div className="activity-buttons">
				{activityButtons}
			</div>
			<div className="point-counters">
				<PointCounter name="Today's XP:" points={todaysXP} highScore={0}/>
				<PointCounter name="XP this week:" points={0} highScore={0}/>
			</div>
			<div className="loot">
				<header className='row'>
					<span>Loot this week</span>
					<button disabled>View hoard</button>
				</header>
				<div className="weekly-loot row">
					{weeklyLoot}
					<button disabled id="add-loot-button">+ Add loot</button>
				</div>
			</div>
			<div className="last row">
				{statTriplets}
				<div className="buttons column">
					<button disabled>Undo</button>
				</div>
			</div>
		</main>
	</Provider>
}

export default App;
