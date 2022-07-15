import React from "react";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";

import StatIcon from "./StatIcon";
import activitiesSlice, { addActivity } from "./activitiesSlice";

const ActivityButton = props => {
	const { stat, taskName, dailyCount } = props;
	const selectActivities = state => state.activities;
	const activities = useSelector(selectActivities);
	const dispatch = useDispatch();
	
	return <div className="stat-clicker">
		<button onClick={() => dispatch(addActivity(stat))}>
			<div className="stat-icon-pair">
				<StatIcon stat={stat} />
				{stat}
			</div>
			<span className="task-name">{taskName}</span>
		</button>
		<span className="daily-count">{dailyCount}</span>
	</div>
}
ActivityButton.propTypes = {
	stat: PropTypes.string.isRequired,
	taskName: PropTypes.string.isRequired,
	dailyCount: PropTypes.number.isRequired
}

export default ActivityButton;