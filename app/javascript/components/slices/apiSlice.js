import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const csrfToken = document.querySelector('[name=csrf-token]').content;

export const apiSlice = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: '/api',
		prepareHeaders: (headers, { getState }) => {
			headers.set('X-CSRF-TOKEN', csrfToken);
			return headers;
		}
	}),
	tagTypes: ['Loot', 'Activities'],
	endpoints: builder => ({
		getActivities: builder.query({
			query: () => '/todays-activities',
			providesTags: ['Activities']
		}),
		createActivity: builder.mutation({
			query: activity => ({
				url: '/activities',
				method: 'POST',
				body: activity
			}),
			invalidatesTags: ['Activities'],
		}),
		getLoot: builder.query({
			query: () => '/weekly-loot',
			providesTags: ['Loot']
		}),
		createLoot: builder.mutation({ 
			query: lootItem => ({
				url: '/loot',
				method: 'POST',
				body: lootItem
			}),
			invalidatesTags: ['Loot']
		}),
		getStats: builder.query({
			query: () => '/stats',
			providesTags: ['Activities']
		})
	}),
});

export const { 
	useGetActivitiesQuery,
	useCreateActivityMutation,
	useGetLootQuery,
	useCreateLootMutation,
	useGetStatsQuery,
} = apiSlice;