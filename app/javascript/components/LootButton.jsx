import React from "react";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";

import LootIcon from './LootIcon';

const LootButton = props => {
	const { rarity, description, xp } = props;
	return <button className="loot-button">
		<LootIcon rarity={rarity} />
		<div className="right-side">
			<div className="description">{description}</div>
			<div className="xp">{xp} XP</div>
		</div>
	</button>
}

LootButton.propTypes = {
	rarity: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	xp: PropTypes.number.isRequired,
}

export default LootButton