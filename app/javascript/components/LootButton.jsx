import React from "react";
import PropTypes from 'prop-types';

import { useCreateLootMutation } from "./slices/apiSlice";
import LootIcon from './LootIcon';

const LootButton = props => {
	const { rarity, description, xp, isFetching } = props;
	const [ createLoot ] = useCreateLootMutation();
	const onClick = async () => { await createLoot({ rarity, description, xp}) }

	return <button className="loot-button" onClick={onClick}>
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