import React from "react";
import { useSelector } from 'react-redux';

import { lootTypes } from './slices/lootSlice';
import { useGetLootQuery } from "./slices/apiSlice";

import LootIcon from './LootIcon';
import LootButton from './LootButton';

const LootSection = () => {
	const { data: loot = [], isLoading, isFetching, isSuccess, isError, error} = useGetLootQuery();

	const weeklyLoot = loot.map((loot, index) => <LootIcon rarity={loot.rarity} key={index} />)

	const lootButtons = lootTypes.map((lootDatum, index) => {
		const { rarity, description, xp } = lootDatum;
		return <LootButton rarity={rarity} description={description} xp={xp} key={index} />
	});

	return <div className="loot">
		<header className='row'>
			<span>Loot this week</span>
			<button disabled>View hoard</button>
		</header>
		<div className="weekly-loot row">
			{weeklyLoot}
		</div>
		<div className="add-loot-buttons row">
			{lootButtons}
		</div>
	</div>
}

export default LootSection;