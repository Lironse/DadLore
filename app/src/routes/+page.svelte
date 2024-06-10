<script lang="ts">
	function getDate(): string {
		const today = new Date();
		const day = String(today.getDate()).padStart(2, '0');
		const month = String(today.getMonth() + 1).padStart(2, '0');
		const year = today.getFullYear();

		return `${day}/${month}/${year}`;
	}

	async function publish(): Promise<void> {
		const res = await fetch('/publish', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				author: name,
				age: age,
				date: getDate(),
				text: text
			})
		});

		if (!res.ok) {
			alert(await res.text());
			return;
		}
		const link = (await res.json()).link;
		alert('your lore can be found at: ' + link);
	}

	let name = '';
	let age = '';
	let text = '';
</script>

<main class="w-full flex justify-center p-4">
	<div class="flex flex-col w-1/3 gap-4">
		<div class="flex gap-2 w-full">
			<input
				class="border-b-2 focus:border-b-black outline-none w-1/4"
				id="name-input"
				placeholder="name"
				type="text"
				bind:value={name}
			/>
			<input
				class="border-b-2 focus:border-b-black outline-none w-[6%]"
				id="age-input"
				placeholder="age"
				type="text"
				bind:value={age}
			/>
			<div class="ml-auto">
				{getDate()}
			</div>
		</div>
		<div>
			<h1 class="w-full font-bold text-xl">Whats your story today?</h1>
		</div>
		<div>
			<textarea
				class="w-full border-2 p-2 rounded-xl border-gray-600"
				name="entry"
				id="entry-textarea"
				bind:value={text}
			></textarea>
		</div>
		<div class="w-full flex">
			<button disabled class="p-1 rounded-xl border-2 border-gray-500">add pictures (WIP)</button>
			<button class="p-1 ml-auto rounded-xl border-2 border-gray-500" on:click={publish}
				>publish</button
			>
		</div>
	</div>
</main>
