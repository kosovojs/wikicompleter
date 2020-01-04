import { createSlice } from '@reduxjs/toolkit';
import api from '../../api/methods';
import { toast } from 'react-toastify';

const slice = createSlice({
	name: 'main',
	initialState: { from: null, to: null, filters: null },
	reducers: {
		setData: {
			reducer(state, action) {
				const { from, to, filters } = action.payload;
				return { ...state, from, to, filters };
			},
			prepare(from, to, filters) {
				return { payload: { from, to, filters } };
			}
		},
	}
});

const {
	setData
} = slice.actions;

const setRequestData = (from, to, filters) => (dispatch) => {
	dispatch(setData(from, to, filters));
};

export { setRequestData };

export default slice.reducer;
