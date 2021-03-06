import { createSlice } from "@reduxjs/toolkit"

const statData = [{
	name: 'STR',
	color: '#890505',
	activity: 'Job application',
	xp: 10
}, {
	name: 'DEX',
	color: '#085B18',
	activity: 'Resume',
	xp: 10
}, {
	name: 'CON',
	color: '#341C04',
	activity: 'Cover letter',
	xp: 10
}, {
	name: 'INT',
	color: '#225189',
	activity: 'Coding',
	xp: 5,
	isContinuous: true
}, {
	name: 'WIS',
	color: '#4D4D4D',
	activity: 'Searching',
	xp: 5,
	isContinuous: true
}, {
	name: 'CHA',
	color: '#4D085B',
	activity: 'Contact',
	xp: 5
}];

const statsSlice = createSlice({
	name: 'stats',
	initialState: statData
});

const getStatData = statName => {
	return statData.filter(stat => stat.name == statName)[0];
}

export { statData, getStatData };
export default statsSlice.reducer;