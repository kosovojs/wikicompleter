import {get, post} from './api';

const tool = {
	submit: (data) => post('data',{info:data}),
}

const apiWrapper = {
	tool
}

export default apiWrapper;
