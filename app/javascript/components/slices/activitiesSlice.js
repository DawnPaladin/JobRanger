import { createSlice } from "@reduxjs/toolkit"

const activitiesSlice = createSlice({
	name: 'activities',
	initialState: [],
	reducers: {
		addActivity: (state, action) => {state.push(action.payload)},
	}
});

export const { addActivity } = activitiesSlice.actions;
export default activitiesSlice.reducer;