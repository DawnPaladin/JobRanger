import React from "react";
import PropTypes from 'prop-types';

import StatIcon from "./StatIcon";

const StatClicker = props => {
	const { stat, taskName, dailyCount } = props;
	return <div className="stat-clicker">
		<button>
			<div className="stat-icon-pair">
				<StatIcon stat={stat} />
				{stat}
			</div>
			<span className="task-name">{taskName}</span>
		</button>
		<span className="daily-count">{dailyCount}</span>
	</div>
}
StatClicker.propTypes = {
	stat: PropTypes.string.isRequired,
	taskName: PropTypes.string.isRequired,
	dailyCount: PropTypes.number.isRequired
}

export default StatClicker;