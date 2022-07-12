import React from "react";
import PropTypes from 'prop-types';

import StatIcon from "./StatIcon";

const StatTriplet = props => {
	const { name, value } = props;
	return <div className="stat-triplet">
		<div className="name">{name}</div>
		<div className="value">{value}</div>
		<StatIcon stat={name} />
	</div>
}
StatTriplet.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.number.isRequired
}

export default StatTriplet;