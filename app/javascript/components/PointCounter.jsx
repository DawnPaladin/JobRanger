import React from "react";
import PropTypes from 'prop-types';

const PointCounter = props => {
	const { name, points, highScore } = props;
	return <div className="point-counter">
		<div className="name">{name}</div>
		<div className="points">{points}</div>
		<div className="high-score">High score: {highScore}</div>
	</div>
}
PointCounter.propTypes = {
	name: PropTypes.string.isRequired,
	points: PropTypes.number,
	highScore: PropTypes.number.isRequired
}

export default PointCounter;