import React, { useState, useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import ActivityButton from './ActivityButton';
import PointCounter from './PointCounter';
import StatTriplet from './StatTriplet';

import activitiesSlice from './activitiesSlice';
import statsSlice from './statsSlice';

const store = configureStore({
	reducer: {
		activities: activitiesSlice,
		stats: statsSlice,
	}
});

const App = (props) => {
	const [activities, setActivities] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	
	const stats = store.getState().stats;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await window.fetch('/api/todays-activities');
				if (!response.ok) throw Error(response.statusText);
				const data = await response.json();
				setActivities(data);
			} catch (error) {
				setIsError(true);
				console.error(error);
			}

			setIsLoading(false);
		}

		fetchData();
	}, []);

	const countActivitiesToday = statName => {
		const activitiesMatchingStat = activities.filter(activity => activity.stat == statName);
		return activitiesMatchingStat.length;
	}

	const activityButtons = stats.map((stat, index) => <ActivityButton stat={stat.name} taskName={stat.activity} dailyCount={countActivitiesToday(stat.name)} key={index} />);

	return <Provider store={store}>
		<main>
			{isError && <div className='error-message'>Something went wrong. Check the console.</div> }

			<div className="activity-buttons">
				{activityButtons}
			</div>
			<div className="point-counters">
				<PointCounter name="Today's points:" points={100} highScore={100}/>
				<PointCounter name="Week points:" points={100} highScore={100}/>
			</div>
			<div className="last row">
				<StatTriplet name="STR" value={10} />
				<StatTriplet name="DEX" value={10} />
				<StatTriplet name="CON" value={10} />
				<StatTriplet name="INT" value={10} />
				<StatTriplet name="WIS" value={10} />
				<StatTriplet name="CHA" value={10} />
				<div className="buttons column">
					<button>Response</button>
					<button>Undo</button>
				</div>
			</div>
		</main>
	</Provider>
}

export default App;
