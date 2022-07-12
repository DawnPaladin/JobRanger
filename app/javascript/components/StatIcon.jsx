import React from "react";
import PropTypes from 'prop-types';

const StatIcon = props => {
	const stat = props.stat;
	return <img src={`img/icons/stats/${stat}.svg`} alt={`${stat} icon`} />
}
StatIcon.propTypes = {
	stat: PropTypes.string.isRequired
}

export default StatIcon;