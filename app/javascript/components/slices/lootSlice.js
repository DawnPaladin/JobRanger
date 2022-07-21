import { createSlice } from "@reduxjs/toolkit";

const lootData = [{
	rarity: 'common',
	description: 'Text/email reply',
	xp: 5
}, {
	rarity: 'rare',
	description: 'Phone/video call',
	xp: 15
}, {
	rarity: 'epic',
	description: 'Interview',
	xp: 50
}, {
	rarity: 'legendary',
	description: 'Job offer',
	xp: 1000
}]

const lootSlice = createSlice({
	name: 'loot',
	initialState: [],
	reducers: {
		addLoot: (state, action) => { state.push(action.payload) }
	}
});

const addLoot = lootSlice.actions;
export { lootData, addLoot }
export default lootSlice.reducer;