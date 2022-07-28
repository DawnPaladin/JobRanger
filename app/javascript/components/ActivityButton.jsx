import React from "react";
import PropTypes from 'prop-types';

import StatIcon from "./StatIcon";
import { useGetActivitiesQuery, useCreateActivityMutation } from "./slices/apiSlice";

const ActivityButton = props => {
	const { statName, activityName, color, xp, isContinuous } = props;
	const { data: activities = [], isLoading, isSuccess, isError, error } = useGetActivitiesQuery();
	const [ createActivity ] = useCreateActivityMutation();

	const dailyCount = isLoading ? "..." : activities.filter(activity => activity.stat == statName).length;

	const activityPayload = { activity: { stat_name: statName, xp }}
	const onClick = async () => { await createActivity(activityPayload)}
	
	return <div className="activity-button">
		<button onClick={onClick}>
			<div className="stat-icon-pair">
				<StatIcon stat={statName} />
				<span style={{color}}>{statName}</span>
			</div>
			<div className="right-side">
				<div className="task-name">{activityName}</div>
				<div className="xp">{xp} XP</div>
			</div>
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