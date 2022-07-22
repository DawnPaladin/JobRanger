import { configureStore } from '@reduxjs/toolkit';

import activitiesSlice, { addActivity } from './slices/activitiesSlice';
import statsSlice, { statData } from './slices/statsSlice';
import loadingSlice, { doneLoading, throwError } from './slices/loadingSlice';
import lootSlice from './slices/lootSlice';
import { apiSlice } from './slices/apiSlice';

export default configureStore({
	reducer: {
		activities: activitiesSlice,
		stats: statsSlice,
		network: loadingSlice,
		loot: lootSlice,
		[apiSlice.reducerPath]: apiSlice.reducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
});
