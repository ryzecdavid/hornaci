<script lang="ts">
	import type { UserInfo } from './+page.server';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let data: { users: UserInfo[] };

	$: users = data.users;
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
