import {get, post} from './api';

const tool = {
	submit: (data) => post('data',{info:data}),
	reqData: (id) => get(`req_data/${id}`),
}

const apiWrapper = {
	tool
}

export default apiWrapper;
