import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import ActivityButton from './ActivityButton';
import PointCounter from './PointCounter';
import StatTriplet from './StatTriplet';

import activitiesSlice, { addActivity } from './activitiesSlice';
import statsSlice, { statData } from './statsSlice';

const store = configureStore({
	reducer: {
		activities: activitiesSlice,
		stats: statsSlice,
	},
});	

const App = (props) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await window.fetch('/api/todays-activities');
				if (!response.ok) throw Error(response.statusText);
				const data = await response.json();
				data.forEach(activity => {
					store.dispatch(addActivity(activity.stat))
				})
			} catch (error) {
				setIsError(true);
				console.error(error);
			}

			setIsLoading(false);
		}

		fetchData();
	}, []);

	const activityButtons = statData.map((stat, index) => <ActivityButton statName={stat.name} activityName={stat.activity} color={stat.color} xp={stat.xp} isContinuous={stat.isContinuous} key={index} />);

	const statTriplets = statData.map((stat, index) => <StatTriplet name={stat.name} color={stat.color} value={10} key={index} />)

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
				{statTriplets}
				<div className="buttons column">
					<button>Response</button>
					<button>Undo</button>
				</div>
			</div>
		</main>
	</Provider>
}

export default App;
