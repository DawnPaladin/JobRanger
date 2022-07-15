import React from "react";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";

import StatIcon from "./StatIcon";
import activitiesSlice, { addActivity } from "./activitiesSlice";

const ActivityButton = props => {
	const { statName, activityName, color, xp, isContinuous } = props;
	const activities = useSelector(state => state.activities);
	const dispatch = useDispatch();

	const dailyCount = activities.filter(activity => activity.stat == statName).length;
	
	return <div className="stat-clicker">
		<button onClick={() => dispatch(addActivity(statName))}>
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
	isContinuous: PropTypes.boolean
}

export default ActivityButton;