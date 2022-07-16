import { createSlice } from "@reduxjs/toolkit"

const networkSlice = createSlice({
	name: 'network',
	initialState: {
		isLoading: true,
		isError: false,
		errorMessage: ''
	},
	reducers: {
		doneLoading: (state, action) => { state.isLoading = false },
		throwError: (state, action) => { state.isError = true; state.errorMessage = action.payload },
	}
});

export const { doneLoading, throwError } = networkSlice.actions;
export default networkSlice.reducer;