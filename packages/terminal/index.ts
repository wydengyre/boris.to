import { createReadStream } from "node:fs";
import * as path from "path";
import * as readline from "readline";
import { read } from "@boris.to/tatoeba-reader/read.js";

const __dirname = new URL(".", import.meta.url).pathname;
const TRANSLATIONS_PATH_REL =
	"../../data/Sentence pairs in English-French - 2024-02-12.tsv";

async function main() {
	const translationsPath = path.resolve(__dirname, TRANSLATIONS_PATH_REL);
	const input = createReadStream(translationsPath, "utf8");
	const crlfDelay = Infinity; // used for \r\n terminated lines
	const rl = readline.createInterface({ input, crlfDelay });
	const lines = rl[Symbol.asyncIterator]();
	const translations = read(lines);
	for await (const translation of translations) {
		console.log(translation);
	}
}

await main();
