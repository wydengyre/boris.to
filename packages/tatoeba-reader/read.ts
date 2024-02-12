export { read, readAll, readArray };
export type { Translation };

type Translation = readonly [source: string, target: string];

const NUM_COLUMNS = 4;
async function* read(
	lines: AsyncIterableIterator<string>,
): AsyncGenerator<Translation> {
	let lineNo = 0;
	for await (const line of lines) {
		const broken = line.split("\t");
		if (broken.length !== NUM_COLUMNS) {
			throw new Error(
				`${lineNo}: expected ${NUM_COLUMNS} columns, got ${broken.length}`,
			);
		}
		const [_0, source, _1, target] = broken;
		if (source === undefined) {
			throw new Error(`Missing source at row ${lineNo}`);
		}
		if (target === undefined) {
			throw new Error(`Missing target at row ${lineNo}`);
		}
		yield [source, target];
		lineNo++;
	}
}

async function* readArray(lines: string[]): ReturnType<typeof read> {
	yield* read(
		(async function* () {
			for (const line of lines) {
				yield line;
			}
		})(),
	);
}

async function* readAll(tsv: string): ReturnType<typeof read> {
	const split = tsv.split("\r\n");
	yield* readArray(split);
}
