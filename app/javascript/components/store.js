import { configureStore } from '@reduxjs/toolkit';

import activitiesSlice, { addActivity } from './slices/activitiesSlice';
import statsSlice, { statData } from './slices/statsSlice';
import loadingSlice, { doneLoading, throwError } from './slices/loadingSlice';
import lootSlice from './slices/lootSlice';

export default configureStore({
	reducer: {
		activities: activitiesSlice,
		stats: statsSlice,
		network: loadingSlice,
		loot: lootSlice,
	},
});
