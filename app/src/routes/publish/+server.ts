import { json } from "@sveltejs/kit"
import { promises as fs } from 'fs';
import path from 'path';

import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { author, age, date, text } = await request.json();

	if (!author || !date || !text || !age) {
		return json({ error: 'Missing required fields' }, { status: 400 });
	}

	const sanitizedAuthor = author.replace(/[^a-zA-Z0-9_-]/g, '');
	const sanitizedDate = date.replace(/[^a-zA-Z0-9_-]/g, '');

	const directoryPath = path.join('src', 'routes', '@' + sanitizedAuthor, sanitizedDate);
	await fs.mkdir(directoryPath, { recursive: true });

	const filePath = path.join(directoryPath, '+page.svelte');

	const fileContent = `
<main class='flex flex-col gap-2 m-4'>
<p>Author: ` + author + ` (` + age + `) </p>
		<p>date: ` + date + `</p>
		<p>` + text + `</p>
</main>`;

	await fs.writeFile(filePath, fileContent);

	const link = path.join('@' + sanitizedAuthor, sanitizedDate)
	return json({ link: 'dad-lore.vercel.app/' + link });
};
