import React from "react";
import PropTypes from 'prop-types';

import LootIcon from './LootIcon';

import {
	useModifyLootMutation,
	useDestroyLootMutation
} from './slices/apiSlice';

const getDayOfWeek = dateString => {
	const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	const [ year, month, day ] = dateString.split('-');
	const index = new Date(year, month-1, day).getDay();
	return daysOfWeek[index];
}

function debounce(func, timeout=2000) {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => { func.apply(this, args); }, timeout);
	};
}

const EditableLoot = props => {
	const { loot } = props;
	let note = loot.note || "";
	const [modifyLoot] = useModifyLootMutation();
	const [destroyLoot] = useDestroyLootMutation();
	const saveNote = (event) => {
		modifyLoot({...loot, note: event.target.value});
	}
	const delayedSaveNote = debounce((event) => saveNote(event))
	return <div className="editable-loot">
		<div className="edit-loot">
			{getDayOfWeek(loot.date)}
			<input defaultValue={note} placeholder="Type a note" onChange={delayedSaveNote} />
			<button onClick={() => { destroyLoot(loot) }}>Delete</button>
		</div>
		<LootIcon rarity={loot.rarity} />
	</div>
}

EditableLoot.propTypes = {
	loot: PropTypes.object.isRequired
}

export default EditableLoot;