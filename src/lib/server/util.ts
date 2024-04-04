import axios from 'axios';

export const AUTH_USER_BEARER_TOKEN = '73443|gyjwaSKIbjbRCtL7FXwN80ksqiatdMvlbYGIoTYe';
export const API_URL = 'https://portal.desettisickroku.cz/api';
export const TEAM_INFO_URL = `/v2/team/73`;
export const USER_INFO_URL = `/v2/user`;
export const api = axios.create({
    baseURL: API_URL,
	headers: {
		Authorization: `Bearer ${AUTH_USER_BEARER_TOKEN}`
	}
});
