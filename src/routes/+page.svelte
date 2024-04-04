<script lang="ts">
	import { onMount } from 'svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { api, TEAM_INFO_URL, USER_INFO_URL } from '$lib/util';

	let users: UserInfo[] = [];

	type UserInfo = {
		public_name: string;
		distance: number;
		steps: number;
		profile_photo_url: string;
	};

	onMount(async () => {
		const info = (await api.get(TEAM_INFO_URL)).data;

		users = await Promise.all(
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
	});
</script>

<div class="container mx-auto space-y-8 p-8">
	<div class="flex justify-center">
		<dl class="list-dl">
			{#each users as user, i}
				<div>
					<span class="badge">
						<Avatar src={user.profile_photo_url} />
					</span>
					<span class="flex-auto">
						<dt>{user.public_name}</dt>
						<dd>
							<span>{user.distance} metrů</span>
							<span>{user.steps} kroků</span>
						</dd>
					</span>
				</div>
			{/each}
		</dl>
	</div>
</div>
