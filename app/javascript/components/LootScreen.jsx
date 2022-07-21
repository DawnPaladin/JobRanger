import React, { useEffect, useState } from "react";
import axios from "axios";

import ReactModal from "react-modal";

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
	}, []);

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
		props.setVisible(false);
	}

	ReactModal.setAppElement('#root');

	return <ReactModal isOpen={props.isOpen} shouldCloseOnEsc={true} shouldCloseOnOverlayClick={true} onRequestClose={closeLootScreen} id="loot-screen" contentLabel="Add Loot screen">
		<h2>Add Loot</h2>
		<table className="loot-table">
			<thead>
				<tr>
					<th></th>
					<th className="earned-column">Earned</th>
				</tr>
			</thead>
			<tbody>
				{lootRows}
			</tbody>
		</table>
		<button id="close-loot-screen-button" className="doesnt-look-like-a-button" onClick={closeLootScreen}>X</button>
	</ReactModal>
}

export default LootScreen;