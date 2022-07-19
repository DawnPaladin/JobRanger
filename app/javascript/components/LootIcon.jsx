import React from "react";
import PropTypes from 'prop-types';

const StatIcon = props => {
	const rarity = props.rarity;
	return <img className={`loot-icon ${rarity}`} src={`img/icons/loot/${rarity}.svg`} alt={`${rarity} loot`} />
}
StatIcon.propTypes = {
	rarity: PropTypes.string.isRequired
}

export default StatIcon;