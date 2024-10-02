import axios from 'axios';

export const TMP1 = '12601|tUAmq';
export const TMP2 = 'P5TEaCkl1kznPMw4TkjZ2ii8ERb0cp6vjMX';
export const T = `${TMP1}${TMP2}`;
export const API_URL = 'https://portal.desettisickroku.cz/api';
export const TEAM_INFO_URL = `/v2/team/`;
export const TEAM_B = 534;
export const TEAM_A = 546;
export const USER_INFO_URL = `/v2/user`;
export const api = axios.create({
    baseURL: API_URL,
	headers: {
		Authorization: `Bearer ${T}`
	}
});
