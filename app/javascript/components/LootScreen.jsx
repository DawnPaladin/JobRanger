import React, { useEffect, useState } from "react";
import axios from "axios";

import LootButton from './LootButton'

import { lootData } from './slices/lootSlice';

const LootScreen = props => {
	const [earnedLoot, setEarnedLoot] = useState([]);
	useEffect(() => {
		axios.get('/api/loot.json')
			.then(res => {
				setEarnedLoot(res.data);
			})
		;
	})

	const lootButtons = lootData.map((lootDatum, index) => {
		const { rarity, description, xp } = lootDatum;
		return <LootButton rarity={rarity} description={description} xp={xp} key={index} />
	})	

	const lootRows = lootButtons.map((lootButton, index) => {
		return <tr key={index}>
			<td>{lootButton}</td>
			<td>{earnedLoot[index] || null}</td>
		</tr>
	})

	const closeLootScreen = () => {
		const lootScreen = document.getElementById('loot-screen');
		lootScreen.close();
	}

	return <dialog id="loot-screen">
		<h1>Add Loot</h1>
		<table className="loot-table">
			<thead>
				<tr>
					<th></th>
					<th>Earned</th>
				</tr>
			</thead>
			<tbody>
				{lootRows}
			</tbody>
		</table>
		<button id="close-loot-screen-button" className="doesnt-look-like-a-button" onClick={closeLootScreen}>X</button>
	</dialog>
}

export default LootScreen;