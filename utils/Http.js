import axios from 'axios';

const environment = process.env.ENVIRONMENT;
let api;

if (environment === 'development') {
    api = 'https://ioffsetapi.stagelab.co.uk/';
}
if (environment === 'staging') {
    api = 'https://ioffsetapi.stagelab.co.uk/';
}
if (environment === 'production') {
    api = 'https://api.ioffset.co.uk/';
}

export const baseApi = api;

axios.defaults.baseURL = api;
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios;
