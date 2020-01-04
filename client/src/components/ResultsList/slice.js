import { createSlice } from '@reduxjs/toolkit';
import api from '../../api/methods';
import { toast } from 'react-toastify';

const slice = createSlice({
	name: 'data',
	initialState: { error: false, loading: false, hasRequested: false, list: [], completionTime: null, reqID: null, isCached: false, cacheAge: null },
	reducers: {
		setData: {
			reducer(state, action) {
				console.log(action.payload)
				return { ...state, ...action.payload };
			},
			prepare(props) {
				return { payload: props };
			}
		},
		setLoading: {
			reducer(state, action) {
				return { ...state, loading: action.payload.value };
			},
			prepare(newValue) {
				return { payload: {value: newValue} };
			}
		},
	}
});

const {
	setData,
	setLoading
} = slice.actions;

const getData = (ignoreCache=false) => (dispatch, getState) => {
	const { from, to, filters } = getState().main;

	dispatch(setLoading(true));

	const dataToSend = {
		from,
		to,
		filters,
		ignoreCache
	}

	api.tool.submit(dataToSend)
	.then(res => {
		const {data, success, meta} = res;
		if (success === true) {
			dispatch(setData({
				list: data,
				completionTime: meta.time,
				reqID: meta.id,
				isCached: meta.cached,
				cacheAge: meta.cache_age
			}));
		} else {
			dispatch(setData({
				error: true
			}));
		}
	})
	.finally(() => {
		dispatch(setLoading(false));
	})
};

export { getData };

export default slice.reducer;

/*
'data': requestData,
			'success': True,
			'meta': {
				'time': "{0:.2f}".format(reqTime),
				'id': reqID,
				'cached': isCached,
				'cache_age': None if not isCached else cacheAge
			}
*/
