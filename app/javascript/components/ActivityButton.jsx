import React from "react";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";

import StatIcon from "./StatIcon";
import { addActivity } from "./slices/activitiesSlice";
import { getStatData } from "./slices/statsSlice";

const ActivityButton = props => {
	const { statName, activityName, color, xp, isContinuous } = props;
	const activities = useSelector(state => state.activities);
	const dispatch = useDispatch();

	const dailyCount = activities.filter(activity => activity.stat == statName).length;

	const saveActivity = async statName => {
		const statData = getStatData(statName);
		const newActivity = {
			activity: {
				name: statData.activity,
				stat_name: statName,
				xp: statData.xp,
			}
		}
		const csrfToken = document.querySelector('[name=csrf-token]').content;
		try {
			const response = await window.fetch('/api/activities', {
				method: 'POST',
				body: JSON.stringify(newActivity),
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'X-CSRF-TOKEN': csrfToken,
				}
			});
			if (!response.ok) throw Error(response.statusText);

			const savedActivity = await response.json();
		} catch (error) {
			console.error(error);
		}
	}
	
	return <div className="activity-button">
		<button onClick={() => {
			dispatch(addActivity(statName));
			saveActivity(statName);
		}}>
			<div className="stat-icon-pair">
				<StatIcon stat={statName} />
				<span style={{color}}>{statName}</span>
			</div>
			<span className="task-name">{activityName}</span>
		</button>
		<span className="daily-count">{dailyCount}</span>
	</div>
}
ActivityButton.propTypes = {
	statName: PropTypes.string.isRequired,
	activityName: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
	xp: PropTypes.number.isRequired,
	isContinuous: PropTypes.bool,
}

export default ActivityButton;