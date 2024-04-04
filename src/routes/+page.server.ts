import { TEAM_INFO_URL, USER_INFO_URL, api } from '$lib/server/util';

export type UserInfo = {
	public_name: string;
	distance: number;
	steps: number;
	profile_photo_url: string;
};
export async function load() {
	const info = (await api.get(TEAM_INFO_URL)).data;

	let users = await Promise.all(
		info.data.users.map(async (u): Promise<UserInfo> => {
            const user_info = (await api.get<{ data: UserInfo }>(`${USER_INFO_URL}/${u.id}`)).data.data;
			return {
				public_name: user_info.public_name,
				distance: user_info.distance,
				steps: user_info.steps,
				profile_photo_url: user_info.profile_photo_url
			};
		})
	);
	
	users = users.sort((a, b) => b.distance - a.distance);

    return {
        users
    }
}
