<script lang="ts">
	import { onMount } from 'svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { api, TEAM_A, TEAM_B, TEAM_INFO_URL, USER_INFO_URL } from '$lib/util';

	let users: UserInfo[] = [];
	let loading: Promise<UserInfo[]>;

	type UserInfo = {
		id: string;
		public_name: string;
		distance: number;
		steps: number;
		profile_photo_url: string;
		teams: { id: number }[];
	};

	onMount(async () => {
		const info = [
			...(await api.get(`${TEAM_INFO_URL}${TEAM_A}`)).data.data.users,
			...(await api.get(`${TEAM_INFO_URL}${TEAM_B}`)).data.data.users
		];

		loading = Promise.all(
			info.map(async (u): Promise<UserInfo> => {
				const user_info = (await api.get<{ data: UserInfo }>(`${USER_INFO_URL}/${u.id}`)).data.data;
				return {
					id: user_info.id,
					public_name: user_info.public_name,
					distance: user_info.distance,
					steps: user_info.steps,
					profile_photo_url: user_info.profile_photo_url,
					teams: user_info.teams
				};
			})
		);

		users = await loading;

		users = users.sort((a, b) => b.distance - a.distance);
	});
</script>

<div class="container mx-auto space-y-8 p-8">
	<div class="flex justify-center">
		<dl class="list-dl">
			{#await loading}
				<div
					class="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
					role="status"
				>
					<span
						class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
						>Loading...</span
					>
				</div>
			{:then}
				{#each users as user, i}
					<div>
						<span>{i + 1}.</span>
						<span class="badge">
							<Avatar src={user.profile_photo_url} />
						</span>
						<span class="flex-auto">
							<dt class:champion={user.id === '41455'}>{user.public_name}</dt>
							<dd>
								<span>{user.distance} metrů</span>
								<span>{user.steps} kroků</span>
							</dd>
						</span>
						<span class="text-5xl">
							{#if user.teams.some((v) => v.id === TEAM_A)}
								A
							{:else if user.teams.some((v) => v.id === TEAM_B)}
								B
							{/if}
						</span>
					</div>
				{/each}
			{/await}
		</dl>
	</div>
</div>

<style>
	.champion::after,
	.champion::before {
		content: '🏆';
	}
</style>
